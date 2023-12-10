import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

import { UploadForm } from "@/components/UploadForm";

export default function UploadPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log(data.session);
      } else {
        router.push("/signin");
      }
    })();
  }, []);
  return (
    <div className="flex justify-center mt-5">
      <UploadForm />
    </div>
  );
}
