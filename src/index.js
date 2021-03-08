import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {SpeechProvider} from '@speechly/react-client';  
import {Provider } from './context api/context';

ReactDOM.render(
<SpeechProvider appId="6ecb86b1-c437-4803-a55d-40dff6964b94" language="en-US">
        <Provider>
            <App/>
        </Provider>
</SpeechProvider>
,document.getElementById("root"));