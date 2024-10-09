import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';
import PizzaDetail from './pages/PizzaDetail';
import AppLayout from './pages/AppLayout';

const App = () => {

  return (
		<Routes>
			<Route path='/' element={<AppLayout/>}>
				<Route index element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='pizza/:id' element={<PizzaDetail />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
  );
};

export default App;
