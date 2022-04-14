
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

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}
export default Course;