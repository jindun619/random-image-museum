import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { query } = req;
    const userId: string = query.userId as string;

    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

    res.json({ data, error });
  }
}
