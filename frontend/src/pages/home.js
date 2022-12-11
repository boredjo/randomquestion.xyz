"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
require("./home.css");
function Home() {
    const [question, setQuestion] = (0, react_1.useState)({ id: "1234", body: "loading...", calls: 0 });
    const [answer, setAnswer] = (0, react_1.useState)({ id: "", body: "", question });
    (0, react_1.useEffect)(() => { refreshQuestion(); }, []);
    function refreshQuestion() {
        axios_1.default.get("/api/question").then(res => {
            console.log(res.data.body);
            setQuestion(res.data);
            //setAnswer({...answer, questionId: res.data.id})
        });
    }
    const refreshHandler = (event) => {
        event.preventDefault();
        refreshQuestion();
    };
    const submitHandler = (event) => {
        if (answer.body !== "") {
            answer.question = question;
            axios_1.default.post('/api/answer', answer).then(res => {
                console.log(res);
                setAnswer(Object.assign(Object.assign({}, answer), { body: "" }));
            });
        }
    };
    const changeHandler = (event) => {
        setAnswer(Object.assign(Object.assign({}, answer), { body: event.currentTarget.value }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'home-wrapper' }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/question/${question.id}` }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "home-question" }, { children: question.body })) })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("textarea", { id: "message", name: "message", placeholder: 'answer', value: answer.body, onChange: changeHandler }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: submitHandler }, { children: "submit" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: refreshHandler }, { children: "refresh" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/ask" }, { children: (0, jsx_runtime_1.jsx)("button", { children: "ask a question" }) }))] }))] })] })));
}
exports.Home = Home;
