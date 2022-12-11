import React, { useState, useEffect, MouseEventHandler } from 'react';
import axios from 'axios';
import { Question } from '../models/question';
import './home.css';

export function Ask() {
    const [question, setQuestion] = useState<Question>({id: "",body: "",calls: 0});

    const submitHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(question.body !== "") {
                axios.post('/api/question', question).then(res => {
                console.log(res)
                setQuestion({...question, body:""})
            })
        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion({...question, body: event.currentTarget.value})
        
    };

    return (
        <>
            <div className="home-question">ask a question:</div>
            <div>
                <textarea
                    id="message"
                    name="message"
                    placeholder='question'
                    value={ question.body }
                    onChange={ changeHandler }
                />
                <div className="button-row">
                    <button
                        onClick={ submitHandler }
                    > submit </button>
                </div>
            </div>
        </>
    );
}