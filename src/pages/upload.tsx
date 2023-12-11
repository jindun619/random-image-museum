import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

import { UploadForm } from "@/components/UploadForm";

import { Session } from "@supabase/supabase-js";

export default function UploadPage() {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
      } else {
        router.push("/signin");
      }
    })();
  }, []);

  if (session) {
    return (
      <div className="flex justify-center mt-5">
        <UploadForm user={session.user} />
      </div>
    );
  }
}
