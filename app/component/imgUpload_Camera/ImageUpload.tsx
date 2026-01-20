import { useFaceImageStore } from "@/store/useFaceImageStore";

const ImageUpload = () => {
    const { setImage } = useFaceImageStore();

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setImage(file, previewUrl);
    };
    return (
        <label className="w-full h-full rounded-full flex justify-center items-center ">
            <input
                type="file"
                accept="image/*"
                capture="environment" // 모바일에서 카메라 바로 실행
                hidden
                onChange={handleFile}
            />
            <p>정면 사진 찍기</p>
        </label>
    );
};

export default ImageUpload;