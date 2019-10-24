import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const getRandomNumber = () => {
    let rnd = Math.floor((Math.random() * 6));
    return (
        rnd
    )
}


const Button = (props) => {
    return(
        <button onClick={props.handler}>
            {props.text}
        </button>
    )
}

const Anecdote = (props) => {
    return(
        <div>
            {props.anecdotes[props.selected]}
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(getRandomNumber())
    const [votes, setVotes] = useState(Array(6).fill(0));
    const [highest, setHighest] = useState(0);

    const applyNewVote = () => {
        const newVotes = {...votes};
        newVotes[selected] += 1;
        
        //update highest voted. Would have put this elsewhere but giving arrays as props gave me a headache
        let voteAmount = 0;
        let mostVotesIndex = 0;
        for(let key in newVotes){
            if(newVotes[key]>voteAmount){
                voteAmount = newVotes[key];
                mostVotesIndex = key;
            }
        }
        setHighest(mostVotesIndex);
        return(
            newVotes
        )
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
            <p>has {votes[selected]} votes</p>
            <Button handler={() => setVotes(applyNewVote())} text={'vote'} />
            <Button handler={() => setSelected(getRandomNumber())} text={'next anecdote'} />
            <h2><br/>Anecdote with most votes</h2>
            <Anecdote anecdotes={anecdotes} selected={highest} />
            <p>has {votes[highest]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)