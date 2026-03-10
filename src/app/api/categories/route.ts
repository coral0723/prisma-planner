import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { auth } from '@/auth';

// GET: 카테고리 목록 조회
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) 
      return NextResponse.json({ error: '인증 필요'}, { status: 401 });

    const categories = await prisma.category.findMany({
      where: { userId: session.user.id }, // 본인 것만 필터링
      orderBy: { name: 'asc' }, // 이름순 정렬
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("원인 파악 용 에러 로그: ", error);
    return NextResponse.json({ error: '목록 조회 실패' }, { status: 500 });
  }
}

// POST: 새 카테고리 생성
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) 
      return NextResponse.json({ error: '인증 필요'}, { status: 401 });

    const { name, color } = await request.json();
    if (!name) {
      return NextResponse.json({ error: '이름은 필수입니다.' }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: { 
        name, 
        color,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("원인 파악 용 에러 로그: ", error);
    return NextResponse.json({ error: '카테고리 생성 실패' }, { status: 500 });
  }
}
