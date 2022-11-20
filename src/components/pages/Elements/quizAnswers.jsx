import { useEffect, useState } from "react";
const QuizAnswers = ({questions, currentQuestion, answers, userAnswers,isCommpleteTest}) =>{
    const answer_name=['answer_a','answer_b','answer_c','answer_d','answer_e','answer_f'];
    const [tempAnswers,setTempAnswers] = useState([]);

    useEffect(()=>{
        if(userAnswers?.current["question"+currentQuestion]) {
            setTempAnswers(userAnswers.current["question"+currentQuestion]);
            answer_name.map(name=>{
                if(document.getElementById("checkbox"+name)) document.getElementById("checkbox"+name).checked = userAnswers.current["question"+currentQuestion][name];
            })
        }
        else{
            let array = [];
            answer_name.map(name=>{
            array[name]=false;
            if(document.getElementById("checkbox"+name)) document.getElementById("checkbox"+name).checked = false;
            })
            setTempAnswers(array);
        }
    },[currentQuestion])
    return(
        <div style={{display:"block",textAlign:"left"}}>
            {answer_name.map((name,index)=>{

                const changeValue = (e) =>{
                    const array = tempAnswers;
                    array[name] = e.target.checked;
                    setTempAnswers(array);
                    userAnswers.current["question"+currentQuestion] = tempAnswers;
                }
                
                const isCorrect = () =>{
                    if(document.getElementById("checkbox"+name)?.checked===true){
                        if(questions[currentQuestion].correct_answers[name+"_correct"]===tempAnswers[name].toString()) return <span style={{color:"green",margin:"0 5px"}}> Correct!</span>;
                        else return <span style={{color:"firebrick",margin:"0 5px"}}>Incorrect!</span>;
                    }}
                const showAllAnswers = () =>{
                    if(document.getElementById("checkbox"+name)?.checked!==true){
                        if(questions[currentQuestion].correct_answers[name+"_correct"]==='true'&&tempAnswers[name]===false) {
                            return <span style={{color:"yellow",margin:"0 5px"}}> Correct!</span>;}
                }
                }

                return(
                    answers&&answers[name]!==null?
                    <div key={name} style={{margin:"15px 20px",fontSize:"17px"}}>
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            style={{width:"20px",height:"20px"}} 
                            id={"checkbox"+name} 
                            aria-label="..."
                            onChange={(e)=>changeValue(e)} 
                            disabled={isCommpleteTest?true:false}
                            />
                        {" Answer "+(index+1)+": "+answers[name]}
                        {isCommpleteTest&&isCorrect()}
                        {isCommpleteTest&&showAllAnswers()}
            
                    </div>:null
                )
            })}
        </div>
    )
}
export default QuizAnswers