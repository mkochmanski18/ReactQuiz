import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from './pages/startPage';
import QuizForm from './pages/quizForm';
import QuizPage from './pages/quizPage';

function App() {
 
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/form" element={<QuizForm/>}/>
            <Route path="/quiz" element={<QuizPage/>}/>
          </Routes>
          
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
