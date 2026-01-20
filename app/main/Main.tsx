'use client'

import { useFaceImageStore } from "@/store/useFaceImageStore";
import ImageUpload from "../component/imgUpload_Camera/ImageUpload";
import Button from "../component/button/Button";


const Main = () => {
    const { file, previewUrl, validation, setValidation, resetImage } = useFaceImageStore();

    console.log("현재 상태:", { file, previewUrl });

    // 얼굴 분석 핸들러
    const handleAnalyze = async () => {
        if (!file) return;

        try {
            setValidation("validating");

            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch("/api/face/validate", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!data.success) {
                if (data.reason === "NO_FACE") setValidation("no-face");
                if (data.reason === "MULTIPLE_FACES") setValidation("multiple-faces");
                return;
            }

            setValidation("valid");

            console.log("✅ 얼굴 검증 통과 → 관상 분석 진행");
        } catch {
            setValidation("error");
        }
    };


    return (
        <section className="flex flex-col items-center gap-8 text-[#1C1C1C]">
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

        </section>
    );
};

export default Main;
