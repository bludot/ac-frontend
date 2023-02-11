import React from 'react';
import {render} from "react-dom";
import './app.css';
import './scss/base.scss';
import Bootstrap from './bootstrap'
import 'normalize.css';

render(<Bootstrap />, document.querySelector('#root'))

// const rootElement = document.getElementById("root");
// render(<Index/>, rootElement);
