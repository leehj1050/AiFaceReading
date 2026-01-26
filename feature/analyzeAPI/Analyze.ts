import { useFaceImageStore } from '@/store/useFaceImageStore';
import { useFaceAnalysisStore } from '@/store/useResultDataStore';

export const Analyze = () => {
    const { file, previewUrl, setValidation } = useFaceImageStore();
    const {setAnalysis} = useFaceAnalysisStore()
    
  // 얼굴 분석 핸들러
    const handleAnalyze = async () => {
        if (!file || !previewUrl) return;

        try {
            setValidation("face-validating");

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
                if (data.reason === "IMAGE_TOO_LARGE") setValidation("image-too-large");
                return;
            }

            // 검증 통과
            setValidation("ai-analyzing");
            await getFaceAnalysis();

        } catch {
            setValidation("error");
        }
    };

    // 얼굴 분석 핸들러
    const getFaceAnalysis = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("/api/face/analyze", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!data.success) {
            setValidation("error")
        }

        // 분석 결과 저장
        const analysisResult = JSON.parse(data.result);
        setAnalysis(analysisResult);
        setValidation("valid"); // 분석 완료 상태로 변경

    };

    return {handleAnalyze}
}