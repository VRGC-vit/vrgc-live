import type { NextApiRequest, NextApiResponse } from "next";
import { fetchClubData } from "@/services/membersService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchClubData();
    if (!data) {
      return res.status(500).json({ error: "Failed to retrieve members from Firestore" });
    }
    // Cache for 60s
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
