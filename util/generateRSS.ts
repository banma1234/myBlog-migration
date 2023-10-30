// import fs from "fs";
// import { Feed } from "feed";

// export default async function generateRssFeed() {
//   const { data } = await getMetaData();
//   const url = process.env.DEV_URL as string;
//   const date = new Date();
//   const author = {
//     name: "ChocoHam(@banma1234)",
//     email: "banma1234@gmail.com",
//     link: "https://github.com/banma1234",
//   };

//   const feed = new Feed({
//     title: "ChocoHam 개발 블로그",
//     description:
//       "프론트앤드 개발자 ChocoHam(@banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.",
//     id: url,
//     link: url,
//     image: `${url}/banner.png`,
//     favicon: `${url}/favicon.ico`,
//     copyright: `All rights reserved ${date.getFullYear()}`,
//     updated: date,
//     generator: "chocoham.dev",
//     feedLinks: {
//       rss2: `${url}/rss/feed.xml`, // xml format
//       json: `${url}/rss/feed.json`, // json fromat
//     },
//     author,
//   });

//   console.log(data);

//   data.map((post: any) => {
//     feed.addItem({
//       title: post.title,
//       id: url,
//       link: `${url}/posts/${post.postId}`,
//       description: post.description,
//       content: post.content,
//       author: [author],
//       contributor: [author],
//       date: post.uploadDate,
//       image: post.thumbnail,
//     });
//   });

//   fs.mkdirSync(`./public/rss`, {
//     recursive: true,
//   });
//   fs.writeFileSync(`./public/rss/feed.xml`, feed.rss2(), "utf8");
// }

// async function getMetaData() {
//   const myHeaders = new Headers();
//   myHeaders.append("viewtype", "GET_META_DATA");
//   const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
//     method: "GET",
//     headers: myHeaders,
//   });
//   const { data, success } = await res.json();

//   if (!success) {
//     throw new Error(data);
//   }

//   return data;
// }
