import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/main");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-12 text-center">
        {/* 로고 영역 */}
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none">
            Prisma
            <br />
            <span className="text-blue-600">Planner</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium">
            효율적인 카테고리 기반 할 일 관리
          </p>
        </div>

        {/* 로그인 버튼 영역 */}
        <div className="flex justify-center">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/main" });
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-200 group"
            >
              <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
              <span className="text-slate-700 font-semibold text-lg">
                Google로 시작하기
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* 하단 장식용 (선택 사항) */}
      <footer className="absolute bottom-8 text-slate-400 text-sm">
        © 2026 Prisma Planner. All rights reserved.
      </footer>
    </main>
  );
}