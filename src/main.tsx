import './styles/index.scss';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux-toolkit/store.js';
import App from './App.js';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)