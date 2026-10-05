import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure HTML lang attribute is strictly en-IN at runtime
if (typeof document !== 'undefined') {
  document.documentElement.lang = 'en-IN';
  document.documentElement.setAttribute('lang', 'en-IN');
}

createRoot(document.getElementById('root')!).render(<App />);
