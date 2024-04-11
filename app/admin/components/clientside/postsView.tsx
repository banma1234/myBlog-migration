"use client";

import Link from "next/link";
import { postHandler } from "app/admin/utils";
import { useState, useEffect, ChangeEvent } from "react";
import { CardType } from "app/components/componentType";
import styles from "app/admin/styles/page.module.scss";

export default function PostsView(props: { posts: any }) {
  const [posts, setPosts] = useState<Array<CardType>>(props.posts);
  const [sortOption, setSortOption] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkedPosts, setCheckedPosts] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const sortPosts = () => {
    setSortOption(!sortOption);

    sortOption
      ? setPosts(posts.sort((a, b) => b.postId - a.postId))
      : setPosts(posts.sort((a, b) => b.postId - a.postId));
  };

  const checkboxHandler = (
    postId: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(!isChecked);
    checkedPostsHandler(e.target.checked, postId);
  };

  const checkedPostsHandler = (isChecked: boolean, postId: number) => {
    if (isChecked) {
      setCheckedPosts((prev) => [...prev, postId]);
      return;
    }
    if (!isChecked && checkedPosts.includes(postId)) {
      setCheckedPosts(checkedPosts.filter((item) => item !== postId));
      return;
    }

    return;
  };

  const deletePosts = async () => {
    if (!checkedPosts.length) return setError("삭제할 포스트를 선택해주세요");

    const body = { target: checkedPosts.join(",") };
    const { data, success } = await postHandler(body, "DELETE");

    if (success) {
      alert("게시글 삭제가 완료되었습니다.");
    } else {
      console.log(data);
      return setError(data);
    }
  };

  return (
    <>
      <button onClick={sortPosts}>
        정렬 : {sortOption ? "오름차순" : "내림차순"}
      </button>
      <button onClick={deletePosts}>대상 삭제</button>
      <table className={styles.table}>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>id</th>
          <th>시리즈</th>
          <th>제목</th>
          <th>댓글</th>
          <th>작성일자</th>
        </tr>
        {posts.map((post: any, i: number) => {
          const url = `/admin/write/rewrite/${post.postId}`;
          return (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => checkboxHandler(post.postId, e)}
                />
              </td>
              <td>{post.postId}</td>
              <td>{post.series}</td>
              <td>
                <Link href={url}>{post.title}</Link>
              </td>
              <td>
                {"("}temp{")"}
              </td>
              <td>{post.uploadDate}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
