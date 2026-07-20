import ReactDOM from 'react-dom/client';
// HashRouter (not BrowserRouter): routing lives in the URL hash (#/tours), so
// the site works from file://, any static host and on refresh of any page —
// no server rewrites needed. Pairs with the relative asset base in vite.config.
import { HashRouter } from 'react-router-dom';
import App from './App';
import { LangProvider } from './i18n';
import './index.css';

// NOTE: no React.StrictMode. In dev, StrictMode double-invokes mount/unmount,
// which triggered a "destroy is not a function" crash from a dependency's effect
// cleanup (react-router). StrictMode is a dev-only aid and never runs in the
// production build, so removing it changes nothing for the deployed site.
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <LangProvider>
      <App />
    </LangProvider>
  </HashRouter>
);
