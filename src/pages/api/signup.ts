import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { body } = req;
    const { email, password, passwordagain, nickname, introduce } = body;

    if (password.length < 6) {
      res.json({
        error: 1, //패스워드 길이 <6
      });
    }
    if (password !== passwordagain) {
      res.json({
        error: 2, //비밀번호 불일치
      });
    } else {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        user_metadata: {
          nickname: nickname,
          introduce: introduce,
        },
      });
      await supabaseAdmin.auth.admin.inviteUserByEmail(email);
      res.json({ data, error });
    }
  }
}
