import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// 모든 카테고리를 가져오는 내부 함수 (사용자 정의 이름)
async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }, // 이름순 정렬
  });
}

// GET: 카테고리 목록 조회
export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: '목록 조회 실패' }, { status: 500 });
  }
}

// POST: 새 카테고리 생성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, color } = body;

    if (!name) {
      return NextResponse.json({ error: '이름은 필수입니다.' }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: { name, color },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '카테고리 생성 실패' }, { status: 500 });
  }
}
