"use client";

import { signIn } from "next-auth/react";
import styles from "../styles/page.module.scss";

export default function Login() {
  return (
    <div className="login">
      <h3>Login component client rendered</h3>
      <button
        className={styles.google}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Google Sign in
      </button>
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Github Sign in
      </button>
    </div>
  );
}
