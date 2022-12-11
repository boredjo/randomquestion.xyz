"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ask = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
require("./home.css");
function Ask() {
    const [question, setQuestion] = (0, react_1.useState)({ id: "", body: "", calls: 0 });
    const submitHandler = (event) => {
        if (question.body !== "") {
            axios_1.default.post('/api/question', question).then(res => {
                console.log(res);
                setQuestion(Object.assign(Object.assign({}, question), { body: "" }));
            });
        }
    };
    const changeHandler = (event) => {
        setQuestion(Object.assign(Object.assign({}, question), { body: event.currentTarget.value }));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "home-question" }, { children: "ask a question:" })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("textarea", { id: "message", name: "message", placeholder: 'question', value: question.body, onChange: changeHandler }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "button-row" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: submitHandler }, { children: " submit " })) }))] })] }));
}
exports.Ask = Ask;
