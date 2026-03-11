import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

// GET: 할 일 목록 조회
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) 
      return NextResponse.json({ error: '인증 필요'}, { status: 401 });

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    // 조건문에 userId를 무조건 포함
    const whereCondition: any = { userId: session.user.id };
    if (categoryId) 
      whereCondition.categoryId = Number(categoryId);

    const todos = await prisma.todo.findMany({
      where: whereCondition, // userId와 categoryId 둘 다 만족시키는 것만 필터링
      include: { category: true },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("원인 파악 용 에러 로그: ", error);
    return NextResponse.json({ error: '할 일 목록 조회 실패' }, { status: 500 });
  }
}

// POST: 새 할 일 생성
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) 
      return NextResponse.json({ error: '인증 필요'}, { status: 401 });

    const { title, categoryId } = await request.json();
    if (!title || !categoryId) {
      return NextResponse.json({ error: "제목과 카테고리 ID가 필요합니다." }, { status: 400 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        userId: session.user.id,
        // connect를 사용하여 기존 카테고리와 연결
        categoryId: Number(categoryId)
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
