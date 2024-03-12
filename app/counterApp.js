import Counter from './counter';
import { Provider } from 'react-redux';
import { store } from './store';

export default () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};
