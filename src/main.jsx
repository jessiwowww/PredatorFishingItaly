import React from 'react';
import ReactDOM from 'react-dom/client';
// HashRouter (not BrowserRouter): routing lives in the URL hash (#/tours), so
// the site works from file://, any static host and on refresh of any page —
// no server rewrites needed. Pairs with the relative asset base in vite.config.
import { HashRouter } from 'react-router-dom';
import App from './App';
import { LangProvider } from './i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <LangProvider>
        <App />
      </LangProvider>
    </HashRouter>
  </React.StrictMode>
);
