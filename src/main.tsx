import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { UsersProvider } from './components/contexts/UsersContext.tsx';
import { BrowserRouter } from 'react-router';
import { PostsProvider } from './components/contexts/PostsContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <PostsProvider>
    <UsersProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsersProvider>
  </PostsProvider>
)
