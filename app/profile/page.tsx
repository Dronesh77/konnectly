"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { Camera } from 'lucide-react';
import { useRouter } from "next/navigation";

const initialProfile = {
  address: "",
  education: "",
  about: "",
  shop: {
    name: "",
    description: "",
    location: "",
    verified: "false",
  },
  posts: [],
  backgroundPhoto: "/profile-bg.jpg",
  phone: "",
};

function BackgroundImageCard({ imageUrl, onImageChange, user, uploading, setUploading }: {
  imageUrl: string | undefined;
  onImageChange: (url: string) => void;
  user: any;
  uploading: boolean;
  setUploading: (v: boolean) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackgroundChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user) return;
    const file = e.target.files[0];
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      console.log('Uploading image, got URL:', data.url);
      onImageChange(data.url);
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <div
        className="w-full max-w-2xl h-48 rounded-b-lg shadow border bg-gray-200 overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: imageUrl ? undefined : '#e5e7eb',
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '12rem',
        }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleBackgroundChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow hover:bg-opacity-100 transition"
          aria-label="Upload background image"
        >
          <Camera className="w-7 h-7 text-blue-700" />
        </button>
      </div>
    </div>
  );
}

export default function ProfileRedirect() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.replace(`/profile/${user.id}`);
    }
  }, [user, isLoaded, router]);

  return null;
} 