# 🚀 Features

## SSG & SSR

정적 배포인 `SSG`와 서버사이드 랜더링 `SSR`을 적재적소에 활용하여 최대한 사용자 경험을 향상하고자 노력했습니다.

<br/>

## SEO

검색엔진에서의 노출을 최대화 하기 위해 다음과 같은 파일을 서치콘솔에 제출하였습니다.

- manifest.json
- robots.txt
- sitemap.xml
- RSS_feed.xml

`manifest`와 `robots`는 정적파일로, `sitemap`은 `SSR`을 적용해 매 요청마다 신선한 데이터를 제공할 수 있도록 하였습니다. 이는 빌드 이후에 작성된 포스트 또한 sitemap에 추가시키기 위한 조치였습니다.

`RSS feed`의 경우 `feed` 라이브러리를 이용해 런타임 빌드시 정적 파일을 생성하도록 구현하였습니다.

<br/>

포스트를 정적으로 생성하기 때문에 각 포스트에 해당되는 meta태그 또한 런타임 빌드시 정적으로 생성하도록 구현하였습니다. meta데이터를 DB로부터 전달받아 각 포스트에 매핑합니다.

<br/>

## authentication & middleware

<br/>

## markdown to html (with styling)

<br/>

## search logic

<br/>

## comment-reply logic

<br/>

## api routes

<br/>

## deploy service

<br/>
