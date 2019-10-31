import React from 'react';
import ReactDOM from 'react-dom';
import Course from './modules/Course.js';
import './index.css';


//Header
const Header1 = ({text}) => <h1>{text}</h1>


//move to modules
/*
//Singular row for list
const Part = ({part}) => {
    return(
        <li key={part.id}>{part.name}: {part.exercises}</li>
    )
}

//Course content list
const Parts = ({parts}) => {
    return(
        <ul>
            {parts.map(part => Part(part={part}))}
        </ul>
    )
}
*/
//forEach -- Total exc
/*
const GetTotal = ({course}) => {    
    let courseTotal = 0;
    course.parts.forEach(function(part){
        courseTotal += part.exercises;
    })

    console.log(courseTotal)
    return (
        <p><b>Total exercises: {courseTotal}</b></p>
    )
}
*/
/*
//reduce -- Total exc
const GetTotal = ({course}) => {
    const courseTotal = course.parts.reduce((acc, item) => acc + item.exercises, 0);
    return(
        <p><b>Total exercises: {courseTotal}</b></p>
    )
}

//Full course
const Course = ({course}) => {
    return (
        <li key={course.id}>
            <Header2 text={'Half Stack application devel'}/>
            <Parts parts={course.parts} />
            <GetTotal course={course} />
            <br/><br/>
        </li>
    )
}
*/

//All courses
const Courses = ({courses}) => {
    return(
        <ul>
            {courses.map(course => Course(course={course}))}
        </ul>
    )
}

const App = (props) => {   
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
    return (
        <div>
            <Header1 text={'Web devel curriculum'} />
            <Courses courses={courses} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))