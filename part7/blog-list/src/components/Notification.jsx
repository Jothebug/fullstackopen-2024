import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { message, type } = notification;
  if (!message) return null;
  return <div className={type}>{message}</div>;
};

export default Notification;
