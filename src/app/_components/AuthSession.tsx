"use client";

import { SessionProvider, useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";

function SessionGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  
  // 세션 확인 중일 때 로딩 스피너 표시
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  return <>{children}</>
}

export default function AuthSession({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionGuard>{children}</SessionGuard>
    </SessionProvider>
  );
}
