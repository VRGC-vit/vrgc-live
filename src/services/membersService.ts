import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase/client";
import { getMemberPhotoUrl } from "@/utils/memberUuid";

export type FirebaseMember = {
  id?: string;
  registrationNumber?: string;
  name?: string;
  email?: string;
  team?: string;
  position?: string;
  role?: string;
  description?: string;
  bio?: string;
  [key: string]: any;
};

export type CouncilMember = {
  id: string;
  registrationNumber?: string;
  name: string;
  role: string;
  tier: string;
  team: string;
  photoUrl: string;
  email?: string;
  bio: string;
};

export type FacultyMember = {
  name: string;
  role: string;
  department: string;
  bio: string;
  image?: string;
};

export type WheelMember = {
  id: string;
  registrationNumber?: string;
  name: string;
  role: string;
  tier: string;
  team: string;
  weapon: string;
  photoUrl: string;
  email?: string;
  stats: {
    s1: [string, number];
    s2: [string, number];
    s3: [string, number];
  };
  bio: string;
};

// Fallback faculty data
export const facultyMembers: FacultyMember[] = [
  {
    name: "Dr. Ramraj Dangi",
    role: "Faculty Coordinator",
    department: "School of Computing Science and Engineering",
    bio: "Guiding institutional research in virtual reality, academic esports tournaments, and mentoring VRGC student leads.",
    image: "/faculty/ramraj_dangi.png",
  },
  {
    name: "Dr. Sivabalan KR",
    role: "Faculty Co-Coordinator",
    department: "Gaming & Immersive Media Laboratory",
    bio: "Advising club initiatives, university symposiums, industry partnerships, and spatial computing projects.",
    image: "/faculty/siva_balan.png",
  },
];

// Default Council data with local UUID webp photos (deterministic UUIDv5 from registration number + salt)
export const defaultCouncilMembers: CouncilMember[] = [
  {
    id: "23BCE11158",
    registrationNumber: "23BCE11158",
    name: "Shivansh Sharma",
    role: "Co-President",
    tier: "EXECUTIVE COUNCIL",
    team: "Leadership",
    photoUrl: getMemberPhotoUrl("23BCE11158"),
    bio: "Co-President spearheading varsity tournament operations, live broadcast production, and partner circuits.",
  },
  {
    id: "23BCG10015",
    registrationNumber: "23BCG10015",
    name: "Lokesh Sharma",
    role: "Co-President",
    tier: "EXECUTIVE COUNCIL",
    team: "Leadership",
    photoUrl: getMemberPhotoUrl("23BCG10015"),
    bio: "Co-President directing game development incubators, technical workshops, and competitive gaming divisions.",
  },
  {
    id: "24BCG10003",
    registrationNumber: "24BCG10003",
    name: "Parardha Dhar",
    role: "Student Coordinator",
    tier: "EXECUTIVE COUNCIL",
    team: "Leadership",
    photoUrl: getMemberPhotoUrl("24BCG10003"),
    bio: "Student Coordinator managing university symposiums, esports player registrations, and club logistics.",
  },
  {
    id: "24BCG10051",
    registrationNumber: "24BCG10051",
    name: "Haardik Pahlajani",
    role: "Student Coordinator",
    tier: "EXECUTIVE COUNCIL",
    team: "Leadership",
    photoUrl: getMemberPhotoUrl("24BCG10051"),
    bio: "Student Coordinator coordinating varsity scrim schedules, event broadcasts, and member communications.",
  },
];

/** Races a promise-like against a timeout. Returns null if the timeout fires first. */
function withTimeout<T>(promise: PromiseLike<T>, ms = 8000): Promise<T | null> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export async function fetchClubData() {
  try {
    const snapshot = await withTimeout(
      getDocs(collection(db, "members")).catch((err) => {
        console.warn("Firestore getDocs members error:", err);
        return null;
      }),
      8000
    );

    const rawMembers: FirebaseMember[] =
      snapshot && "docs" in snapshot
        ? (snapshot as any).docs.map((d: any) => ({ id: d.id, ...d.data() }))
        : [];

    /**
     * Resolves member photo directly from public/members/ using deterministic UUIDv5.
     * Generated format: registrationNumber_salt -> /members/<uuid>.webp
     */
    const getCorePhotoUrl = (registrationNumber?: string): string => {
      if (!registrationNumber?.trim()) {
        return "/vrgc_logo.jpg";
      }
      return getMemberPhotoUrl(registrationNumber.trim());
    };

    // Extract Leadership members directly from Firestore (team = 'Leadership' or leadership roles)
    const combinedLeads: CouncilMember[] = [];

    const addLeadCandidate = (c: FirebaseMember) => {
      if (!c) return;
      const regNo = String(c.registrationNumber || "").trim();
      if (!regNo && process.env.NODE_ENV !== "production") {
        console.warn("Leadership member missing registrationNumber:", c.name || c.id);
      }
      const cleanReg = regNo.toLowerCase().replace(/[^a-z0-9]/g, "");
      const existing = combinedLeads.find((item) => {
        const itemReg = (item.registrationNumber || item.id || "")
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        return cleanReg && itemReg && cleanReg === itemReg;
      });

      const photo = getCorePhotoUrl(regNo);

      if (existing) {
        if (!existing.bio && (c.description || c.bio)) {
          existing.bio = c.description || c.bio || "";
        }
        // Always use the deterministic local UUID photo URL
        existing.photoUrl = photo;
        if (!existing.role && (c.position || c.role)) {
          existing.role = c.position || c.role || "Executive Council";
        }
        return;
      }

      combinedLeads.push({
        id: c.id || regNo,
        registrationNumber: regNo,
        name: c.name || "Council Member",
        role: c.position || c.role || "Executive Council",
        tier: "EXECUTIVE COUNCIL",
        team: c.team || "Leadership",
        photoUrl: photo,
        email: c.email || "",
        bio: c.description || c.bio || "",
      });
    };

    // Filter rawMembers with Leadership team or role
    rawMembers
      .filter((m) =>
        (m.team || "").toLowerCase().includes("leadership") ||
        /(president|executive|leadership|coordinator)/i.test(m.position || m.role || "")
      )
      .forEach(addLeadCandidate);

    // Sort leadership: Presidents first, then Student Coordinators / Leads, then others
    combinedLeads.sort((a, b) => {
      const getScore = (role: string) => {
        const r = (role || "").toLowerCase();
        if (r.includes("president")) return 10;
        if (r.includes("coordinator")) return 5;
        if (r.includes("lead")) return 3;
        return 1;
      };
      return getScore(b.role) - getScore(a.role);
    });

    const finalCouncil: CouncilMember[] = combinedLeads.length > 0 ? combinedLeads : defaultCouncilMembers;

    // Group remaining teams for the Tactical Weapon Wheel
    // Normalized categories: Education, Design, Social Media, Esports (PC), Esports (Mobile), PR, Technical
    const categoryMap: Record<string, WheelMember[]> = {
      esports_pc: [],
      esports_mobile: [],
      education: [],
      design: [],
      social_media: [],
      pr: [],
      technical: [],
    };

    const normalizeTeamKey = (teamName: string): string[] => {
      const lower = (teamName || "").toLowerCase();
      const keys: string[] = [];
      if (lower.includes("pc")) keys.push("esports_pc");
      if (lower.includes("mobile")) keys.push("esports_mobile");
      if (lower.includes("education")) keys.push("education");
      if (lower.includes("design")) keys.push("design");
      if (lower.includes("social")) keys.push("social_media");
      if (lower.includes("pr")) keys.push("pr");
      if (lower.includes("tech")) keys.push("technical");
      return keys.length > 0 ? keys : ["technical"];
    };

    rawMembers.forEach((m) => {
      const position = m.position || m.role || "Member";
      // Filter to team leads, coleads, and core members/members
      const isLead = /lead/i.test(position);
      const isMember = /member/i.test(position) || /coordinator/i.test(position);
      if (!isLead && !isMember) return;

      const regNo = String(m.registrationNumber || "").trim();
      const photo = getCorePhotoUrl(regNo);
      const teams = (m.team || "").split(/[,/&]/).map((t: string) => t.trim());

      teams.forEach((t: string) => {
        const targetKeys = normalizeTeamKey(t);
        targetKeys.forEach((key) => {
          if (categoryMap[key]) {
            // Avoid duplicate in same team
            if (!categoryMap[key].some((exist) => exist.id === m.id || (regNo && exist.registrationNumber === regNo))) {
              categoryMap[key].push({
                id: m.id || regNo,
                registrationNumber: regNo,
                name: m.name || "Club Member",
                role: m.position || m.role || "Core Member",
                tier: isLead ? "TEAM LEADERSHIP" : "CORE SQUAD",
                team: t || key.toUpperCase(),
                weapon: `${(t || key).toUpperCase()} // ${position.toUpperCase()}`,
                photoUrl: photo,
                email: m.email || "",
                stats: {
                  s1: [isLead ? "LEADERSHIP" : "EXECUTION", isLead ? 96 : 90],
                  s2: ["TECHNICAL SKILL", 92],
                  s3: ["CONSISTENCY", 94],
                },
                bio: m.bio || m.description || `Active ${position} in the ${t || key} team driving VRGC tournaments, workshops, and student community initiatives.`,
              });
            }
          }
        });
      });
    });

    // Sort each category: Leads first, then Co-Leads, then Members
    Object.keys(categoryMap).forEach((k) => {
      categoryMap[k].sort((a, b) => {
        const score = (pos: string) => (/lead$/i.test(pos) ? 3 : /co-lead/i.test(pos) ? 2 : 1);
        return score(b.role) - score(a.role);
      });
    });

    return {
      council: finalCouncil,
      faculty: facultyMembers,
      wheelCategories: categoryMap,
    };
  } catch (error) {
    console.error("Error fetching club data from Firestore:", error);
    return {
      council: defaultCouncilMembers,
      faculty: facultyMembers,
      wheelCategories: {},
    };
  }
}
