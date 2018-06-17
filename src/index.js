import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import Root from './views/Root'

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
