# 🌲 Project structure

프로젝트의 폴더구조입니다.

```
📦 myblog-migration
│
├── 📄 README.md
├── 📄 LICENSE
├── auth.d.ts
├── middleware.ts
├── 📄 tsconfig.json
├── 📄 yarn.lock
├── 📄 package.json
│
├── 📂 docs
│    ├── 📄 features.md
│    ├── 📄 projectTree.md
│    └── 📄 README.md
│
├── 📂 public
│    ├── 🎨 ( images... )
│    │
│    └── 📂 rss
│          ├── 📄 feed.xml
│          └── 📄 rss.json
│
├── 📂 styles
│     ├── globals.scss
│     └── theme.scss
│          	.
│          	.
|
├── 📂 util
│    ├── iconHandler.tsx
│    ├── mongodb.tsx
│    ├── uploadImg.tsx
│    ├── parseDate.ts
│    │
│    ├── 📂 context
│    │    └── authProvider.tsx
│    │
│    └── 📂 hooks
│         └── useIntersectionObserver.tsx
│
└── 📂app
     ├── ⭐ page.tsx
     ├── layout.tsx
     ├── not-found.tsx
     ├── global-error.tsx
     ├── ( ...metaData )
     │
     ├── 📂 styles
     ├── 📂 api
     │    ├── 📂 posts
     │    │    └── 📂 [...postId]
     │    │         └── ⭐ route.ts
     │    │
     │    ├── 📂 comments
     │    │    ├── ⭐ route.ts
     │    │    └── 📂 ( GET, POST, DELETE )
     │    │         └── ( getComment, deleteComment, addComment ).ts
     │    │
     │    ├── 📂 dashboard
     │    │    ├── ⭐ route.ts
     │    │    └── 📂 GET
     │    │         ├── viewAll.ts
     │    │         └── viewSeries.ts
     │    │                   .
     │    │                   .
     │    │
     │    ├── 📂 auth
     │    │    └── 📂 [...nextauth]
     │    │         └── ⭐ route.ts
     │    │
     │    ├── 📂 login
     │    │    └── ⭐ route.ts
     │    │
     │    ├── 📂 seo
     │    │    ├── 📂 meta-tag
     │    │    │    └── ⭐ route.ts
     │    │    │
     │    │    └── 📂 static-params
     │    │         └── ⭐ route.ts
     │    │
     │    └── 📂 thumbnail
     │         └── ⭐ route.ts
     │
     ├── 📂components
     │     ├── ⭐ index.ts
     │     ├── header.tsx
     │     ├── footer.tsx
     │     │     	.
     │     │     	.
     │     │
     │     └── 📂 clientside
     │          ├── toastMessage.tsx
     │          └── userProfile.tsx
     │          		.
     │          		.
     │
     ├── 📂 auth
     │     ├── auth.ts
     │     │
     │     ├── 📂 login
     │     │    └── ⭐ page.tsx
     │     │
     │     └── 📂 styles
     │          └── page.modules.scss
     │
     ├── 📂 admin
     │     ├── ⭐ page.tsx
     │     │
     │     ├── 📂 styles
     │     ├── 📂 utils
     │     │    ├── ⭐ index.ts
     │     │    ├── postHandler.ts
     │     │    └── getSeriesInfo.ts
     │     │
     │     └── 📂 write
     │          ├── ⭐ page.tsx
     │          │
     │          ├── 📂 styles
     │          ├── 📂 thumbnail
     │          │    └── ⭐ page.tsx
     │          │
     │          └── 📂 rewrite
     │               └── 📂 [...postId]
     │                    └── ⭐ page.tsx
     │
     ├── 📂 posts
     │    └── 📂 [...postId]
     │         ├── ⭐ page.tsx
     │         ├── layout.tsx
     │         ├── error.tsx
     │         │
     │         ├── 📂 styles
     │         ├── 📂 components
     │         │    ├── postNavigate.tsx
     │         │    ├── hashTag.tsx
     │         │    ├── componentType.ts
     │         │    │
     │         │    └── 📂 clientside
     │         │         ├── ⭐ index.ts
     │         │         ├── TOC.tsx
     │         │         └── userCommentForm.tsx
     │         │                   .
     │         │                   .
     │         │
     │         ├── 📂 utils
     │         │    ├── ⭐ index.ts
     │         │    ├── mdParser.ts
     │         │    └── commentHandler.ts
     │         │	     		.
     │         │	     		.
     │
     └── 📂 search
          ├── ⭐ page.tsx
          ├── getAllPosts.ts
          ├── 📂 styles
          └── 📂 components
               └── 📂 clientside
                    ├── searchBar.tsx
                    └── searchBoard.tsx
```
