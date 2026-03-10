"use client";

import { useState } from "react";
import CategorySidebar from "../../app/_components/CategorySidebar";
import { TodoList } from "../../app/_components/TodoList";

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("전체 목록");

  const handleSelectCategory = (id: number | null, name: string) => {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
  };

  return (
    <div className="flex min-h-screen">
      {/* 사이드바에 선택 핸들러 전달 */}
      <CategorySidebar 
        onSelectCategory={handleSelectCategory} 
        selectedId={selectedCategoryId} 
      />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 ml-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {selectedCategoryName}
            </h1>
          </header>

          {/* 할 일 목록 컴포넌트 */}
          <TodoList categoryId={selectedCategoryId} />
        </div>
      </main>
    </div>
  );
}