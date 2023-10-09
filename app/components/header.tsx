import Link from "next/link";
import Image from "next/image";
import iconHandler from "util/iconHandler";
import "../styles/headerStyle.scss";

const Header: React.FC = () => {
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
          <div className="header_icon">
            <Link href="/search" title="포스트 검색">
              {iconHandler("search", "20")}
            </Link>
          </div>
          <li>
            <Link href="https://github.com/banma1234">About</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
