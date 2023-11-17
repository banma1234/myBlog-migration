# Project Tree

프로젝트의 폴더구조입니다.

```
├── README.md
├── auth.d.ts
├── tsconfig.json
├── middleware.ts
├── yarn.lock
├── package.json
│
├── public
│    ├── ( images... )
│    └── rss
│          └── rss.feed
│
├── styles
|
├── util
│    ├── iconHandler.tsx
│    ├── mongodb.tsx
│    ├── uploadImg.tsx
│    ├── parseDate.ts
│    └── context
│          └── authProvider.tsx
│
└── app
     ├── ( metaData... )
     ├── layout.tsx
     ├── page.tsx
     ├── api
     │     ├── posts
     │     │     ├── ( GET, POST, PUT, DELETE )
     │     │     └── route.ts
     │     │
     │     ├── comments
     │     │     ├── ( GET, POST, DELETE )
     │     │     └── route.ts
     │     │
     │     ├── auth
     │     │     └── [...nextauth]
     │     │           └── route.ts
     │     │
     │     ├── login
     │     │     └── route.ts
     │     ├── thumbnail
     │     │     └── route.ts
     │     │
     ├── components
     │     ├── index.ts
     │     ├── header.tsx
     │     ├── footer.tsx
     │     │     	.
     │     │     	.
     │     └── clientside
     │           └── userProfile.tsx
     │          		.
     │          		.
     │
     ├── auth
     │     ├── auth.ts
     │     ├── login
     │     │      └── page.tsx
     │     └── styles
     │           └── page.modules.scss
     │
     ├── admin
     │     ├── page.tsx
     │     ├── styles
     │     ├── utils
     │     │      ├── index.ts
     │     │      ├── postHandler.ts
     │     │      └── getSeriesInfo.ts
     │     └── write
     │           ├── page.tsx
     │           ├── styles
     │           ├── thumbnail
     │           │     └── page.tsx
     │           └── rewrite
     │                 └── [...postId]
     │                       └── page.tsx
     ├── posts
     │     └── [...postId]
     │           ├── components
     │           │     ├── clientside
     │           │     └── postNavigate.tsx
     │           │	     		.
     │           │	     		.
     │           ├── utils
     │           │     ├── index.ts
     │           │     └── commentHandler.ts
     │           │	     		.
     │           │	     		.
     │           ├── styles
     │           ├── layout.tsx
     │           └── page.tsx
     │
     ├── search
     │     ├── components
     │     │     └── clientside
     │     │          ├── searchBar.tsx
     │     │          └── searchBoard.tsx
     │     │
     │     ├── styles
     │     ├── getAllPosts.ts
     │     └── page.tsx
     │
     └── styles
```
