"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
function App() {
    const [question, setQuestion] = (0, react_1.useState)({ id: "", text: "", calls: 0, stupidity: null });
    const [answer, setAnswer] = (0, react_1.useState)({ id: "", text: "", questionId: question.id, stupidity: null });
    (0, react_1.useEffect)(() => { refreshQuestion(); }, []);
    function refreshQuestion() {
        axios_1.default.get("/api/question").then(res => {
            console.log(res.data.text);
            setQuestion(res.data);
            setAnswer(Object.assign(Object.assign({}, answer), { questionId: res.data.id }));
        });
    }
    function testFun() {
        console.log("test");
    }
    const refreshHandler = (event) => {
        event.preventDefault();
        refreshQuestion();
    };
    const submitHandler = (event) => {
        if (answer.text != "") {
            answer.questionId = question.id;
            axios_1.default.post('/api/answer', answer).then(res => {
                console.log(res);
                setAnswer(Object.assign(Object.assign({}, answer), { text: "" }));
            });
        }
    };
    const changeHandler = (event) => {
        setAnswer(Object.assign(Object.assign({}, answer), { text: event.currentTarget.value }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "wrapper" }, { children: [(0, jsx_runtime_1.jsxs)("h1", { children: ["randomquestion.", (0, jsx_runtime_1.jsx)("a", { children: "wtf" }), " "] }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "question" }, { children: question.text })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("textarea", { id: "message", name: "message", placeholder: 'Answer', value: answer.text, onChange: changeHandler }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: submitHandler }, { children: " submit " })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: refreshHandler }, { children: " refresh " }))] }))] })] })));
}
exports.default = App;
