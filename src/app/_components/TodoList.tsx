"use client";

import { useEffect, useState, useCallback } from "react";
import { axiosApi } from "@/app/_lib/axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
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
            <Card key={todo.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox id={`todo-${todo.id}`} checked={todo.completed} />
                <label 
                  htmlFor={`todo-${todo.id}`}
                  className={`text-sm font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                >
                  {todo.title}
                </label>
              </div>
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