"use client";

import Image from "next/image";
import Link from "next/link";
import iconHandler from "util/iconHandler";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Session } from "next-auth";
import { Tooltip } from "..";
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
      <div className="user__profile" onClick={handleDropDown}>
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
    <Tooltip title={"관리자 로그인"}>
      <Link href="/auth/login">{iconHandler("profile", "23")}</Link>
    </Tooltip>
  );
};

const Logout = (props: { session: Session }) => {
  const session = props.session;

  return (
    <div>
      <Image
        className="user__profile"
        src={session.user?.image as string}
        alt="user profile"
        width={30}
        height={30}
      />
    </div>
  );
};
