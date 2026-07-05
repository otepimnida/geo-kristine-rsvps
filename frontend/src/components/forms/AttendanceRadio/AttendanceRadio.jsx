import { Radio } from "../../ui";

const AttendanceRadio = ({
  value,
  onChange,
}) => {
  return (
    <>
      <Radio
        name="attendance"
        label="Joyfully Accepts"
        value="true"
        checked={value === true}
        onChange={onChange}
      />

      <Radio
        name="attendance"
        label="Regretfully Declines"
        value="false"
        checked={value === false}
        onChange={onChange}
      />
    </>
  );
};

export default AttendanceRadio;