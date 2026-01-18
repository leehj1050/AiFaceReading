const ImageUpload = ({ onSelect }: { onSelect: (img: string) => void }) => {
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            onSelect(reader.result as string);
        };
        reader.readAsDataURL(file);
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