# 카테고리 기반 플래너 **"Prisma Planner"**  

<br>

<div align="center">
  <img width="350" height="240" alt="image" src="https://github.com/user-attachments/assets/24e3b739-e8f5-45b4-b4f9-cb17f3ea72eb" />
</div>

<br>

## 프로젝트 소개  

**Prisma Planner**는 카테고리 기반으로 할 일을 관리할 수 있는 간단한 플래너입니다.

Next.js 환경에서 백엔드 로직을 직접 구현해보기 위해 만든 프로젝트로,  
Prisma ORM을 활용해 **데이터베이스 모델링**과 **CRUD 로직**을 경험하는 것을 목표로 했습니다.

사용자는 카테고리를 생성하고,  
각 카테고리 안에서 할 일을 추가하고 체크하며 간단하게 할 일들을 관리할 수 있습니다.

<br>

## 1. 개발 스택

<br>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

<br>

## 2. 기능  

### 🔐 인증
- **Google OAuth 2.0 로그인**
- 로그인한 사용자 기준으로 Todo 데이터 관리

### 📂 카테고리  
- 할 일을 분류하기 위한 **카테고리 생성**
- 카테고리 단위로 할 일 관리

### ✅ 할 일
- 카테고리 내에서 할 일 **추가 및 삭제**
- 완료한 할 일 **체크(완료 상태 변경)**

<br>

## 3. 시스템 아키텍처
<div align="center">
  <img width="663" height="256" alt="시스템 아키텍쳐" src="https://github.com/user-attachments/assets/d7505d83-d2db-4aed-b1f4-77cfe986b10c" />
</div>

<br>

- **Next.js**: 메인 풀스택 프레임워크, 클라이언트/서버 컴포넌트 통합 관리 및 API Routes 구현
- **Prisma**: ORM, 데이터베이스 스키마 정의 및 데이터 CRUD 작업 수행
- **PostgreSQL**: 운영 데이터베이스
- **Google OAuth 2.0**: 사용자 인증 및 보안 소셜 로그인 처리
- **Vercel**: 애플리케이션 호스팅 및 배포, 운영

<br>  

## 4. 프로젝트 구조  
```
├── prisma/               # Prisma 설정 및 데이터베이스 관리
│   ├── migrations/       # DB 스키마 변경 이력
│   └── schema.prisma     # 데이터베이스 모델 정의 (핵심 스키마)
├── src/                  # 애플리케이션 소스 코드
│   ├── app/              # Next.js App Router 기반 페이지 및 로직
│   │   ├── api/          # API 및 메인 기능 라우트
│   │   ├── _components/  # 해당 라우트 내에서만 사용되는 컴포넌트
│   │   ├── _lib/         # 커스텀 axios
│   │   ├── main/         # 로그인 후 메인 페이지
│   │   ├── layout.tsx    # 전역 레이아웃
│   │   └── page.tsx      # 랜딩 페이지
│   ├── components/       
│   │   └── ui/           # shadcn/ui를 통해 생성된 재사용 가능한 공통 컴포넌트
│   ├── lib/              # 프로젝트 전반에서 사용되는 공통 라이브러리 설정
│   ├── model/            # Todo, Category 등 핵심 데이터 타입 정의 (TypeScript)
│   ├── auth.ts           # NextAuth(또는 Auth.js) 인증 메인 설정
│   ├── auth.config.ts    # 미들웨어 및 인증 관련 세부 구성
│   └── middleware.ts     # 경로별 접근 권한 제어를 위한 미들웨어
├── lib/                  
│   └── prisma.ts         # Prisma Client 인스턴스 싱글톤 관리
├── .env                  # 환경 변수 설정 (DB URL, Auth Secret 등)
├── components.json       # shadcn/ui 설정 파일
└── next.config.ts        # Next.js 프로젝트 설정
```

<br>
