import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import MainProvider from "./store/MainProvider";

ReactDOM.render(
    <BrowserRouter>
        <MainProvider>
            <App/>
        </MainProvider>
    </BrowserRouter>, document.getElementById('root')
);