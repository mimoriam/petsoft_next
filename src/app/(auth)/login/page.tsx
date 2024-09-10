import Link from "next/link";
import AuthForm from "@/components/page-ui/auth-form";

export default function Page() {
  return (
    <main>
      <h1 className="mb-5 text-center">Log In</h1>

      <AuthForm type="logIn" />

      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <Link href="/signup" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
}
