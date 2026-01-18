'use client'

import { useFaceImageStore } from "@/store/useFaceImageStore";
import ImageUpload from "../component/imgUpload_Camera/ImageUpload";


const Main = () => {
    const { previewUrl, resetImage } = useFaceImageStore();

    return (
        <section className="flex flex-col items-center gap-8 text-[#1C1C1C]">
            {/* Face Input */}

            {/* Face Input */}
            <div className="relative w-52 h-52 rounded-full border border-black/30 bg-gray-50 shadow-sm overflow-hidden flex items-center justify-center">
                {previewUrl ? (
                    <div className="relative w-full h-full">
                        <img
                            src={previewUrl}
                            alt="선택된 얼굴 이미지"
                            className="w-full h-full object-cover rounded-full"
                        />

                        <button
                            onClick={resetImage}
                            className="
                            absolute bottom-2 left-1/2 -translate-x-1/2
                            bg-black/70 text-white
                            text-xs px-3 py-1.5
                            rounded-full
                            shadow  
                            "
                        >
                            변경
                        </button>
                    </div>
                ) : (
                    <ImageUpload />
                )}
            </div>

            <div className="text-center">
                <p className="text-sm text-[#969696]">* 분석에 사용된 사진은 저장되지않습니다.</p>
            </div>

            {/* Action Button */}
            <button
                className={`w-full py-4 rounded-xl font-semibold tracking-wide transition-all 
                    ${!previewUrl
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#1C1C1C] text-white active:scale-[0.98]"
                    }`}
                disabled={!previewUrl ? true : false}
                onClick={() => console.log("관상 분석 시작")}
            >
                관상 분석 시작하기
            </button>

        </section>
    );
};

export default Main;
