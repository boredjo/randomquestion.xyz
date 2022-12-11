"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_markdown_1 = __importDefault(require("react-markdown"));
const axios_1 = __importDefault(require("axios"));
require("../App.css");
function About() {
    const [text, setText] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        axios_1.default.get("https://raw.githubusercontent.com/boredjo/randomquestion.wtf/main/README.md").then(res => {
            setText(res.data.split("# randomquestion.wtf", 2)[1]);
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_markdown_1.default, { children: text }) }));
}
exports.About = About;
