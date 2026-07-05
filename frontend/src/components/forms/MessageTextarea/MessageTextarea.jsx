import { Textarea } from "../../ui";

const MessageTextarea = ({
  value,
  onChange,
  error,
}) => {
  return (
    <Textarea
      label="Message for the Couple"
      name="message"
      value={value}
      onChange={onChange}
      placeholder="Write your heartfelt wishes..."
      error={error}
    />
  );
};

export default MessageTextarea;