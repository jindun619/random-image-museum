import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { body } = req;
    const email: string = body.email as string;

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email
    );

    res.json({ data, error });
  }
}
