import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

const QuizForm = () =>{
    
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-quiz-category','cookie-quiz-difficulty','cookie-quiz-limit',"cookie-quiz-name"]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data=>{
        console.log(data);
        if(data.category!=="") {
            setCookie('cookie-quiz-category',data.category,{ path: '/' })
        }
        else if(cookies["cookie-quiz-category"]) removeCookie('cookie-quiz-category');
        if(data.difficulty!=="") {
            setCookie('cookie-quiz-difficulty',data.difficulty,{ path: '/' })
        }
        else if(cookies["cookie-quiz-difficulty"]) removeCookie('cookie-quiz-difficulty');
        if(data.limit) {
            setCookie('cookie-quiz-limit',data.limit,{ path: '/' })
        }
        else if(cookies["cookie-quiz-limit"]) removeCookie('cookie-quiz-limit');
        if(data.name) {
            setCookie('cookie-quiz-name',data.name,{ path: '/' })
        }
        navigate("/quiz")
    }
    return(
        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        {...register("name", { required: true })}
                        />
                {errors.name&&<span style={{color:"firebrick",fontSize:"20px"}}>Field required</span>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="category">Category:</Form.Label>
                    <Form.Select 
                        name="category" 
                        {...register("category")}
                        >
                        <option value="">Random</option>
                        <option value="linux">Linux</option>
                        <option value="devops">DevOps</option>
                        <option value="networking">Networking</option>
                        <option value="programming">Programming </option>
                        <option value="cloud">Cloud</option>
                        <option value="docker">Docker</option>
                        <option value="kubernetes">Kubernetes</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="difficulty">Difficulty:</Form.Label>
                    <Form.Select 
                        name="difficulty" 
                        {...register("difficulty")}
                        >
                        <option value="">Random</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="limit">Amount of questions</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="limit" 
                        max={20} 
                        {...register("limit", { required: true,max:20})}
                        />
                        {errors.limit&&<span style={{color:"firebrick",fontSize:"20px"}}>Field required</span>}
                </Form.Group>
            <Button type="submit" variant="success" style={{fontSize:"30px",width:"100%"}}>Generate</Button>
            </Form>
        </div>
    )
}
export default QuizForm