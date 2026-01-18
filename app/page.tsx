import Main from "./main/Main";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F6F5F1] text-[#1C1C1C]">
      {/* Header */}
      <header className="max-w-[500px] w-full px-4 py-6 bg-white flex flex-col items-center">
        <h1 className="text-3xl font-serif tracking-widest">
          AI 관상 분석
        </h1>
        <p className="text-[#6B6B6B] mt-2 text-sm">
          얼굴에 담긴 당신의 운명을 읽어드립니다
        </p>
      </header>

      <main className="max-w-[500px] w-full flex-1 px-4 py-6 bg-white ">
        <Main />
      </main>

      {/* Footer */}
      <footer className="max-w-[500px] w-full px-5 py-4 text-xs text-[#8A8A8A] bg-white border-t border-gray-200">
        © 2026 AI Face Reading
      </footer>
    </div>
  );
}
