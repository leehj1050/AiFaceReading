import React from 'react'

const FACE_SECTIONS = [
    { key: "face", label: "얼굴형" },
    { key: "forehead", label: "이마" },
    { key: "eyes", label: "눈" },
    { key: "nose", label: "코" },
    { key: "mouth", label: "입" },
    { key: "chin", label: "턱" },
] as const;

const PERSONAL_SECTIONS = [
    { key: "personality_strengths", label: "성격적 장점" },
    { key: "personality_weaknesses", label: "성격적 단점" },
    { key: "relationship_tendency", label: "대인관계 성향" },
] as const;

export const FaceSection = ({ data }: any) => {
    return (
        FACE_SECTIONS.map(({ key, label }) => (
            <div key={key} className="p-5">
                <h3 className="text-sm font-semibold mb-1">{label}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {data[key]}
                </p>
            </div>
        ))
    )
}

export const PersonalSection = ({ data }: any) => {
    return (
        PERSONAL_SECTIONS.map(({ key, label }) => (
            <div key={key} className="rounded-2xl bg-white border border-black/10 p-5 shadow-sm">
                <h3 className="text-sm font-semibold mb-2">{label}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {data[key]}
                </p>
            </div>
        ))
    )
}