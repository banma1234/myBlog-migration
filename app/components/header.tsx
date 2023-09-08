import Link from "next/link";
import iconHandler from "util/iconHandler";
import "../styles/headerStyle.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_logo">
          <Link href="/">Home</Link>
        </div>
        <ul>
          <div className="header_icon">
            <Link href="/search">{iconHandler("search", "20")}</Link>
          </div>
          <li>
            <Link href="https://github.com/banma1234">About</Link>
          </li>
          <li>
            <Link href="/">Login</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
