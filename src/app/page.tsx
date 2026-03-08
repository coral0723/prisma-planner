import { CategorySidebar } from "@/app/_components/CategorySidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* 왼쪽 사이드바 */}
      <CategorySidebar />

      {/* 오른쪽 메인 화면 영역 */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground pl-12 lg:pl-0">
              오늘의 할 일
            </h1>
            <p className="text-muted-foreground pl-12 lg:pl-0">
              카테고리를 선택하고 일정을 관리하세요.
            </p>
          </header>

          {/* 여기에 TodoList 컴포넌트가 들어올 예정 */}
          <div className="rounded-xl border border-dashed border-muted-foreground/20 h-[500px] flex items-center justify-center bg-muted/5">
             <p className="text-muted-foreground">할 일 목록을 불러오는 중입니다...</p>
          </div>
        </div>
      </main>
    </div>
  );
}