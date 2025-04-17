import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { UsersProvider } from './components/contexts/UsersContext.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <UsersProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UsersProvider>
)
