import { useRouter } from "next/router";

import { VerifyEmailForm } from "@/components/VerifyEmailForm";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { query } = router;
  const { userId } = query;

  if (userId === "undefined") {
    router.push("/");
  }

  return (
    <div className="flex justify-center h-screen">
      <VerifyEmailForm userId={userId as string} />
    </div>
  );
}
