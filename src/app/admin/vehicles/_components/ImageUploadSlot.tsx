import { Plus } from "lucide-react";
import Image from "next/image";

interface ImageUploadSlotProps {
  img: File | string | null;
  index: number;
  onChange: (file: File | null) => void;
}

const ImageUploadSlot = ({ img, index, onChange }: ImageUploadSlotProps) => {
  const isMain = index === 0;

  const imageSrc = img instanceof File ? URL.createObjectURL(img) : img;

  return (
    <label
      className={`relative aspect-square border-2 border-dashed border-rose-100 hover:border-rose-500 rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:bg-rose-50/40 transition-all ${
        isMain
          ? "col-span-12 aspect-video max-h-72 w-full"
          : "col-span-6 max-h-32 w-full"
      }`}
    >
      {img ? (
        <Image
          src={imageSrc!}
          alt={`vehicle-image-${index + 1}`}
          fill
          className="object-cover"
          loading="eager"
          priority
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <Plus
            className={`text-rose-500 group-hover:scale-110 transition-transform ${isMain ? "w-8 h-8 mb-1" : "w-6 h-6 text-rose-300"}`}
          />
          {isMain && (
            <span className="text-xs font-bold text-slate-700">Main Photo</span>
          )}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
};

export default ImageUploadSlot;
