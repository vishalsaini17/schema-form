import { Outlet } from "react-router-dom";

import styles from "./appAccessLayout.module.scss";

const AppAccessLayout = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.blurBackground} />
      <div className={styles.logBox}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppAccessLayout;