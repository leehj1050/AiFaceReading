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
        <label className="upload-box">
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFile}
            />
            <p>정면 사진 선택</p>
        </label>
    );
};

export default ImageUpload;