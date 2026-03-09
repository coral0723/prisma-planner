"use client";

import { useEffect, useState, useCallback } from "react";
import { axiosApi } from "@/app/_lib/axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Todo } from "@/model/Todo";

type Props = {
  categoryId: number | null;
}

export function TodoList({ categoryId }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      // categoryId가 있으면 쿼리 스트링 추가
      const url = categoryId ? `/todos?categoryId=${categoryId}` : "/todos";
      const { data } = await axiosApi.get(url);
      setTodos(data);
    } catch (error) {
      console.error("할 일 로딩 실패:", error);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim() || !categoryId) return; // 카테고리 선택 시에만 추가 가능

    setLoading(true);
    try {
      await axiosApi.post("/todos", {
        title: newTodoTitle,
        categoryId: categoryId,
      });
      setNewTodoTitle("");
      fetchTodos();
    } catch (error) {
      console.error("할 일 생성 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 할 일 상태 토글 함수
  const toggleTodo = async (id: number, currentStatus: boolean) => {
    try {
      await axiosApi.patch(`/todos/${id}`, {
        completed: !currentStatus,
      });
      fetchTodos();
    } catch (error) {
      console.error("상태 변경 실패:", error);
    }
  };

  // 할 일 삭제 함수
  const deleteTodo = async (id: number) => {
    if (!confirm("정말 이 할 일을 삭제하시겠습니까?")) return;

    try {
      await axiosApi.delete(`/todos/${id}`);
      // 삭제 후 목록 새로고침
      fetchTodos();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 할 일 추가 폼 (카테고리가 선택되었을 때만 노출) */}
      {categoryId && (
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <Input
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="새로운 할 일을 입력하세요"
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            <Plus className="h-4 w-4 mr-2" /> 추가
          </Button>
        </form>
      )}

      {/* 할 일 목록 */}
      <div className="grid gap-3">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Card key={todo.id} className="p-4 flex flex-row items-center justify-between group">
              <div className="flex items-center gap-3">
                <Checkbox 
                  id={`todo-${todo.id}`} 
                  className="cursor-pointer"
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id, todo.completed)} 
                />
                <label 
                  htmlFor={`todo-${todo.id}`}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    todo.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {todo.title}
                </label>
              </div>
              {/* 삭제 버튼 추가: 평소에는 투명하다가 카드에 마우스를 올리면 나타나도록 설정(group-hover) */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground border border-dashed rounded-lg">
            등록된 할 일이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}