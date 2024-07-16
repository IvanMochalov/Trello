import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './main.global.css'
import './normalize.css'
import { Paths } from './utils/constants'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<BrowserRouter basename={Paths.browserHomePage}>
			<App />
		</BrowserRouter>
	</React.StrictMode>
)
