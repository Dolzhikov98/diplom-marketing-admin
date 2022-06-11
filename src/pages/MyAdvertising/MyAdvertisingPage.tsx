import { Card } from "primereact/card";
import { MY_ADVERTISING } from "constants/advertising-mock";
import styles from "./MyAdvertisingPage.module.scss";

const MyAdvertisingPage = () => {
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
      <span className={styles.headerText}>Мои публикации</span>
      <div className={styles.advertisingListWrapper}>
        {MY_ADVERTISING.map((item) => (
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

export default MyAdvertisingPage;
