import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { body } = req;
    const { email, password, passwordagain, nickname, introduce } = body;

    if (password !== passwordagain) {
      res.json({
        error: {
          message: "비밀번호가 일치하지 않습니다.", //비밀번호 불일치
          name: "AuthApiError",
          status: 601
        },
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
