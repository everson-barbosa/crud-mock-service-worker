import ReactDOM from 'react-dom/client'

import { RouterProvider } from "react-router-dom";
import { router } from './routes/router.tsx';
import App from './App.tsx';

import './global.css'
import '@radix-ui/themes/styles.css';

async function deferRender() {
  if (import.meta.env.MODE === "mock") {
    const { worker } = await import('./mocks/browser.ts')

    return worker.start()
  }
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  // </React.StrictMode>,
)
})
