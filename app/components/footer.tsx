import Image from "next/image";
import Link from "next/link";
import imgUrl from "public/profile.jpg";
import "../styles/footerStyle.scss";
import { useIcons } from "util/hooks";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Image className="footer_profile" src={imgUrl} alt="profile img" />
      <ul>
        <h1>Choco Ham</h1>
        <li>{useIcons("mail", "16")} &nbsp; banma1234@gmail.com</li>
        <li>
          <Link href="https://github.com/banma1234">
            {useIcons("github", "16")} &nbsp; github.com/banma1234
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
