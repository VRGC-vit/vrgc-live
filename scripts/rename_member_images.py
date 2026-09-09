#!/usr/bin/env python3
"""
rename_member_images.py
=======================
Renames all image files inside public/members/ from their registration-number
filename (e.g. 23BCE11158.webp) to the deterministic UUIDv5 filename
(e.g. <uuid>.webp) that the web app expects via getMemberPhotoUrl().

Algorithm mirrors src/utils/memberUuid.ts exactly:
  identity  = f"{registration_number}_{SECRET_SALT}"
  uuid      = uuid5(DNS_NAMESPACE, identity)   # RFC 4122 UUIDv5 DNS namespace

Usage
-----
  # Dry-run (shows what would be renamed, no changes):
  python scripts/rename_member_images.py --dry-run

  # Live run (renames files):
  python scripts/rename_member_images.py

  # Override the salt (default: read from .env.local):
  python scripts/rename_member_images.py --salt "YourCustomSalt"

  # Override the members directory:
  python scripts/rename_member_images.py --dir "path/to/members"
"""

import argparse
import os
import re
import uuid
from pathlib import Path

# ── Constants ──────────────────────────────────────────────────────────────

# RFC 4122 DNS namespace UUID – same as uuid.NAMESPACE_DNS and uuidv5.DNS in Node
DNS_NAMESPACE = uuid.NAMESPACE_DNS  # 6ba7b810-9dad-11d1-80b4-00c04fd430c8

# Environment variable names checked (in priority order), matching memberUuid.ts
SALT_ENV_VARS = [
    "VITE_IMAGE_SECRET_SALT",
    "NEXT_PUBLIC_IMAGE_SECRET_SALT",
    "IMAGE_SECRET_SALT",
]

# Default location of the members folder relative to this script's project root
DEFAULT_MEMBERS_DIR = Path(__file__).parent.parent / "public" / "members"

# Default location of .env.local relative to this script's project root
DEFAULT_ENV_FILE = Path(__file__).parent.parent / ".env.local"

# ── Helpers ────────────────────────────────────────────────────────────────

def load_env_file(env_path):
    """
    Parses a .env / .env.local file and returns a dict of key->value pairs.
    Supports simple KEY=VALUE lines; ignores comments and blank lines.
    """
    env_vars = {}
    if not env_path.exists():
        return env_vars
    with open(env_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, _, value = line.partition("=")
                env_vars[key.strip()] = value.strip()
    return env_vars


def resolve_salt(cli_salt, env_file):
    """
    Resolves the secret salt in priority order:
      1. --salt CLI argument
      2. Process environment variables (VITE_IMAGE_SECRET_SALT, etc.)
      3. Values parsed from .env.local
    """
    if cli_salt:
        return cli_salt

    for var in SALT_ENV_VARS:
        val = os.environ.get(var)
        if val:
            return val

    dotenv = load_env_file(env_file)
    for var in SALT_ENV_VARS:
        val = dotenv.get(var)
        if val:
            return val

    return ""


def generate_member_uuid(registration_number, salt):
    """
    Generates the deterministic UUIDv5 for a member.
    Mirrors generateMemberUUID() in src/utils/memberUuid.ts:

        identityString = `${registrationNumber}_${salt}`
        uuid           = uuidv5(identityString, uuidv5.DNS)
    """
    reg = registration_number.strip()
    if not reg or not salt:
        return ""
    identity = f"{reg}_{salt}"
    return str(uuid.uuid5(DNS_NAMESPACE, identity))


def is_registration_number(stem):
    """
    Heuristic: registration numbers look like 23BCE11158 / 25MIP10089.
    Pattern: 2 digits + 2-4 uppercase letters + 5 digits.
    """
    return bool(re.fullmatch(r"[0-9]{2}[A-Z]{2,4}[0-9]{5}", stem))


# ── Main logic ─────────────────────────────────────────────────────────────

def rename_member_images(members_dir, salt, dry_run=False):
    if not members_dir.exists():
        print(f"[ERROR] Members directory not found: {members_dir}")
        return

    if not salt:
        print("[ERROR] Secret salt is empty. Provide --salt or set one of:")
        for v in SALT_ENV_VARS:
            print(f"         {v}=...")
        return

    files = sorted(members_dir.iterdir())
    image_files = [f for f in files if f.is_file() and f.suffix.lower() in {".webp", ".jpg", ".jpeg", ".png"}]

    if not image_files:
        print(f"[INFO] No image files found in {members_dir}")
        return

    prefix = "[DRY-RUN] " if dry_run else ""
    print(f"{prefix}Processing {len(image_files)} image(s) in {members_dir}\n")
    print(f"  Salt      : {'*' * len(salt)}  (length={len(salt)})")
    print(f"  Namespace : {DNS_NAMESPACE}  (RFC 4122 DNS)\n")

    renamed = 0
    skipped = 0
    already_uuid = 0
    errors = 0

    for img_path in image_files:
        stem = img_path.stem
        suffix = img_path.suffix

        # Skip files already named as UUIDs (36 chars with dashes)
        if re.fullmatch(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", stem, re.IGNORECASE):
            print(f"  [SKIP-UUID]    {img_path.name}  (already a UUID filename)")
            already_uuid += 1
            continue

        if not is_registration_number(stem):
            print(f"  [SKIP-UNKNOWN] {img_path.name}  (stem is not a registration number)")
            skipped += 1
            continue

        member_uuid = generate_member_uuid(stem, salt)
        if not member_uuid:
            print(f"  [ERROR]        {img_path.name}  (UUID generation failed)")
            errors += 1
            continue

        new_name = f"{member_uuid}{suffix}"
        new_path = img_path.parent / new_name

        if new_path.exists() and new_path != img_path:
            print(f"  [CONFLICT]     {img_path.name}  ->  {new_name}  (target already exists!)")
            errors += 1
            continue

        action = "[WOULD RENAME]" if dry_run else "[RENAME]      "
        print(f"  {action} {img_path.name}  ->  {new_name}")

        if not dry_run:
            try:
                img_path.rename(new_path)
                renamed += 1
            except OSError as e:
                print(f"    [ERROR] {e}")
                errors += 1
        else:
            renamed += 1

    print()
    print("-" * 60)
    if dry_run:
        print(f"  DRY-RUN done. Would rename: {renamed}, already UUID: {already_uuid}, unknown: {skipped}, errors: {errors}")
        print("  Run without --dry-run to apply changes.")
    else:
        print(f"  Done. Renamed: {renamed}, already UUID: {already_uuid}, unknown: {skipped}, errors: {errors}")


# ── Entry point ────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Rename public/members/ images from reg-number filenames to UUIDv5 filenames."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview renames without modifying any files.",
    )
    parser.add_argument(
        "--salt",
        type=str,
        default=None,
        help="Override the secret salt (default: read from .env.local or environment).",
    )
    parser.add_argument(
        "--dir",
        type=str,
        default=None,
        help=f"Path to the members image directory (default: public/members).",
    )
    parser.add_argument(
        "--env-file",
        type=str,
        default=None,
        help="Path to the .env file to read the salt from (default: .env.local).",
    )
    args = parser.parse_args()

    members_dir = Path(args.dir) if args.dir else DEFAULT_MEMBERS_DIR
    env_file = Path(args.env_file) if args.env_file else DEFAULT_ENV_FILE
    salt = resolve_salt(args.salt, env_file)

    rename_member_images(
        members_dir=members_dir,
        salt=salt,
        dry_run=args.dry_run,
    )


if __name__ == "__main__":
    main()
