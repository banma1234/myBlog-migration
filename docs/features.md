# 🚀 Features

## SSG & SSR

정적 배포인 `SSG`와 서버사이드 랜더링 `SSR`을 적재적소에 활용하여 최대한 사용자 경험을 향상하고자 노력했습니다.

관리자 페이지에서의 데이터 요청과 같이 신선한 데이터가 필요한 상황에서는 컴포넌트 단위로 SSR을 적용하였습니다. SSR이 적용된 컴포넌트는 다음과 같습니다.

- 빌드 이후에 작성된 포스트
- 관리자 페이지에서의 데이터 fetching
- sitemap.xml

블로그 포스트는 기본적으로 정적배포(SSG)이나 빌드 이후에 작성한 포스트의 경우 SSR로 페이지를 생성토록 하였습니다.

메인페이지와 검색페이지에서의 데이터 fetching에 `revalidate`를 주어 기존의 캐시 데이터와 차이가 있을 경우 신선한 데이터를 불러오도록 하였습니다.

댓글의 경우 `CSR`을 적용하였 습니다. 페이지의 최하단에 위치하기 때문에 렌더링 딜레이가 의미 없다고 판단, input에 포커스를 두거나 새로고침 없이 댓글을 작성/삭제를 수행하는 등 client-side에서 동작하는 `React`의 기능을 활용하여 사용자 경험을 향상하였습니다.

<br/>

## SEO

검색엔진에서의 노출을 최대화 하기 위해 다음과 같은 파일을 서치콘솔에 제출하였습니다.

- manifest.json
- robots.txt
- sitemap.xml
- RSS_feed.xml & RSS_feed.json

`sitemap`은 next.js 내장 메소드를 활용한 동적 페이지(파일)로 제출하였습니다. 이는 빌드 이후에 작성된 포스트 또한 sitemap에 추가시키기 위한 조치였습니다.

`manifest`,`robots` 및 `RSS feed`의 경우 런타임 빌드시 정적 파일을 생성하도록 구현하였습니다. RSS의 경우 `xml` 및 `json` 형태의 파일을 모두 지원합니다.

각 포스트의 정보를 담은 meta태그 또한 런타임 빌드시 정적으로 생성합니다. 빌드시 meta데이터를 DB로부터 전달받아 각 포스트 페이지에 매핑합니다.

<br/>

## backend

next.js의 `serverless function` 에 기반한 백앤드 환경을 구성하였습니다.

response의 각 status code별로 예외처리를 구분하였습니다.

DB는 `mongoDB`를 활용하였습니다. json 친화적이며 비관계형 DB 특성상 포스트, 댓글 데이터 필드의 유동적인 작성/변환이 가능하기 때문입니다.

<br/>

## authentication & middleware

`next-auth` 라이브러리를 이용해 로그인을 구현하였습니다. https only 쿠키와 jwt 토큰을 활용해 세션 정보를 보호하고 로그인 유지 기능을 구현하였습니다.

암호화되어 DB에 저장된 비밀번호와 입력받은 비밀번호를 비교하여 로그인을 수행합니다. 암호화 알고리즘으로는 `bcrypt`를 채택하였습니다.

`middleware`를 두어 비로그인 유저의 관리자 페이지\(admin/\*\*\)에 대한 접근 및 관련 api 요청을 차단하였습니다.

유저명, 프로필 이미지 등 공개 가능한 인증정보를 클라이언트 단에서 접근할 수 있도록 `context provider`를 두었습니다.

생성된 session_id는 1주일간 유지되며 http only 쿠키에 저장되며 브라우저는 1일마다 새로운 session정보의 업데이트를 요청합니다. 로그아웃시 관련된 모든 세션정보는 파기됩니다.

<br/>

## admin page

관리자 페이지를 구현하여 블로그의 중요한 데이터들을 블로그 페이지 내에서 손쉽게 제어할 수 있도록 하였습니다.

포스트의 작성, 삭제, 수정 및 신규 시리즈와 썸네일 이미지 등록 등 블로그 내에서 CRUD 작업을 수행할 수 있게끔 하였습니다.

비로그인 유저(일반유저)의 경우 admin 페이지 및 관련 api 요청이 제한됩니다.

<br/>

## markdown to html (with styling)

`marked` 라이브러리를 이용해 마크다운 파일의 인코딩 및 디코딩 기능을 구현하였습니다. 마크다운 파일을 안전한 html 소스로 인코딩한 후 해당 내용을 DOM 트리에 직접 삽입합니다.

`github` 스타일을 기준으로 직접 스타일링한 컴포넌트를 사용하였습니다. 클립보드 복사 버튼과 같은 편의기능 또한 추가하였습니다.

markdown에서의 이미지 출력의 경우 별도의 CDN 서버를 도입하여 해당 CDN 서버에서 이미지를 불러오게끔 하였습니다. 자세한 내용은 [해당 링크](https://chocoham.dev/posts/28)를 참고해주시면 감사하겠습니다.

<br/>

## search posts

서버 컴포넌트에서 전체 데이터를 불러와 클라이언트 컴포넌트에서 검색 및 필터링, 페이지네이션을 수행할 수 있도록 구성하였습니다.

검색을 위해 키워드를 타이핑할 때 클라이언트에서의 끊김없이 실시간으로 해당 키워드와 관련있는 결과화면을 출력하도록 하였습니다.

포스트의 개수가 많지 않기 때문에(작성일 기준 포스트는 총 31개 입니다) 무한 스크롤 방식과 같이 화면 단위로 혹은 페이지네이션 페이지 단위로 데이터를 끊어서 불러오지 않고 모든 데이터를 한번에 불러오도록 하였습니다. 이는 모든 데이터를 불러오는데 많은 자원이 소모되지 않으며 별도의 변경사항이 없을 경우 빌드타임에서 생성된 캐시 데이터를 전달하기 때문입니다.

하지만 포스트의 개수가 늘어나고 캐시 데이터를 사용함에도 응답 시간이 늦어진다면 현재의 방식이 아닌 무한 스크롤 방식을 도입할 예정입니다.

<br/>

## comment-reply logic

`계층형 트리`구조를 활용해 댓글-대댓글 로직을 구현하였습니다. 자세한 내용은 [해당 링크](https://chocoham.dev/posts/31)를 참고해주시면 감사하겠습니다.
