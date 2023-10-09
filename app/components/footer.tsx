import Image from "next/image";
import Link from "next/link";
import imgUrl from "public/profile_2.png";
import "../styles/footerStyle.scss";
import iconHandler from "util/iconHandler";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Image className="footer_profile" src={imgUrl} alt="profile" />
      <h2>Choco Ham</h2>
      <p>프론트앤드 디발자, 웹 개자이너 초코햄입니다.</p>
      <div className="footer_layout">
        <li title="github">
          <Link href="https://github.com/banma1234">
            {iconHandler("github", "20")}
          </Link>
        </li>
        <li title="banma1234@gmail.com">
          <Link href="mailto:banma1234@gmail.com">
            {iconHandler("mail", "20")}
          </Link>
        </li>
        <li title="X-twitter">
          <Link href="https://twitter.com/chocoham47">
            {iconHandler("twitter", "20")}
          </Link>
        </li>
        <li title="linked in">
          <Link href="https://www.linkedin.com/in/%EB%B2%94%EC%88%98-%EB%B0%95-abb51b260/">
            {iconHandler("linked_in", "20")}
          </Link>
        </li>
        <li title="RSS xml">
          <Link href="/rss.xml">{iconHandler("rss", "20")}</Link>
        </li>
      </div>
      <p>
        {iconHandler("copyright", "12")}&nbsp;&nbsp;Copyright. all rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
