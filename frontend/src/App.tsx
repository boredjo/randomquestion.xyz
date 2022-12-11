import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from "./pages/home"
import { About } from "./pages/about"
import { Ask } from "./pages/ask"
import { QuestionPage } from "./pages/question-page"

import { MdInfo } from "react-icons/md";

function App() {
    
    

    return (
        <>
            <Link to="/about" id='about-icon'><MdInfo className='icon' /></Link>
            <Link to="/"><h1>randomquestion.<a>wtf</a> </h1></Link>

            
            
            <div className="wrapper">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/ask" element={<Ask/>}/>
                    <Route path="/question/:id" element={<QuestionPage/>}/>
                </Routes>     
            </div>
        </>
    );
}


export default App;