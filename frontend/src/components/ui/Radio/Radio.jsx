import styles from "./Radio.module.css";

const Radio = ({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      <span className={styles.custom}></span>

      <span className={styles.label}>
        {label}
      </span>
    </label>
  );
};

export default Radio;