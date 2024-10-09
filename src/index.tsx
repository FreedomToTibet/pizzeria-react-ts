import ReactDOM from 'react-dom/client';

import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import store from './redux/store';
import {Provider} from 'react-redux';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  );
} else {
  console.error("Root element not found");
}