const Course = (props) => {

  const Header = ({name}) => (
    <h1>{name}</h1>
  )

  const Content  = ({parts}) => {

    const Part = ({part}) => (
      <p> {part.name} {part.exercises}</p>
    )
    const courses = parts.map(part => <Part key={part.id} part={part}/>)
    return (
      <div>
        {courses}
      </div>
    )
  }

  const Total = ({parts}) => {
    const exercises = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
    <p><b>Number of exercises {exercises}</b></p>
    )
  }

  const RenderCourse = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  return (
    <div>
      {props.courses.map(course => <RenderCourse key = {course.id} course = {course}/>)}
    </div>
    )
}

export default Course