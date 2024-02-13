import App from './app';
import { Provider } from 'react-redux';
import { store } from './store/index';

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
