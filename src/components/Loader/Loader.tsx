import { css } from "@emotion/react";
import classNames from "classnames";
import { FC, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Loader.module.scss";

type LoaderProps = {
  loading: boolean;
};

export const Loader: FC<LoaderProps> = ({ loading }) => {
  const [color, setColor] = useState<string>("rgb(36, 238, 17)");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: rgb(36, 238, 17);
    border: 4px solid rgb(36, 238, 17);
  `;

  return (
    <div
      className={classNames(
        styles.loaderWrapper,
        loading ? styles.showLoader : styles.hideLoader
      )}
    >
      <ClipLoader color={color} loading={loading} css={override} size={150} />
      <p>Формируем отчет. Это может занять некоторое время</p>
    </div>
  );
};
