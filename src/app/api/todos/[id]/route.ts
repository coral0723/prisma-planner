import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH: 할 일 완료 토글
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) 
      return NextResponse.json({ error: '인증 필요'}, { status: 401 });

    const { id } = await params;
    const { completed } = await request.json();

    const updatedTodo = await prisma.todo.update({
      where: { 
        id: Number(id),
        userId: session.user.id, 
      }, 
      data: { completed },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("원인 파악 용 에러 로그: ", error);
    return NextResponse.json({ error: "수정에 실패했습니다." }, { status: 500 });
  }
}

// DELETE: 할 일 삭제
export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) 
      return NextResponse.json({ error: '인증 필요'}, { status: 401 });

    const { id } = await params;

    await prisma.todo.delete({
      where: { 
        id: Number(id),
        userId: session.user.id, 
      },
    });
    return NextResponse.json({ message: "삭제되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("원인 파악 용 에러 로그: ", error);
    return NextResponse.json({ error: "삭제에 실패했습니다." }, { status: 500 });
  }
}
