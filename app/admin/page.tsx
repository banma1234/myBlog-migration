"use client";
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session, status } = useSession();

  return (
    <div>
      {session && <h1>hi {session.user?.email || `nothing`}</h1>}
      {!session && <h1>No!!!</h1>}
      <button onClick={() => console.log(session)}>show session</button>
      <button onClick={() => console.log(status)}>show status</button>
    </div>
  );
}
