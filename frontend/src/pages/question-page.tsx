import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import './question-page.css';


export function QuestionPage() {


    const [question, setQuestion] = useState<Question>({id: "",body: "loading...",calls: 0});
    const [engagement, setEngagement] = useState<number>(0);
    const [animation, setAnimation] = useState<number>(0);
    const { id } = useParams();
    const [answers, setAnswers] = useState<Answer[]>([
         {id:"", body:"no answers yet", question: question}
    ]);
    useEffect(() => { getQuestion(); }, []);

    function getQuestion() { 
        axios.get<Question>("/api/question/" + id).then(res => {
            setQuestion(res.data);
            getAnswers(res.data.id, res.data.calls); 
        })
    }

    function getAnswers(id: string, calls: number) {
        axios.get<Answer[]>("/api/answers/" + id).then(res => {
            console.log(res.data)
            if(res.data.length > 0){
                setAnswers(res.data);
            }
            setEngagement(Math.floor((res.data.length / calls) * 100));
            setAnimation(3);           
        })
    }

    return (
        <>

            <div className="question">{question.body}</div>                
            <div className='engagement-bar'>
                <div className='bar-background'></div>
                <div className='bar' style={ { width: `${ engagement}%` } }>
                    <div className='bar-content' style={{animation: `fadeIn ${animation}s`}}></div>
                </div>
                <div style={{display: `flex`}}>
                    <div className='pointer' style={ { marginLeft: `${ engagement}%` } }></div>
                    <div className='bar-subtitle'>{ engagement }% engagement </div>
                </div>
                
            </div>

            <div className='answer-list-header'>answers:</div>
            <div className='answer-list'>
                {answers.map((answer,index) =>           
                    <div>{answer.body}</div>
                )}
            </div>
        </>
    );
}
