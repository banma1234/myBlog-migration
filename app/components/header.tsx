import Link from "next/link";
import Image from "next/image";
import iconHandler from "util/iconHandler";
import UserProfile from "./clientside/userProfile";
import { Tooltip } from ".";
import "../styles/headerStyle.scss";

export default async function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" href="/">
          <div className="header__logo__img">
            <Image src="/favicon.ico" alt="logo Img" width={22} height={22} />
          </div>
          <span className="header__logo__title">초코햄의 개발 블로그</span>
        </Link>
        <ul>
          <li>
            <Tooltip title={"포스트 검색"}>
              <Link href="/search">{iconHandler("search", "20")}</Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip title={"프로젝트"}>
              <Link href="https://github.com/banma1234">
                {iconHandler("launch", "20")}
              </Link>
            </Tooltip>
          </li>
          <li>
            <UserProfile />
          </li>
        </ul>
      </div>
    </header>
  );
}
