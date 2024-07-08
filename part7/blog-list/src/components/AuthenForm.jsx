import { useField } from "../hooks";

const AuthenForm = () => {
  const username = useField("username");
  const password = useField("password");

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      const params = { username: username.value, password: password.value };
    } catch (error) {}
  };

  return (
    <form onSubmit={onLogin}>
      <input {...username} />
      <input {...password} />
      <button type="submit">login</button>
    </form>
  );
};

export default AuthenForm;
