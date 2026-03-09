"use client";

import { useCallback, useEffect, useState } from "react";
import { axiosApi } from "../_lib/axios";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Menu, LogOut } from "lucide-react"; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Category } from "@/model/Category";
import AddCategoryDialog from "./AddCategoryDialog";
import { signOut, useSession } from "next-auth/react"; 

type Props = {
  onSelectCategory: (id: number | null, name: string) => void;
  selectedId: number | null;
}

export default function CategorySidebar({ onSelectCategory, selectedId }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: session } = useSession(); 

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-4">
      {/* 헤더 영역 */}
      <div className="px-4 mb-4 flex items-center justify-between">
        <button 
          onClick={() => onSelectCategory(null, "전체 목록")}
          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
        >
          Planner
        </button>
        <div className="lg:mr-0 mr-10">
          <AddCategoryDialog onSuccess={fetchCategories} />
        </div>
      </div>
      
      <Separator className="mb-4" />

      {/* 카테고리 리스트 영역 */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
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

      {/* 하단 프로필 영역 */}
      <div className="mt-auto px-4 pt-4 border-t">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            {/* 프로필 이미지 */}
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="profile" 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-200" />
            )}
            <span className="text-sm font-medium text-slate-700 truncate max-w-[100px]">
              {session?.user?.name || "사용자"}
            </span>
          </div>
          
          {/* 로그아웃 버튼 */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-500 hover:text-red-500 hover:bg-red-50"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
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

      <aside className="hidden lg:flex w-64 border-r bg-muted/20 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}