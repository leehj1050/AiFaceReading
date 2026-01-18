'use client'

import ImageUpload from "../component/imgUpload_Camera/ImageUpload";


const Main = () => {
    return (
        <section className="flex flex-col items-center gap-8 text-[#1C1C1C]">

            {/* Face Input */}
            <div className="w-52 h-52 rounded-full border border-black/10 flex items-center justify-center bg-white shadow-sm">
                <ImageUpload onSelect={(img) => console.log(img)} />
            </div>

            {/* Action Button */}
            <button
                className="
          w-full py-4 rounded-xl
          bg-[#1C1C1C] text-white
          font-semibold tracking-wide
          active:scale-[0.98] transition
        "
            >
                관상 분석 시작하기
            </button>

            {/* Result Preview Card */}
            <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-black/5">
                <h3 className="text-base font-semibold mb-2">
                    성격 요약
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    신중하고 분석적인 성향이 강하며, 책임감이 뛰어난 편입니다.
                </p>
            </div>

        </section>
    );
};

export default Main;
