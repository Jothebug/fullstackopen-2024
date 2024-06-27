import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  if (!notification) return null;
  return <div style={style}>you voted '{notification}'</div>;
};

export default Notification;
