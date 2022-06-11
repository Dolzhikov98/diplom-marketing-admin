import { classNames } from "primereact/utils";
import React from "react";
import { Link } from "react-router-dom";
import { useMatch, useResolvedPath } from "react-router-dom";
import style from "./ActiveLink.module.scss";

const ActiveLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} className={classNames([className, match && style.ActiveLink])}>
      {children}
    </Link>
  );
};

export default ActiveLink;
