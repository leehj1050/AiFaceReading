import { useFaceImageStore } from '@/store/useFaceImageStore';
import React from 'react'

{/* Action Button */ }
const Button = () => {
    const { file, previewUrl, validation, setValidation, resetImage } = useFaceImageStore();

    // 얼굴 분석 핸들러
    const handleAnalyze = async () => {
        if (!file) return;

        try {
            setValidation("validating");

            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch("/api/face/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error("분석 실패");
            }

            console.log("관상 결과:", data.result);

            // TODO:
            // - zustand에 result 저장
            // - 결과 화면으로 이동

        } catch (err) {
            console.error(err);
            setValidation("error");
        }
    };


    return (
        <button
            className={`w-full py-4 rounded-xl font-semibold tracking-wide transition-all 
                    ${!previewUrl
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#1C1C1C] text-white active:scale-[0.98]"
                }`}
            disabled={!previewUrl ? true : false}
            onClick={handleAnalyze}
        >
            {validation === "validating"
                ? "얼굴 확인 중..."
                : "관상 분석 시작하기"}
        </button>

    )
}

export default Button