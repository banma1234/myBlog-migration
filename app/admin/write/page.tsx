"use client";

import parseDate from "util/parseDate";
import styles from "./styles/page.module.scss";
import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { uploadImage } from "util/uploadImg";
import { mdParser } from "app/posts/[postId]/utils";

export default function Write() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
  const [imageTitle, setImageTitle] = useState<any[]>([]);
  const [isThumbnail, setIsThumbnail] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const handleImgUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const { images, imageTitle } = await uploadImage(e.target.files);
        setImages(images);
        setImageTitle(imageTitle);
      }
    },
    [],
  );

  const initData = () => {
    setTitle("");
    setContent("");
    setSeries("");
    setImages([]);
    setImageTitle([]);
    setError("");
  };

  const handlePost = async (e: any) => {
    e.preventDefault();
    if (!title || !content) return setError("제목 / 내용을 입력해주세요");

    const post = {
      title,
      content,
      series,
      uploadDate: parseDate(new Date()),
      hashtag,
      images,
      imageTitle,
      isThumbnail,
    };

    const res = await fetch("api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const { data, success } = await res.json();

    if (success) {
      initData();
      alert("게시글 작성이 완료되었습니다.");
    } else {
      console.log(data);
      return setError(data);
    }
  };

  return (
    <div className={styles.write}>
      <h1>hi</h1>
      <div className={styles.label}>
        <input
          className={styles.title}
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="input_small"
          placeholder="시리즈"
          value={series}
          onChange={e => setSeries(e.target.value)}
        />
        <input
          className="write_image"
          type="file"
          onChange={handleImgUpload}
          multiple
        />
      </div>
      <div className={styles.content}>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div dangerouslySetInnerHTML={mdParser(content)} />
      </div>
      <input
        className={styles.input}
        placeholder="스페이스바로 태그를 구분해주세요"
        value={hashtag}
        onChange={e => setHashtag(e.target.value)}
      />
      <button onClick={handlePost}>Submit</button>
    </div>
  );
}
