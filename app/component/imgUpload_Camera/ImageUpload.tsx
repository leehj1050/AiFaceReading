import { useFaceImageStore } from "@/store/useFaceImageStore";
import { MdAddAPhoto } from "react-icons/md";

const ImageUpload = () => {
    const { setImage, setValidation } = useFaceImageStore();

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setImage(file, previewUrl);
        setValidation("ready-to-analyze");
    };
    return (
        <label className="w-full h-full rounded-full flex justify-center items-center">
            <input
                type="file"
                accept="image/*"
                capture="environment" // 모바일에서 카메라 바로 실행
                hidden
                onChange={handleFile}
            />
            <div className="flex flex-col items-center gap-1">
                <MdAddAPhoto className="text-2xl" />
                <p className="font-semibold text-sm">정면 사진 찍기</p>
            </div>
        </label>
    );
};

export default ImageUpload;