import { Noto_Sans_KR } from "next/font/google";
import Main from "./main/Main";

const font = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F6F5F1] text-[#1C1C1C]">
      {/* Header */}
      <header className="max-w-[500px] w-full px-4 py-6 bg-white flex flex-col items-center">
        <h1 className={`${font.className} text-3xl font-serif tracking-widest`}>
          AI 관상 분석
        </h1>
        <p className="text-[#6B6B6B] mt-2 text-sm">
          얼굴에 담긴 당신의 운명을 읽어드립니다
        </p>
      </header>

      <main className="max-w-[500px] w-full flex-1 px-4 py-6 bg-white flex flex-col">
        <Main />
      </main>

      {/* Footer */}
      <footer className="max-w-[500px] w-full px-5 py-4 text-xs text-[#8A8A8A] bg-white border-t border-black/10">
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
