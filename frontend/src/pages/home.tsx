import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import './home.css';

export function Home() {
    const [question, setQuestion] = useState<Question>({id: "1234",body: "loading...",calls: 0});
    const [answer, setAnswer] = useState<Answer>({id: "", body: "", question });
    useEffect(() => { refreshQuestion(); }, [])


    function refreshQuestion() {
        axios.get<Question>("/api/question").then(res => {
            console.log(res.data.body)
            setQuestion(res.data);
            //setAnswer({...answer, questionId: res.data.id})
        })
    }

    const refreshHandler = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        refreshQuestion();
    }

    const submitHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(answer.body != "") {
            answer.question = question
                axios.post('/api/answer', answer).then(res => {
                console.log(res)
                setAnswer({...answer, body:""})
            })
        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer({...answer, body: event.currentTarget.value})
        
    };

    return (
        <div className='home-wrapper'>
            <Link to={`/question/${question.id}`}>
                <div className="home-question">{question.body}</div>
            </Link>
            <div>
                <textarea
                    id="message"
                    name="message"
                    placeholder='answer'
                    value={ answer.body }
                    onChange={ changeHandler }
                />
                <div className="button-row">
                    <button
                        onClick={ submitHandler }
                    >submit</button>
                    <button
                        onClick={ refreshHandler }
                    >refresh</button>
                    <Link to="/ask">
                        <button>ask a question</button> 
                    </Link>
                </div>
            </div>
        </div>
    );
}