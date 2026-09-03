import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase/client";
import { createClient } from "@supabase/supabase-js";

export type CouncilMember = {
  id: string;
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

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

// Default Council data from id_cards table (team = 'Leadership')
export const defaultCouncilMembers: CouncilMember[] = [
  {
    id: "4fc9bf15-38de-423e-b6dc-03cd10e1f73c",
    name: "Lokesh Sharma",
    role: "Co-President",
    tier: "EXECUTIVE COUNCIL",
    team: "Leadership",
    photoUrl: "/leadership/lokesh.jpg",
    email: "lokesh.23bcg10015@vitbhopal.ac.in",
    bio: "Co-President directing club operations, university alignment, and collegiate championship expansion.",
  },
  {
    id: "ca90bad5-de9b-4ccd-837b-09b5ad39a015",
    name: "Shivansh Sharma",
    role: "Co-President",
    tier: "EXECUTIVE COUNCIL",
    team: "Leadership",
    photoUrl: "/leadership/shivansh.jpg",
    email: "shivansh.23bce11158@vitbhopal.ac.in",
    bio: "Co-President spearheading varsity tournament operations, live broadcast production, and partner circuits.",
  },
  {
    id: "b2347e87-a099-4fe9-8344-e2af1272d0b8",
    name: "Haardik Pahlajani",
    role: "Student Coordinator",
    tier: "EXECUTIVE COUNCIL",
    team: "Leadership",
    photoUrl: "/leadership/haardik.png",
    email: "haardik.24bcg10051@vitbhopal.ac.in",
    bio: "Student Coordinator managing internal club workflows, cross-department initiatives, and tech stacks.",
  },
  {
    id: "f5eae1e7-5fd7-4b09-b223-ba06122c055a",
    name: "Parardha Dhar",
    role: "Student Coordinator",
    tier: "EXECUTIVE COUNCIL",
    team: "Leadership",
    photoUrl: "/leadership/parardha.jpg",
    email: "parardha.24bcg10003@vitbhopal.ac.in",
    bio: "Student Coordinator and visionary founder expanding student gaming initiatives and lab research.",
  },
];

export async function fetchClubData() {
  try {
    // 1. Fetch Firestore members (if available)
    let rawMembers: any[] = [];
    try {
      const membersSnap = await getDocs(collection(db, "members"));
      rawMembers = membersSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
    } catch {
      // Firestore fallback
    }

    // 2. Fetch live files from Supabase 'id-photos' bucket
    const { data: files } = await supabase.storage.from("id-cards").list("id-photos", { limit: 500 });
    const validFiles = (files || [])
      .filter((f) => f.name && f.name !== ".emptyFolderPlaceholder")
      .sort((a, b) => {
        const timeA = Number((a.name.match(/_(\d+)\./) || [0, 0])[1]) || 0;
        const timeB = Number((b.name.match(/_(\d+)\./) || [0, 0])[1]) || 0;
        return timeB - timeA;
      });

    // id_cards table query
    const { data: idCardsData } = await supabase
      .from("id_cards")
      .select("*");
    const idCards = idCardsData || [];

    const getPhotoUrl = (regNo?: string, name?: string, email?: string): string => {
      const cleanReg = (regNo || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      const cleanEmail = (email || "").toLowerCase().trim();
      const cleanName = (name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

      // 1st Priority: Match verified live file in storage bucket
      let match = validFiles.find((f) => {
        const cleanF = f.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        return cleanReg && cleanF.includes(cleanReg);
      });

      if (!match && cleanEmail) {
        match = validFiles.find((f) => {
          const cleanF = f.name.toLowerCase().replace(/[^a-z0-9]/g, "");
          return cleanF.includes(cleanEmail.replace(/[^a-z0-9]/g, ""));
        });
      }

      if (!match && cleanName) {
        match = validFiles.find((f) => {
          const cleanF = f.name.toLowerCase().replace(/[^a-z0-9]/g, "");
          return cleanF.includes(cleanName);
        });
      }

      if (match) {
        return `${supabaseUrl}/storage/v1/object/public/id-cards/id-photos/${encodeURIComponent(match.name)}`;
      }

      // 2nd Priority: id_cards table
      const cardMatch = idCards.find((card) => {
        const cardReg = (card.registrationNumber || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const cardEmail = (card.email || "").toLowerCase().trim();
        const cardName = (card.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

        if (cleanReg && cardReg && cleanReg === cardReg) return true;
        if (cleanEmail && cardEmail && cleanEmail === cardEmail) return true;
        if (cleanName && cardName && (cleanName.includes(cardName) || cardName.includes(cleanName))) return true;
        return false;
      });

      if (cardMatch && cardMatch.photoUrl) {
        return cardMatch.photoUrl;
      }

      return "/vrgc_logo.jpg";
    };

    // 3. Extract Leadership members directly from id_cards table (team = 'Leadership')
    const leadershipCards = idCards.filter(
      (c) => (c.team || "").toLowerCase().includes("leadership")
    );

    const mindsOrder = ["lokesh", "shivansh", "haardik", "parardha"];
    const councilMembers: CouncilMember[] = [];

    mindsOrder.forEach((target) => {
      const found =
        leadershipCards.find((m) => (m.name || "").toLowerCase().includes(target)) ||
        idCards.find((m) => (m.name || "").toLowerCase().includes(target)) ||
        rawMembers.find((m) => (m.name || "").toLowerCase().includes(target)) ||
        defaultCouncilMembers.find((m) => (m.name || "").toLowerCase().includes(target));

      if (found) {
        const localMap: Record<string, string> = {
          lokesh: "/leadership/lokesh.jpg",
          shivansh: "/leadership/shivansh.jpg",
          haardik: "/leadership/haardik.png",
          parardha: "/leadership/parardha.jpg",
        };

        const photo =
          localMap[target] ||
          found.photoUrl ||
          getPhotoUrl(found.registrationNumber || found.id, found.name, found.email);

        councilMembers.push({
          id: found.id || found.registrationNumber,
          name: found.name || target.toUpperCase(),
          role: found.position || found.role || "Executive Council",
          tier: "EXECUTIVE COUNCIL",
          team: found.team || "Leadership",
          photoUrl: photo,
          email: found.email || "",
          bio:
            found.bio ||
            (target === "lokesh"
              ? "Co-President directing club operations, university alignment, and collegiate championship expansion."
              : target === "shivansh"
              ? "Co-President spearheading varsity tournament operations, live broadcast production, and partner circuits."
              : target === "haardik"
              ? "Student Coordinator managing internal club workflows, cross-department initiatives, and tech stacks."
              : "Student Coordinator and visionary founder expanding student gaming initiatives and lab research."),
        });
      }
    });

    const finalCouncil = councilMembers.length === 4 ? councilMembers : defaultCouncilMembers;

    // 4. Group remaining teams for the Tactical Weapon Wheel
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
      const position = m.position || "Member";
      // Filter to team leads, coleads, and core members/members
      const isLead = /lead/i.test(position);
      const isMember = /member/i.test(position) || /coordinator/i.test(position);
      if (!isLead && !isMember) return;

      const photo = getPhotoUrl(m.registrationNumber || m.id, m.name, m.email);
      const teams = (m.team || "").split(/[,/&]/).map((t: string) => t.trim());

      teams.forEach((t: string) => {
        const targetKeys = normalizeTeamKey(t);
        targetKeys.forEach((key) => {
          if (categoryMap[key]) {
            // Avoid duplicate in same team
            if (!categoryMap[key].some((exist) => exist.id === m.id)) {
              categoryMap[key].push({
                id: m.id || m.registrationNumber,
                name: m.name || "Club Member",
                role: m.position || "Core Member",
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
                bio: `Active ${position} in the ${t || key} team driving VRGC tournaments, workshops, and student community initiatives.`,
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
    console.error("Error fetching club data from Firestore/Supabase:", error);
    return {
      council: defaultCouncilMembers,
      faculty: facultyMembers,
      wheelCategories: {},
    };
  }
}
