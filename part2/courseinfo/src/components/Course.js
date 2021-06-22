import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((a,v) =>  a = a + v.exercises , 0 )
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = ({ name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
          {parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
      </div>
    )
  }

  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course