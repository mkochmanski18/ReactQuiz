import { useState,useEffect,useRef } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';
import QuizNavbar from "./Elements/quizNavbar";
import QuizAnswers from "./Elements/quizAnswers";
import TestResult from "./testResult";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";

const QuizPage = () =>{
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-quiz-category','cookie-quiz-difficulty','cookie-quiz-limit']);
    const [questions,setQuestions] = useState([]);
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [error,setError] = useState();
    const [isCommpleteTest,setIsCompleteTest] = useState(false);
    const [points,setPoints]=useState(0);
    const userAnswers = useRef([]);

    useEffect(()=>{
        let category,difficulty,limit;
        if(cookies['cookie-quiz-category']) category=cookies['cookie-quiz-category'];
        if(cookies['cookie-quiz-difficulty']) difficulty=cookies['cookie-quiz-difficulty'];
        if(cookies['cookie-quiz-limit']) limit = cookies['cookie-quiz-limit'];

        const urlQuery = 
        ((category||difficulty||limit)?"?":"")+
        (category?"category="+category:"")+
        ((category&&difficulty)?"&&":"")+
        (difficulty?"difficulty="+difficulty:"")+
        ((limit&&difficulty)?"&&":"")+
        (limit?"limit="+limit:"");
        const options = {
            method: 'GET',
            url: 'https://quizapi.io/api/v1/questions'+urlQuery,
            headers: {
              'X-Api-Key':'DFglSERh25k1bBPbcJQrJbgYPc37iRH8KS47n1tH'
            }
          };

        axios.request(options)
        .then(res=>setQuestions(res.data))
        .catch(err=>console.log(err));
          
        setCurrentQuestion(0);
    },[])

    function submitAnswers(){
        if(Object.keys(userAnswers.current).length===questions.length){
            let tempPoints = 0;
            questions.map((question,index)=>{
                let iPoint = 0;
                if(question.correct_answers['answer_a_correct']===userAnswers.current["question"+index]['answer_a'].toString())iPoint++;
                if(question.correct_answers['answer_b_correct']===userAnswers.current["question"+index]['answer_b'].toString())iPoint++;
                if(question.correct_answers['answer_c_correct']===userAnswers.current["question"+index]['answer_c'].toString())iPoint++;
                if(question.correct_answers['answer_d_correct']===userAnswers.current["question"+index]['answer_d'].toString())iPoint++;
                if(question.correct_answers['answer_e_correct']===userAnswers.current["question"+index]['answer_e'].toString())iPoint++;
                if(question.correct_answers['answer_f_correct']===userAnswers.current["question"+index]['answer_f'].toString())iPoint++;
                
                console.log("sub",question,index,iPoint,tempPoints)
                if(iPoint===6) tempPoints++;
        })
        setPoints(tempPoints);
        setIsCompleteTest(true);
        }
        else setError("Not all questions have been answered yet..")
        
    }

    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",height:"100vh",width:"50%"}}>
            <QuizNavbar 
                questions={questions} 
                currentQuestion={currentQuestion} 
                setCurrentQuestion={setCurrentQuestion}
                userAnswers={userAnswers}
                />
            <Card style={{ width: '100%',marginTop:"60px" }} bg="dark">
                <Card.Header>
                    <h5 style={{color:"gray"}}>{questions[currentQuestion]?.question}</h5>
                </Card.Header>
                <Card.Body>
                    <QuizAnswers 
                        questions={questions}
                        currentQuestion={currentQuestion&&currentQuestion}
                        answers={questions[currentQuestion]?.answers} 
                        userAnswers={userAnswers}
                        isCommpleteTest={isCommpleteTest}
                        />
                </Card.Body>
                <Button 
                    variant="success" 
                    style={{margin:"20px"}} 
                    onClick={()=>submitAnswers()}
                    disabled={isCommpleteTest?true:false}>
                    Send Answers
                </Button>
            </Card>
            {isCommpleteTest&&<TestResult points={points} numberOfQuestions={questions.length}/>}
        </div>
    )
}
export default QuizPage