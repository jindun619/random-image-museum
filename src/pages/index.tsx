import { createClient } from "@supabase/supabase-js";

import { SignIn } from "@/components/organisms/SignIn";
import { SignUp } from "@/components/organisms/SignUp";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function IndexPage() {
  return (
    <>
      <SignIn />
      <div className="mt-10"></div>
      <SignUp />
    </>
  );
}
