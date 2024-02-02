const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part}: {exercise}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item, index) => (
        <div key={index}>
          <Part part={item.part} exercise={item.exercises} />
        </div>
      ))}
    </div>
  );
};

const Total = ({ total }) => {
  return (
    <div>
      <p>Number of exercises: {total}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10 },
      { part: "Using props to pass data", exercises: 7 },
      { part: "State of a component", exercises: 14 },
    ],
  };

  const totalExercises = course.parts.reduce(
    (accumulator, currentValue = {}) => accumulator + currentValue.exercises,
    0
  );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
