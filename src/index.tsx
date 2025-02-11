import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App'

const createElement = document.createElement('div')
createElement.className = 'flex flex-col flex-1'
createElement.id = 'root'
document.body.appendChild(createElement)

const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)

root.render(
	<App />
)
