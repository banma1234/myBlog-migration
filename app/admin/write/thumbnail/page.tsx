"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { uploadImage } from "util/uploadImg";

export default function Thumbnail() {
  const [series, setSeries] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
  const [imageTitle, setImageTitle] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const handleImgUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const { images, imageTitle } = await uploadImage(e.target.files);
      setImages(images);
      setImageTitle(imageTitle);
    }
  };

  const initData = () => {
    setSeries("");
    setImages([]);
    setImageTitle([]);
  };

  const handleThumbnail = async (e: any) => {
    e.preventDefault();
    if (!images) return setError("썸네일을 등록해주세요");

    const thumbnail = {
      imageTitle,
      series,
      images,
    };

    const res = await fetch("/api/thumbnail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(thumbnail),
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    initData();
    const { message } = await res.json();

    alert(message);
  };

  return (
    <section>
      <h1>시리즈 썸네일 등록</h1>
      <input type="file" onChange={handleImgUpload} />
      <input
        className="input_small"
        placeholder="시리즈"
        value={series}
        onChange={(e) => setSeries(e.target.value)}
      />
      <button onClick={handleThumbnail}>제출</button>
    </section>
  );
}
