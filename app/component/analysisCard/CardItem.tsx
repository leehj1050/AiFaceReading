const FACE_SECTIONS = [
    { key: "face", label: "🧠 얼굴형" },
    { key: "forehead", label: "🌤 이마" },
    { key: "eyes", label: "👀 눈" },
    { key: "nose", label: "👃 코" },
    { key: "mouth", label: "👄 입" },
    { key: "chin", label: "🪙 턱" },
] as const;

export const FaceSection = ({ data }: any) => {
    return (
        <div className="divide-y">
            {FACE_SECTIONS.map(({ key, label }) => (
                <div key={key} className="p-5 hover:bg-black/[0.02] transition">
                    <h3 className="text-xs font-semibold text-gray-500 mb-1">
                        {label}
                    </h3>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        {data[key]}
                    </p>
                </div>
            ))}
        </div>
    );
};

const PERSONAL_SECTIONS = [
    { key: "personality_strengths", label: "👍 강점" },
    { key: "personality_weaknesses", label: "⚠️ 주의점" },
    { key: "relationship_tendency", label: "🤝 대인관계" },
] as const;

export const PersonalSection = ({ data }: any) => {
    return (
        PERSONAL_SECTIONS.map(({ key, label }) => (
            <div
                key={key}
                className="rounded-2xl bg-slate-50 border border-black/10 p-5 shadow-sm"
            >
                <h3 className="text-xs font-semibold text-slate-600 mb-2">
                    {label}
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                    {data[key]}
                </p>
            </div>
        ))
    );
};
