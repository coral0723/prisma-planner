"use client";

import { useEffect, useState } from "react";
import { axiosApi } from "../../../lib/axios";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Category } from "@/model/Category";

export function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosApi.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("카테고리 로딩 실패:", error);
      }
    };
    fetchCategories();
  }, []);

  // 사이드바 내부 콘텐츠
  const SidebarContent = () => (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Planner</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <Separator className="mb-4" />

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="w-full justify-start font-normal"
            >
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: category.color || "#ccc" }}
              />
              <span className="truncate">{category.name}</span>
            </Button>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-muted-foreground px-4 py-2">카테고리가 없습니다.</p>
          )}
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