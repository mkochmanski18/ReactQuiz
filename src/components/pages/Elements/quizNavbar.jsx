import { Button } from "react-bootstrap"
const QuizNavbar = ({questions,currentQuestion,setCurrentQuestion,userAnswers}) =>{
    
    return(
        <div>
            {questions.map((question,index)=>{
                
                return(
                    <Button 
                        onClick={()=>setCurrentQuestion(index)} 
                        variant={currentQuestion===index?"success":userAnswers.current["question"+index]!==undefined?"primary":"dark"} key={"navbar-"+index}
                        >
                        {index+1}
                    </Button>
                )
            })}
        </div>
    )
}
export default QuizNavbar