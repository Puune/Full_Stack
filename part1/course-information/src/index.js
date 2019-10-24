import React from 'react';
import ReactDOM from 'react-dom';

const Part = (props) => {

    return (
        <div>
            <p>{props.name}  {props.exercises}</p>
        </div>
    )
}

const Header = (props) => {

    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {

    return (
        <div>
            <Part name={props.list[0].name} exercises={props.list[0].exercises} />
            <Part name={props.list[1].name} exercises={props.list[1].exercises}/>
            <Part name={props.list[2].name} exercises={props.list[2].exercises}/>
        </div>
    )
}

const Total = (props) => {

    return (
        <div>
            <p>Number of exercises {props.list[0].exercises + props.list[1].exercises + props.list[2].exercises}</p>
        </div>
    )
}

const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
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
    }

    return (
        <div>
            <Header course={course.name} />
            <Content  list={course.parts} />
            <Total list={course.parts} />

        </div>    
    )
}

ReactDOM.render(<App />, document.getElementById('root'))