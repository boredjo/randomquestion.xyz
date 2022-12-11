import React, { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import axios from 'axios';
import '../App.css';

export function About() {

    const [text, setText] = useState('');
    useEffect(()=>{
        axios.get<string>("https://raw.githubusercontent.com/boredjo/randomquestion.wtf/main/README.md").then(res => {
            setText(res.data.split("# randomquestion.wtf", 2)[1]);
        });
    },[]);

    return (
        <>
        <ReactMarkdown>{text}</ReactMarkdown>
        </>
    );
}