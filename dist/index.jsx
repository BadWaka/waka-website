"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
// reset.css
require("./common/reset.scss");
// ant-design
require("antd/dist/antd.css");
// components
var components_1 = require("./components");
ReactDOM.render(<div>
        <components_1.Header />
        <components_1.Footer />
    </div>, document.getElementById('example'));
//# sourceMappingURL=index.jsx.map