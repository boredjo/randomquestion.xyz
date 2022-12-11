"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
require("./question-page.css");
function QuestionPage() {
    const [question, setQuestion] = (0, react_1.useState)({ id: "", body: "loading...", calls: 0 });
    const [engagement, setEngagement] = (0, react_1.useState)(0);
    const [animation, setAnimation] = (0, react_1.useState)(0);
    const { id } = (0, react_router_dom_1.useParams)();
    const [answers, setAnswers] = (0, react_1.useState)([
        { id: "", body: "no answers yet", question: question }
    ]);
    (0, react_1.useEffect)(() => { getQuestion(); }, []);
    function getQuestion() {
        axios_1.default.get("/api/question/" + id).then(res => {
            setQuestion(res.data);
            getAnswers(res.data.id, res.data.calls);
        });
    }
    function getAnswers(id, calls) {
        axios_1.default.get("/api/answers/" + id).then(res => {
            console.log(res.data);
            if (res.data.length > 0) {
                setAnswers(res.data);
            }
            setEngagement(Math.floor((res.data.length / calls) * 100));
            setAnimation(3);
        });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "question" }, { children: question.body })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'engagement-bar' }, { children: [(0, jsx_runtime_1.jsx)("div", { className: 'bar-background' }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'bar', style: { width: `${engagement}%` } }, { children: (0, jsx_runtime_1.jsx)("div", { className: 'bar-content', style: { animation: `fadeIn ${animation}s` } }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: `flex` } }, { children: [(0, jsx_runtime_1.jsx)("div", { className: 'pointer', style: { marginLeft: `${engagement}%` } }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'bar-subtitle' }, { children: [engagement, "% engagement "] }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'answer-list-header' }, { children: "answers:" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'answer-list' }, { children: answers.map((answer, index) => (0, jsx_runtime_1.jsx)("div", { children: answer.body })) }))] }));
}
exports.QuestionPage = QuestionPage;
