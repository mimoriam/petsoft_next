"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AuthFormBtn from "@/components/page-ui/auth-form-btn";
import { useFormState } from "react-dom";
import { logIn, signUp } from "@/actions/actions";

type AuthFormProps = {
  type: "logIn" | "signUp";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);

  return (
    <form action={type === "logIn" ? dispatchLogIn : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={100} />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={100}
        />
      </div>

      <AuthFormBtn type={type} />

      {signUpError && (
        <p className="mt-2 text-sm text-red-500">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="mt-2 text-sm text-red-500">{logInError.message}</p>
      )}
    </form>
  );
}
