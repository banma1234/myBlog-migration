import Link from "next/link";
import "../styles/headerStyle.scss";
import { ThemeIcon } from "./clientside/header_themeIcon";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_logo">
          <Link href="/">Home</Link>
        </div>
        <ul>
          <li>
            <Link href="https://github.com/banma1234">About</Link>
          </li>
          <li>
            <Link href="/">Login</Link>
          </li>
          <ThemeIcon />
        </ul>
      </div>
    </header>
  );
};

export default Header;
