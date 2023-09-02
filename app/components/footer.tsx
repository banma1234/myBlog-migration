import Image from "next/image";
import Link from "next/link";
import imgUrl from "public/profile.jpg";
import "../styles/footerStyle.scss";
import iconHandler from "util/iconHandler";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Image className="footer_profile" src={imgUrl} alt="profile img" />
      <ul>
        <h1>Choco Ham</h1>
        <li>{iconHandler("mail", "16")} &nbsp; banma1234@gmail.com</li>
        <li>
          <Link href="https://github.com/banma1234">
            {iconHandler("github", "16")} &nbsp; github.com/banma1234
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
