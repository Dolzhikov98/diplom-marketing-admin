import { Card } from "primereact/card";
import { ADVERTISING } from "constants/advertising-mock";
import styles from "./MainPage.module.scss";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const header = (
    <img
      alt="Card"
      src="images/usercard.png"
      onError={(e) =>
        //@ts-ignore
        (e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
    />
  );

  return (
    <div className={styles.mainWraper}>
      <div className={styles.header}>
        <span className={styles.headerText}>Последние публикации</span>
        <Button
          label="Разместить рекламу"
          className="p-button-info"
          onClick={() => navigate("new-advertising")}
        />
      </div>
      <div className={styles.advertisingListWrapper}>
        {ADVERTISING.map((item) => (
          <Card
            title={item.title}
            subTitle={item.subtitle}
            style={{ width: "20em" }}
            header={header}
            className={styles.cardWrapper}
          >
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
