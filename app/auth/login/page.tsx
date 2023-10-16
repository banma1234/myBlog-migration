"use client";

import { signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h3>Login component client rendered</h3>
      <button onClick={() => signIn("google")}>Google Sign in</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
