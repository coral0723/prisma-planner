"use client";

import { useCallback, useEffect, useState } from "react";
import { axiosApi } from "../_lib/axios";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Category } from "@/model/Category";
import AddCategoryDialog from "./AddCategoryDialog";

type Props = {
  onSelectCategory: (id: number | null, name: string) => void;
  selectedId: number | null;
}

export default function CategorySidebar({ onSelectCategory, selectedId }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axiosApi.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("카테고리 로딩 실패:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 사이드바 내부 콘텐츠
  const SidebarContent = () => (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 mb-4 flex items-center justify-between">
        <button 
          onClick={() => onSelectCategory(null, "전체 목록")}
          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
        >
          Planner
        </button>
        <AddCategoryDialog onSuccess={fetchCategories} />
      </div>
      
      <Separator className="mb-4" />

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {/* 전체보기 버튼 추가 */}
          <Button
            variant={selectedId === null ? "secondary" : "ghost"}
            className="w-full justify-start font-normal"
            onClick={() => onSelectCategory(null, "전체 목록")}
          >
            <div className="w-3 h-3 rounded-full mr-3 border border-dashed" />
            <span>전체보기</span>
          </Button>

          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedId === category.id ? "secondary" : "ghost"}
              className="w-full justify-start font-normal"
              onClick={() => onSelectCategory(category.id, category.name)}
            >
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: category.color || "#ccc" }}
              />
              <span className="truncate">{category.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* 모바일용 시트 (Lg 사이즈 미만에서만 보임) */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* 데스크톱용 고정 사이드바 (Lg 사이즈 이상에서만 보임) */}
      <aside className="hidden lg:flex w-64 border-r bg-muted/20 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
