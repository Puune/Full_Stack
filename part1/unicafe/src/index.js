import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Header = () => (
    <h1>Give your feedback</h1>
)

const Statistics = (props) => {
    if(props.total != 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <table>
                    <tbody>
                        <Statistic text={'Good'} value={props.good} endLine={''} /> 
                        <Statistic text={'Neutral'} value={props.neutral} endLine={''} /> 
                        <Statistic text={'Bad'} value={props.bad} endLine={''} /> 
                        <Statistic text={'Total'} value={props.total} endLine={''} /> 
                        <Statistic text={'Average'} value={props.average} endLine={''}/> 
                        <Statistic text={'Positive'} value={props.positive} endLine={'%'} />
                    </tbody> 
                </table>
            </div>
        )
    } else {
        return(
            <div>
                <br/>
                No feedback yet
            </div>
        )
    }
}

const Statistic = ({text, value, endLine}) => {
    return (
        <tr>
            <th>{text}</th>
            <th>{value} {endLine}</th>
        </tr>
    )
}

const Button = (props) => {
    return(
        <button onClick={props.handleClick}>
            {props.description}
        </button>
    )
}   

const App = ()=> {
    //I couldn't get statistics to update without these
    let _good = 0;
    let _neutral = 0;
    let _bad = 0;

    //setup states
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);
    const [average, setAverage] = useState(0);
    const [positive, setPositive] = useState(0);

    /**Update good, neutral or bad**/
    //Well this doesn't work because value updates with delay, so statistics would be wrong
    //I don't know how to make this smartly
    /* 
    const setToValue = (value, setValue) => {
        setValue(value + 1);

        setTotal(total + 1);
        setAverage((good-bad) / total);
        setPositive(good / total);
    }
    */
    //now I have this monster
    const setToAnyValue = (value, setValue) => {
        _good = good; _neutral = neutral; _bad = bad;        
        switch(setValue) { 
            case setGood:  
                _good += 1;
                setGood(_good); 
                break;
            case setNeutral: 
                _neutral += 1;
                setNeutral(_neutral); 
                break;
            case setBad: 
                _bad += 1;
                setBad(_bad); 
                break;
            default: console.log('setToValue switch broke');
        }
        setTotal(_good + _neutral + _bad);
        setAverage((_good - _bad) / (_good + _neutral + _bad));
        setPositive(_good / (_good + _neutral + _bad));
    }

    return(
        <div>
            <Header />
            <Button handleClick={() => setToAnyValue(good, setGood)} description="Good"></Button>
            <Button handleClick={() => setToAnyValue(neutral, setNeutral)} description="Neutral"></Button>
            <Button handleClick={() => setToAnyValue(bad, setBad)} description="Bad"></Button>
            <Statistics good={good} neutral={neutral} bad={bad} 
                total={total} average={average} positive={positive} />            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
