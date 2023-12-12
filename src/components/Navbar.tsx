import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { supabase } from "@/lib/supabase";

import { Session } from "@supabase/supabase-js";

export function Navbar() {
  const router = useRouter();

  const [session, setSession] = useState<Session>();

  const signout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    (async () => {
      await supabase.auth.signOut();
      setSession(undefined);
      router.reload();
    })();
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
      }
    })();
  }, [router]);

  return (
    <div className="navbar bg-base-100 border-b flex justify-between">
      <div>
        <Link href="/">
          <div>
            <button className="btn btn-ghost text-xl">daisyUI</button>
          </div>
        </Link>
      </div>
      <div className="gap-2">
        {session ? (
          <>
            <p className="font-semibold">
              {session.user.user_metadata.nickname}
            </p>
            {/*  */}
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://vercel.com/api/www/avatar/RPflv4I6VHNVELC59Eztv3OF?&s=60" />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/my">내 작품</Link>
                </li>
                <li>
                  <Link href="/upload">작품 전시하기</Link>
                </li>
                <li>
                  <a onClick={signout}>로그아웃</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href="/signin">
              <button className="btn btn-sm btn-outline">로그인</button>
            </Link>
            <Link href="/signup">
              <button className="btn btn-sm btn-neutral">회원가입</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
