import { useState } from "react";

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};

const Statistics = ({ feedback }) => {
  const { good, neutral, bad } = feedback || {};
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all; // good: 1, neutral: 0, bad: -1
  const positive = (good / all) * 100;

  return (
    <div>
      <Header title={"statistics"} />
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positive} />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = (type) => {
    let updatedValue = { ...feedback };
    updatedValue = {
      ...updatedValue,
      [type]: ++updatedValue[type],
    };
    setFeedback(updatedValue);
  };

  return (
    <div>
      <>
        <Header title={"give feedback"} />
        <Button onClick={() => handleFeedback("good")} label={"good"} />
        <Button onClick={() => handleFeedback("neutral")} label={"neutral"} />
        <Button onClick={() => handleFeedback("bad")} label={"bad"} />
      </>
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
