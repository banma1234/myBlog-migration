import Link from "next/link";
import Image from "next/image";
import iconHandler from "util/iconHandler";
import UserProfile from "./clientside/userProfile";
import "../styles/headerStyle.scss";

export default async function Header() {
  return (
    <header className="header">
      <div className="header_container">
        <Link className="header_logo" href="/">
          <div className="header_logo_img">
            <Image src="/favicon.ico" alt="logo Img" width={22} height={22} />
          </div>
          <span>초코햄의 개발 블로그</span>
        </Link>
        <ul>
          <li>
            <Link href="/search" title="포스트 검색">
              {iconHandler("search", "20")}
            </Link>
          </li>
          <li>
            <Link href="https://github.com/banma1234" title="프로젝트">
              {iconHandler("launch", "20")}
            </Link>
          </li>
          <li>
            <UserProfile />
          </li>
        </ul>
      </div>
    </header>
  );
}
