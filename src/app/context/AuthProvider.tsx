"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

export default function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
