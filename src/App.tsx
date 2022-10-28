import './App.css';
import React, { useState, useEffect, MouseEventHandler } from 'react';
// import AnswerField from './AnswerField/AnswerField';
import { Question, Answer } from '@prisma/client';
import axios from 'axios';

function App() {
    const [question, setQuestion] = useState<Question>({id: "", text:"", calls: 0, stupidity: null});
    const [answer, setAnswer] = useState<Answer>({id: "", text: "", questionId: question.id, stupidity: null});
    useEffect(() => { refreshQuestion(); }, [])


    function refreshQuestion() {
        axios.get<Question>("/api/question").then(res => {
            console.log(res.data.text)
            setQuestion(res.data);
            setAnswer({...answer, questionId: res.data.id})
        })
    }

    function testFun() {
        console.log("test")
    }

    const refreshHandler = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        refreshQuestion();
      }

    const submitHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(answer.text != "") {
            answer.questionId = question.id
            axios.post('/api/answer', answer).then(res => {
                console.log(res)
                setAnswer({...answer, text:""})
            })
        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer({...answer, text: event.currentTarget.value})
        
      };
    

    return (
        <div className="wrapper">
            <h1>randomquestion.<a>wtf</a> </h1>
            <div className="question">{question.text}</div>
            <div>
                <textarea
                    id="message"
                    name="message"
                    placeholder='Answer'
                    value={ answer.text }
                    onChange={ changeHandler }
                />
            
            <div className="button-row">
                <button
                    onClick={ submitHandler }
                > submit </button>
                <button
                     onClick={ refreshHandler }
                > refresh </button> 
            </div>
        </div>
        </div>
    );
}


export default App;

