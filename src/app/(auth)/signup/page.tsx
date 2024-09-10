import Link from "next/link";
import AuthForm from "@/components/page-ui/auth-form";

export default function Page() {
  return (
    <main>
      <h1 className="mb-5 text-center">Sign Up</h1>

      <AuthForm type="signUp" />

      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
}
