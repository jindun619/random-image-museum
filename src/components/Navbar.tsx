import Link from "next/link";

import { supabase } from "@/lib/supabase";

export function Navbar() {
  (async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log(data, error);
  })();
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
        <button className="btn btn-sm btn-neutral">로그인</button>
        <button className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://vercel.com/api/www/avatar/RPflv4I6VHNVELC59Eztv3OF?&s=60" />
          </div>
        </button>
      </div>
    </div>
  );
}
