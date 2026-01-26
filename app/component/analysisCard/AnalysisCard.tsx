import { FaceAnalysisResult } from "@/store/useResultDataStore";
import { FaceSection, PersonalSection } from "./CardItem";

const AnalysisCard = ({ data }: { data: FaceAnalysisResult }) => {
    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-8 animate-fade-in">

            {/* 🔮 관상 요약 (Hero) */}
            <section className="relative rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white p-7 shadow-xl">
                <span className="absolute -top-3 left-6 bg-indigo-600 text-xs px-3 py-1 rounded-full">
                    관상 요약
                </span>
                <p className="text-sm leading-relaxed opacity-90 mt-2">
                    {data.result}
                </p>
            </section>

            {/* 🧠 얼굴 요소 */}
            <section className="rounded-3xl bg-white/90 backdrop-blur border border-black/10 shadow-sm overflow-hidden">
                <FaceSection data={data} />
            </section>

            {/* ⚖️ 성향 */}
            <section className="grid gap-4">
                <PersonalSection data={data} />
            </section>

            {/* ✨ 조언 */}
            <section className="rounded-3xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 p-6 shadow-inner">
                <p className="text-sm font-semibold mb-3 text-amber-900">
                    ✨ 관상 조언
                </p>
                <p className="text-sm text-amber-900 leading-relaxed">
                    {data.advice}
                </p>
            </section>
        </div>
    );
};

export default AnalysisCard;