import LoadingSpinner from "./_components/LoadingSpinner"; 

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50/50 backdrop-blur-sm fixed inset-0 z-[9999]">
      <div className="space-y-4 text-center">
        <LoadingSpinner size="lg" />
        
        <div className="space-y-1">
          <p className="text-lg font-semibold text-slate-700 animate-pulse">
            플래너를 불러오고 있어요
          </p>
          <p className="text-sm text-slate-500">잠시만 기다려주세요...</p>
        </div>
      </div>
    </div>
  );
}
