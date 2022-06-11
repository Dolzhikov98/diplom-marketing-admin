import styles from "./GeoReportPage.module.scss";

const GeoReportPage = () => {
  return (
    <div className={styles.mainWraper}>
      <div className={styles.header}>
        <span className={styles.headerText}>Отчет</span>
      </div>
      <div className={styles.advertisingListWrapper}></div>
    </div>
  );
};

export default GeoReportPage;
