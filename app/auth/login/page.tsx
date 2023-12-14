"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "../styles/page.module.scss";

export default function Login() {
  const DEFAULT_MESSAGE =
    "관리자 로그인 페이지로 일반 사용자는 회원가입 및 로그인할 수 없습니다.";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [emailRef, setEmailRef] = useState<HTMLInputElement | null>(null);
  const [passwordRef, setpasswordRef] = useState<HTMLInputElement | null>(null);
  const [descriptionRef, setDescriptionRef] =
    useState<HTMLParagraphElement | null>(null);

  const router = useRouter();

  const handleError = (message: string, target: "EMAIL" | "PASSWORD") => {
    if (emailRef && passwordRef) {
      switch (target) {
        case "EMAIL":
          passwordRef.classList.remove(styles["input__shake"]);
          emailRef.classList.remove(styles["input__shake"]);
          void emailRef.offsetWidth;
          emailRef.classList.add(styles["input__shake"]);
          break;
        case "PASSWORD":
          emailRef.classList.remove(styles["input__shake"]);
          passwordRef.classList.remove(styles["input__shake"]);
          void passwordRef.offsetWidth;
          passwordRef.classList.add(styles["input__shake"]);
          break;
      }
    }
    if (descriptionRef) {
      descriptionRef.classList.remove(styles["description__shake"]);
      void descriptionRef.offsetWidth;
      descriptionRef.classList.add(styles["description__shake"]);
    }
    setError(message);
  };

  const verifyEmail = (email: string) => {
    const regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    return regex.test(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!email) return handleError("⚠️ 이메일을 입력해주세요.", "EMAIL");
    if (!password)
      return handleError("⚠️ 비밀번호를 입력해주세요.", "PASSWORD");
    if (!verifyEmail(email))
      return handleError("⚠️ 잘못된 이메일 형식입니다.", "EMAIL");

    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      switch (res?.status) {
        case 401:
          if (passwordRef && emailRef) {
            emailRef.classList.remove(styles["input__shake"]);
            passwordRef.classList.remove(styles["input__shake"]);
            void passwordRef.offsetWidth;
            passwordRef.classList.add(styles["input__shake"]);
          }
          return handleError(
            "⚠️ ID 혹은 비밀번호가 일치하지 않습니다.",
            "PASSWORD"
          );
        case 200:
          setError("");
          return router.replace("/");
        default:
          return handleError(res?.error as string, "PASSWORD");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error("Unknown error");
      }
    }
  };

  return (
    <section className={styles.container} onKeyDown={handleKeyDown}>
      <h1>Login</h1>
      <input
        className={styles.input}
        value={email}
        placeholder="e-mail"
        ref={setEmailRef}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        value={password}
        type="password"
        placeholder="password"
        ref={setpasswordRef}
        onChange={(e) => setPassword(e.target.value)}
      />
      <hr />
      <button className={styles.button} onClick={handleLogin}>
        Submit
      </button>
      <p className={styles.description} ref={setDescriptionRef}>
        {error.length === 0 ? DEFAULT_MESSAGE : error}
      </p>
    </section>
  );
}
