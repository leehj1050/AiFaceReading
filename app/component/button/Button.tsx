import { Analyze } from '@/feature/analyzeAPI/Analyze';
import { useFaceImageStore } from '@/store/useFaceImageStore';
import React, { useEffect, useState } from 'react'

{/* Action Button */ }
const Button = () => {
    const { file, validation, setValidation } = useFaceImageStore();
    const { handleAnalyze } = Analyze()

    useEffect(() => {
        if (!file) return
        setValidation("face-validating")
    }, [file])

    return (
        <>
            <button
                className={`w-full py-4 rounded-xl font-semibold tracking-wide transition-all 
                    ${validation === "default"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#1C1C1C] text-white active:scale-[0.98]"
                    }`}
                disabled={validation === "default" ? true : false}
                onClick={handleAnalyze}
            >
                {validation === "default"
                    ? "사진을 업로드해주세요" : "관상 분석하기"}
            </button>
        </>

    )
}

export default Button