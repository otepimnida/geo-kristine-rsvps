import styles from "./Input.module.css";

const Input = ({
  label,
  type = "text",
  name,
  value,
  placeholder = "",
  onChange,
  error = "",
  required = false,
  disabled = false,
}) => {
  return (
    <div className={styles.field}>
      {label && (
        <label
          htmlFor={name}
          className={styles.label}
        >
          {label}

          {required && (
            <span className={styles.required}>
              *
            </span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.input} ${
          error ? styles.errorInput : ""
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

export default Input;