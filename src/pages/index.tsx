import { createClient } from "@supabase/supabase-js";

import { SignInForm } from "@/components/SignInForm";
import { SignUpForm } from "@/components/SignUpForm";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function IndexPage() {
  return (
    <>
      <SignInForm />
      <div className="mt-10"></div>
      <SignUpForm />
    </>
  );
}
