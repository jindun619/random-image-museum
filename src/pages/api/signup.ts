import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseAdmin } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { body } = req;
    const { email, password, passwordagain } = body;

    if (password !== passwordagain) {
      res.json({
        error: 1, //비밀번호 불일치
      });
    } else {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        user_metadata: {
          name: "gimdun",
        },
      });
      await supabaseAdmin.auth.admin.inviteUserByEmail(email);
      res.json({ data, error });
    }
  }
}
