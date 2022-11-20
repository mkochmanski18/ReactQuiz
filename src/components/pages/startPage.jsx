import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';

const StartPage = () =>{
    const navigate = useNavigate();
    const [userScores,setUserScores] = useState([]);
    function toForm(){
        navigate("/form")
    }
    useEffect(()=>{
        
        if(localStorage.getItem('scores')) 
        {
            let jsonScore;
            jsonScore = localStorage.getItem('scores');
            const scoreArray = JSON.parse(jsonScore);
            setUserScores(scoreArray);
        }
    },[])
    return(
        <>
            <h1>QUIZ</h1>
            <h5>Fill form in order to prepare a set of questions</h5>
            <Button variant="success" style={{fontSize:"30px",margin:"30px"}} onClick={()=>toForm()}>
                Go to Form
            </Button>
            <h1>ScoreBoard</h1>
            <Table striped bordered hover variant="dark" style={{width:"80%"}}>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Difficulty</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
            {userScores&&userScores.map(score=>{
                return(
                    <>
                        <td>{score.username}</td>
                        <td>{score.difficulty?score.difficulty:"random"}</td>
                        <td>{score.category?score.category:"random"}</td>
                        <td>{score.date}</td>
                        <td>{score.points}/{score.numberOfQuestions}</td>
                    </>
                )
            })}
            </tbody>
            </Table>
        </>
    )
}
export default StartPage