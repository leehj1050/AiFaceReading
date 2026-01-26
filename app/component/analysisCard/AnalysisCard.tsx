import { FaceAnalysisResult } from "@/store/useResultDataStore"
import { FaceSection, PersonalSection } from "./CardItem"


const AnalysisCard = ({ data }: { data: FaceAnalysisResult }) => {

    console.log('data > ', data)

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-6 animate-fade-in">

            {/* 상단 요약 카드 */}
            <section className="rounded-3xl bg-gradient-to-br from-[#1f2937] to-[#111827] text-white p-6 shadow-lg">
                <p className="text-base opacity-70 mb-2 tracking-wide font-semibold">
                    🔮 관상 요약
                </p>
                <p className="text-sm leading-relaxed">
                    {data.result}
                </p>
            </section>

            {/* 얼굴 요소 분석 */}
            <section className="rounded-3xl bg-white/80 backdrop-blur-md border border-black/10 shadow-sm divide-y">
                <FaceSection data={data} />
            </section>

            {/* 성격 & 관계 */}
            <section className="grid grid-cols-1 gap-4">
                <PersonalSection data={data} />
            </section>

            {/* 조언 */}
            <section className="rounded-3xl bg-[#fef3c7] border border-[#fde68a] p-6 shadow-sm">
                <p className="text-sm font-semibold mb-2">✨ 조언</p>
                <p className="text-sm text-gray-800 leading-relaxed">
                    {data.advice}
                </p>
            </section>
        </div>

    )
}

export default AnalysisCard