"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const home_1 = require("./pages/home");
const about_1 = require("./pages/about");
const ask_1 = require("./pages/ask");
const question_page_1 = require("./pages/question-page");
const md_1 = require("react-icons/md");
function App() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/about", id: 'about-icon' }, { children: (0, jsx_runtime_1.jsx)(md_1.MdInfo, { className: 'icon' }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/" }, { children: (0, jsx_runtime_1.jsxs)("h1", { children: ["randomquestion.", (0, jsx_runtime_1.jsx)("a", { children: "wtf" }), " "] }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "wrapper" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(home_1.Home, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/about", element: (0, jsx_runtime_1.jsx)(about_1.About, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/ask", element: (0, jsx_runtime_1.jsx)(ask_1.Ask, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/question/:id", element: (0, jsx_runtime_1.jsx)(question_page_1.QuestionPage, {}) })] }) }))] }));
}
exports.default = App;
