import { useEffect, useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import styles from "./Dropdown.module.scss";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import { RootState } from "store";

const Dropdown = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = [
    {
      label: "Профиль",
      icon: "pi pi-user",
      command: () => navigate("/profile"),
    },
    {
      label: "Мои публикации",
      icon: "pi pi-fw pi-star-fill",
      command: () => navigate("/my-advertising"),
    },
    {
      label: "Выход",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        dispatch(logout());
        navigate("/login");
      },
    },
  ];

  const menu = useRef(null);

  useEffect(() => {
    if (!menu.current) return;
  }, []);

  const user = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <Menu model={items} popup ref={menu} />
      <Button
        icon={"pi pi-bars"}
        label={user.name}
        //@ts-ignore
        onClick={(event) => menu.current && menu.current.toggle(event)}
        className={classNames(["p-button-text", styles.DropdownButton])}
      />
    </>
  );
};

export default Dropdown;
