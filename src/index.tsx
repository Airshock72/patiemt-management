import './index.css'
import '@ant-design/v5-patch-for-react-19'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from 'src/providers/ThemeContext.tsx'
import TranslationProvider from 'src/providers/TranslationProvider.tsx'

const createElement = document.createElement('div')
createElement.className = 'flex flex-col flex-1'
createElement.id = 'root'
document.body.appendChild(createElement)

const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </ThemeProvider>
  </BrowserRouter>
)
