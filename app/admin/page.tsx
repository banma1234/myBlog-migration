export default async function Admin() {
  return (
    <div>
      <h1>Login bitch</h1>
      <h2>how can i help you?</h2>
      <p>it's admin page</p>
    </div>
  );
}

// "use client";

// import { useSession } from "next-auth/react";

// export default function Admin() {
//   const { data: session, status } = useSession();

//   return (
//     <div>
//       <h1>Login bitch</h1>
//       <h2>how can i help you?</h2>
//       {session && session.user && (
//         <>
//           <h1>hi {session.user.name}</h1>
//           <p>{session.user.email}</p>
//         </>
//       )}
//       {!session && <h1>No!!!</h1>}
//       <button onClick={() => console.log(session)}>show session</button>
//       <button onClick={() => console.log(status)}>show status</button>
//     </div>
//   );
// }
