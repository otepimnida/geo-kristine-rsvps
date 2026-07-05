import styles from "./PageTitle.module.css";

const PageTitle = ({
  title,
  subtitle = "",
  center = true,
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        center ? styles.center : ""
      }`}
    >
      <h2 className={styles.title}>
        {title}
      </h2>

      {subtitle && (
        <p className={styles.subtitle}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;