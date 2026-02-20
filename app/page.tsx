import Main from "./main/Main";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center text-white">
      {/* Header */}
      <header className="max-w-[500px] w-full px-4 py-6 flex flex-col items-center bg-[#0F172A] border border-[#0F172A]">
        <h1 className="font-serif text-3xl font-semibold tracking-widest ">
          ✨AI 관상 분석✨
        </h1>
        <p className=" mt-2 text-sm text-[#FACC15]">
          얼굴에 담긴 당신의 운명을 읽어드립니다.
        </p>
      </header>

      <main className="max-w-[500px] w-full flex-1 px-4 py-6 bg-white flex flex-col border border-[#f5f5f5f5]">
        <Main />
      </main>

      {/* Footer */}
      <footer className="max-w-[500px] w-full px-5 py-4 text-xs text-[#8A8A8A] bg-[#f5f5f5] border border-[#f5f5f5f5]">
        <div className="flex flex-col gap-2">
          <p>
            © 2026 AI Face Reading. All rights reserved.
          </p>

          <p>
            본 서비스는 재미와 참고용으로 제공되며, 실제 판단의 근거로 사용될 수 없습니다.
          </p>

          <p>
            문의:
            <a
              href="mailto:hj10150@gmail.com"
              className="text-[#6B6B6B] underline "
            >
              hj10150@gmail.com
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}
