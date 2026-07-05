import { Button } from "../../ui";

import styles from "./GuestCounter.module.css";

const GuestCounter = ({
  value,
  increment,
  decrement,
}) => {
  return (
    <div className={styles.counter}>

      <Button
        variant="outline"
        size="small"
        onClick={decrement}
      >
        −
      </Button>

      <span className={styles.value}>
        {value}
      </span>

      <Button
        variant="outline"
        size="small"
        onClick={increment}
      >
        +
      </Button>

    </div>
  );
};

export default GuestCounter;