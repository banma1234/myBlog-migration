"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import styles from "../styles/page.module.scss";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error.length != 0) alert(error);
  }, [error]);

  const verifyEmail = () => {
    const regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
    );
    return regex.test(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin(); // 작성한 댓글 post 요청하는 함수
    }
  };

  const handleLogin = async () => {
    if (!email || !password)
      return setError("이메일 혹은 비밀번호를 입력해주세요.");
    if (!verifyEmail) return setError("잘못된 이메일 형식입니다.");

    try {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/",
      });
      return;
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
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        value={password}
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <hr />
      <button className={styles.button} onClick={handleLogin}>
        Submit
      </button>
      <p className={styles.description}>
        관리자 로그인 페이지로 일반 사용자는 회원가입 및 로그인할 수 없습니다.
      </p>
    </section>
  );
}
