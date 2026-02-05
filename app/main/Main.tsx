'use client'

import { useFaceImageStore } from "@/store/useFaceImageStore";
import ImageUpload from "../component/imgUpload_Camera/ImageUpload";
import Button from "../component/button/Button";
import { useFaceAnalysisStore } from "@/store/useResultDataStore";
import AnalysisCard from "../component/analysisCard/AnalysisCard";


const Main = () => {
    const { previewUrl, validation, resetImage } = useFaceImageStore();
    const { analysis } = useFaceAnalysisStore();

    return (
        <section className="flex flex-col items-center gap-8 text-[#1C1C1C] flex-1 ">
            {/* Face Input */}
            {
                analysis ? (
                    <AnalysisCard data={analysis} />
                ) : validation === "ai-analyzing" ? (
                    /* 🔮 AI 분석 중 로딩 UI */
                    <div className="w-full flex-1 flex flex-col items-center justify-center text-black">
                        {/* 텍스트 쉬머 */}
                        <div className="w-full flex-1 flex items-center justify-center">
                            <p className="text-lg tracking-wide text-shimmer">
                                관상을 분석하는 중입니다...
                            </p>
                        </div>
                    </div>

                ) : (
                    /* 📸 이미지 업로드 / 미리보기 */
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

                                {validation === "face-validating" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm">
                                        얼굴 인식 중...
                                    </div>
                                )}
                            </div>
                        ) : (
                            <ImageUpload />
                        )}
                    </div>
                )
            }


            <div className="text-center">
                <p className="text-sm text-[#969696]">* 분석에 사용된 사진은 저장되지 않습니다.</p>
            </div>

            {/** 분석버튼 */}
            <Button />

            {validation === "no-face" && (
                <p className="text-sm text-red-500 text-center">
                    얼굴이 감지되지 않았습니다. 정면 얼굴 사진을 업로드해 주세요.
                </p>
            )}

            {validation === "multiple-faces" && (
                <p className="text-sm text-red-500 text-center">
                    한 명의 얼굴만 포함된 사진을 업로드해 주세요.
                </p>
            )}

            {validation === "image-too-large" && (
                <p className="text-sm text-red-500 text-center">
                    사진용량이 5MB를 초과했습니다. 용량을 줄여 다시 업로드해 주세요.
                </p>
            )}

            {validation === "error" && (
                <p className="text-sm text-red-500 text-center">
                    오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                </p>
            )}

        </section>
    );
};

export default Main;
