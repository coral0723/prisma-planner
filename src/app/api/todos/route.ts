import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

// GET: 할 일 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const whereCondition = categoryId
      ? { categoryId: Number(categoryId) }
      : {}; // categoryId가 없으면 전체 조회

    const todos = await prisma.todo.findMany({
      where: whereCondition,
      include: { category: true },
      orderBy: { id: "desc" },
    });
    
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: '할 일 목록 조회 실패' }, { status: 500 });
  }
}

// POST: 새 할 일 생성
export async function POST(request: Request) {
  try {
    const { title, categoryId } = await request.json();

    if (!title || !categoryId) {
      return NextResponse.json({ error: "제목과 카테고리 ID가 필요합니다." }, { status: 400 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        // connect를 사용하여 기존 카테고리와 연결
        category: {
          connect: { id: Number(categoryId) },
        },
      },
      include: {
        category: true, // 생성된 데이터와 함께 부모 카테고리 정보도 반환
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("원인 파악 용 에러 로그: ", error);
    return NextResponse.json({ error: "할 일 생성 실패." }, { status: 500 });
  }
}
