import Image from "next/image";
import Link from "next/link";

import "./styles/errorStyle.scss";

export default function NotFound() {
  return (
    <section className="error_container">
      <Image
        className="error_image"
        src="/404.svg"
        alt="404 banner"
        width={600}
        height={565}
      />
      <div>
        <Link href="/search">
          <h2>👉 포스트 검색으로 이동하세요!</h2>
        </Link>
      </div>
    </section>
  );
}
