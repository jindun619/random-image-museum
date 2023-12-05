import { createClient } from "@supabase/supabase-js";

import SignIn from "@/components/organisms/SignIn";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function IndexPage() {
  return <SignIn />;
}
