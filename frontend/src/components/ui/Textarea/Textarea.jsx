import styles from "./Textarea.module.css";

const Textarea = ({
  label,
  name,
  value,
  placeholder = "",
  rows = 5,
  onChange,
  error = "",
}) => {
  return (
    <div className={styles.field}>
      {label && (
        <label
          htmlFor={name}
          className={styles.label}
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${styles.textarea} ${
          error
            ? styles.errorInput
            : ""
        }`}
      />

      {error && (
        <small className={styles.error}>
          {error}
        </small>
      )}
    </div>
  );
};

export default Textarea;