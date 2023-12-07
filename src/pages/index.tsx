import { SignInForm } from "@/components/SignInForm";
import { SignUpForm } from "@/components/SignUpForm";

export default function IndexPage() {
  return (
    <>
      <SignInForm />
      <div className="mt-10"></div>
      <SignUpForm />
    </>
  );
}
