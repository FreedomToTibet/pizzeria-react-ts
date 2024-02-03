import React, {useState, useEffect} from 'react';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(0);
  const [sortBy, setSortBy] = useState({name: 'population', sort: 'rating'});
  const [increase, setIncrease] = useState(true);

  const host = 'https://65b3353d770d43aba4796ce5.mockapi.io/api/items';

  useEffect(() => {
    fetch(
      `${host}?${category > 0 ? `category=${category}` : ''}&sortBy=${sortBy.sort}&${
        increase ? `order=asc` : `order=desc`
      }`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
  }, [category, sortBy, increase]);

  return (
    <>
      <div className="content__top">
        <Categories category={category} onClickCategory={(index) => setCategory(index)} />
        <SortPopup
          sortBy={sortBy}
          onClickSortBy={(index) => setSortBy(index)}
          onClickIncrease={() => setIncrease(!increase)}
					increase={increase}
        />
      </div>
      <h2 className="content__title">All</h2>
      <div className="content__items">
        {isLoading
          ? pizzas.map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        {/* {pizzas.map((pizza) => (isLoading ? <Skeleton/> : 
							<PizzaBlock key={pizza.id} {...pizza} />
						))} */}
      </div>
    </>
  );
}
