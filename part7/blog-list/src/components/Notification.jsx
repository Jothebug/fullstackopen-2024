import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { message, type } = notification;

  // const style = {
  //   border: "solid",
  //   padding: 10,
  //   borderWidth: 1,
  //   marginBottom: 20,
  // };

  if (!message) return null;

  return <div className={type}>{message}</div>;
};

export default Notification;
