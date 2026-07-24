"use client";

import { Plus, Trash2, RefreshCw } from "lucide-react";
import Image from "next/image";

interface ImageUploadSlotProps {
  img: File | string | null;
  index: number;
  onChange: (file: File | null) => void;
}

const ImageUploadSlot = ({ img, index, onChange }: ImageUploadSlotProps) => {
  const isMain = index === 0;

  const preview = img instanceof File ? URL.createObjectURL(img) : img;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(null);
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile) {
      onChange(selectedFile);
    }

    e.target.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div
      className={`relative aspect-square border-2 border-dashed border-rose-200 hover:border-rose-500 rounded-xl flex flex-col items-center justify-center overflow-hidden group transition-all ${
        isMain
          ? "col-span-12 aspect-video max-h-72 w-full"
          : "col-span-6 max-h-32 w-full"
      }`}
    >
      {preview ? (
        <>
          <Image
            src={preview}
            alt={`vehicle-image-${index + 1}`}
            fill
            className="object-cover"
            priority={isMain}
            unoptimized={img instanceof File}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10">
            {/* Image replace button*/}
            <label className="p-2 bg-white/90 hover:bg-white text-slate-800 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-md">
              <RefreshCw className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Delete image button*/}
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-rose-500/90 hover:bg-rose-600 text-white rounded-full transition-transform hover:scale-110 shadow-md"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50/40 transition-all p-4 text-center">
          <Plus
            className={`text-rose-500 group-hover:scale-110 transition-transform ${
              isMain ? "w-8 h-8 mb-1" : "w-6 h-6 text-rose-300"
            }`}
          />
          {isMain && (
            <span className="text-xs font-bold text-slate-700">Main Photo</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploadSlot;
