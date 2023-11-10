"use client";

import parseDate from "util/parseDate";
import styles from "app/admin/write/styles/page.module.scss";
import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { uploadImage } from "util/uploadImg";
import { useRouter } from "next/navigation";
import { postHandler } from "app/admin/utils";
import { mdParser } from "app/posts/[postId]/utils";

export default function WriteBoard(props: {
  postData: any;
  type: "NEW" | "REWRITE";
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
  const [imageTitle, setImageTitle] = useState<any[]>([]);
  const [isThumbnail, setIsThumbnail] = useState<boolean>(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const postData = props.postData;
  const TYPE = props.type;

  const initData = useCallback(
    (isClear: boolean) => {
      setTitle(isClear ? "" : postData.title);
      setContent(isClear ? "" : postData.content);
      setSeries(isClear ? "" : postData.series);
      setHashtag(isClear ? "" : postData.hashtag);
      setDescription(isClear ? "" : postData.description);
      setImages([]);
      setImageTitle([]);
      setError("");
    },
    [postData]
  );

  useEffect(() => {
    if (error.length) alert(error);
  }, [error]);

  useEffect(() => {
    if (TYPE === "REWRITE") {
      initData(false);
    }
  }, [TYPE, initData]);

  const handleImgUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const { images, imageTitle } = await uploadImage(e.target.files);
        setImages(images);
        setImageTitle(imageTitle);
      }
    },
    []
  );

  const handlePost = async (e: any) => {
    e.preventDefault();
    if (!title || !content) return setError("제목 / 내용을 입력해주세요");

    let post = {
      title,
      content,
      series,
      uploadDate: parseDate(new Date()),
      hashtag,
      description,
      images,
      imageTitle,
      isThumbnail,
    };

    const { data, success } = await postHandler(
      TYPE === "NEW"
        ? JSON.stringify(post)
        : JSON.stringify(Object.assign(post, { postid: postData.postId })),
      TYPE === "NEW" ? "POST" : "PUT"
    );

    if (success) {
      initData(true);
      alert("게시글 작성이 완료되었습니다.");
      router.push("/admin");
    } else {
      console.log(data);
      alert(data);
      return setError(data);
    }
  };

  return (
    <div className={styles.write}>
      <h1>edit post</h1>
      <div className={styles.label}>
        <input
          className={styles.title}
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input_small"
          placeholder="시리즈"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
        />
        <input
          className="write_image"
          type="file"
          onChange={handleImgUpload}
          multiple
        />
        <div>
          <span>자체 썸네일 사용</span>
          <input
            type="checkbox"
            checked={isThumbnail}
            onChange={(e: any) => setIsThumbnail(!isThumbnail)}
          />
        </div>
      </div>
      <div className={styles.content}>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div
          className={styles.preview}
          dangerouslySetInnerHTML={mdParser(content)}
        />
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="스페이스바로 태그를 구분해주세요"
        value={hashtag}
        onChange={(e) => setHashtag(e.target.value)}
      />
      <button onClick={handlePost}>Submit</button>
    </div>
  );
}
