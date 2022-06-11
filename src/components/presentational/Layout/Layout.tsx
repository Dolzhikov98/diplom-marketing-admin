import React from "react";
import Navbar from "../../Navbar/Navbar";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className={styles.SecondSection}>
        <div className={styles.sidebar}>
        </div>
        <div className={styles.MainSection}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
