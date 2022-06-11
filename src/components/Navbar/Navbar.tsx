import { Menubar } from "primereact/menubar";
import styles from "./Navbar.module.scss";
import Dropdown from "../common/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const redirectOnMain = () => navigate("/");

  return (
    <Menubar
      start={
        <div onClick={redirectOnMain} style={{ cursor: "pointer" }}>
          <span className={styles.logo}>Marketing App</span>
        </div>
      }
      end={<Dropdown />}
      className={styles.Menubar}
    />
  );
};

export default Navbar;
