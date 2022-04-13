
const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => <Part key={index} part={part["name"]} exercise={part["exercises"]} />)}
    </>
  )

}
const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  )
}
const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App