"use client";

import Image from "next/image";
import Link from "next/link";
import iconHandler from "util/iconHandler";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Session } from "next-auth";
import "app/styles/headerStyle.scss";

export default function UserProfile() {
  const { data: session } = useSession();
  const [click, isClick] = useState<boolean>(false);

  const handleDropDown = () => {
    if (session && session.user) {
      isClick(!click);
    }
  };

  return (
    <>
      <div className="user_profile" onClick={handleDropDown}>
        {session ? <Logout session={session} /> : <Login />}
      </div>
      {click && (
        <div className="logout">
          <button className="logout_button" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      )}
    </>
  );
}

const Login = () => {
  return (
    <Link href="/auth/login" title="로그인">
      {iconHandler("profile", "22")}
    </Link>
  );
};

const Logout = (props: { session: Session }) => {
  const session = props.session;

  return (
    <div>
      <Image
        className="user_profile"
        src={session.user?.image as string}
        alt="user profile"
        width={30}
        height={30}
      />
    </div>
  );
};
