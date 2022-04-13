
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </div>
  )
}

export default App