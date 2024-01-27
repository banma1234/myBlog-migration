"use client";

import useScrollFadeIn from "util/hooks/useScrollFadeIn";
import { SessionProvider } from "next-auth/react";

export function AuthProviders({ children }: { children: React.ReactNode }) {
  useScrollFadeIn([".card_layout"]);
  return <SessionProvider>{children}</SessionProvider>;
}
