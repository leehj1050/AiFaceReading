import { Analyze } from '@/feature/analyzeAPI/Analyze';
import { useFaceImageStore } from '@/store/useFaceImageStore';
import { useFaceAnalysisStore } from '@/store/useResultDataStore';

{/* Action Button */ }
const Button = () => {
    const { validation, resetImage } = useFaceImageStore();
    const { handleAnalyze } = Analyze()
    const { resetAnalysis } = useFaceAnalysisStore();

    const enabledStates = ["ready-to-analyze", "valid"];
    const errorStates = ["no-face", "multiple-faces", "image-too-large", "error"];

    const handleButtonClick = () => {
        switch (validation) {
            case "ready-to-analyze":
                handleAnalyze();
                break;

            case "valid":
                resetImage();
                resetAnalysis();
                break;

            default:
                return;
        }
    };


    return (
        <>
            <button
                className={`w-full py-4 rounded-xl font-semibold tracking-wide transition-all 
                        ${enabledStates.includes(validation)
                        ? "bg-[#1C1C1C] text-white active:scale-[0.98]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                disabled={!enabledStates.includes(validation)}
                onClick={handleButtonClick}
            >
                {validation === "default" && "사진을 업로드해주세요"}
                {validation === "ready-to-analyze" && "관상 분석하기"}
                {validation === "face-validating" && "얼굴 분석중.."}
                {validation === "ai-analyzing" && "관상 분석중.."}
                {validation === "valid" && "처음으로"}
                {errorStates.includes(validation) && "사진을 변경해주세요."}
            </button>
        </>

    )
}

export default Button