import React from 'react';

//Header
const Header2 = ({text}) => <h3>{text}</h3>

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

export default Course;