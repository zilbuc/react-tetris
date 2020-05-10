import React from 'react';
import ReactDOM from 'react-dom';
import Tetris from './components/Tetris'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Tetris />, document.getElementById('root'))

serviceWorker.unregister()
