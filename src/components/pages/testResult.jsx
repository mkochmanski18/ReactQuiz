import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const TestResult = ({points,numberOfQuestions}) =>{
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-quiz-category','cookie-quiz-difficulty','cookie-quiz-limit']);
    useEffect(()=>{
        const score = {
            difficulty:cookies['cookie-quiz-difficulty'],
            numberOfQuestions,
            points,
            date: new Date(),
        };
        let newScore;
        if(localStorage.getItem('scores')){
            const oldScores = localStorage.getItem('scores');
            newScore = [...oldScores,score];
        }
        else{
            newScore = [score];
        }
        var scoreJson= JSON.stringify(newScore);
        localStorage.setItem('scores',scoreJson);
    },[])
    const navigate = useNavigate();
    return(
        <Card style={{ width: '100%',marginTop:"60px",fontSize:"17px"}} bg="dark">
            <Card.Header>
                <h4>Result</h4>
            </Card.Header>
            <Card.Body>
                <span>You Scored: 
                    <span style={points/numberOfQuestions>0.75?{color:"green"}:(points/numberOfQuestions>0.5)?{color:"yellow"}:{color:"firebrick"}}> 
                        {` ${points} / ${numberOfQuestions}`}
                    </span>
                </span>
            </Card.Body>
            <Card.Footer>
                <Button 
                    variant="primary" 
                    style={{margin:"20px"}} 
                    onClick={()=>navigate("/")}>
                    Go to ScoreBoard
                </Button>
            </Card.Footer>
        </Card>
    )
}
export default TestResult;