import React from "react";
import ReactDom from "react-dom";
import getRouter from "router/router";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import SiderDemo from './router/router';
import 'antd/dist/antd.css';
ReactDom.render(<SiderDemo />, document.getElementById("app"));

// ReactDom.render(
//     <AppContainer>
//         {/* <Provider store={store}> */}
//             {getRouter()}
//         {/* </Provider> */}
//     </AppContainer>,
//     document.getElementById("app")
// );
