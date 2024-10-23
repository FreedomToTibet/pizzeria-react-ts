import {lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import AppLayout from './pages/AppLayout';

import './scss/app.scss';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const PizzaDetail = lazy(() => import(/* webpackChunkName: "PizzaDetail" */'./pages/PizzaDetail'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div style={{margin: '0 auto'}}>Loading...</div>} >
              <Cart />
            </Suspense>
          }
        />
        <Route path="pizza/:id" element={
					<Suspense fallback={<div style={{margin: '0 auto'}}>Loading...</div>} >
						<PizzaDetail />
					</Suspense>} />
        <Route path="*" element={
					<Suspense fallback={<div style={{margin: '0 auto'}}>Loading...</div>} >
						<NotFound /> 
					</Suspense>} />
      </Route>
    </Routes>
  );
};

export default App;
