import "../styles/navBarStyle.scss";

const NavBar: React.FC = () => {
  return (
    <div className="navBar">
      <div className="navBar_title">
        <h2>시리즈 목록</h2>
      </div>
      <div className="navBar_item">
        <h3>[ 전체보기 ]</h3>
        <h3>1</h3>
        <h3>2</h3>
        <h3>3</h3>
      </div>
    </div>
  );
};

export default NavBar;
