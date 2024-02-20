import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';

import { setCategory, setIncrease } from '../redux/slices/filterSlice';

export default function Home({searchValue}) {
	const {category, increase, sortBy} = useSelector((state) => state.filterSlice);
	// const increase = useSelector((state) => state.filterSlice.increase);
	// const sortBy = useSelector((state) => state.filterSlice.sortBy);
	const dispatch = useDispatch();

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);

	const onClickCategory = (index) => {
		dispatch(setCategory(index));
	};
	const onClickIncrease = () => {
		dispatch(setIncrease());
	};

  const host = 'https://65b3353d770d43aba4796ce5.mockapi.io/api/items';

  useEffect(() => {
		setIsLoading(true);
    fetch(
      `${host}?page=${page}&limit=4&${category > 0 ? `category=${category}` : ''}&sortBy=${sortBy.sort}&${
        increase ? `order=asc` : `order=desc`
      }`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
  }, [category, sortBy, increase, page]);

	const pizzasPage = searchValue ? pizzas.filter((pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase())) : pizzas;
	const pizzasRender = pizzasPage.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
	const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className="content__top">
        <Categories category={category} onClickCategory={onClickCategory} />
        <SortPopup
          onClickIncrease={onClickIncrease}
					increase={increase}
        />
      </div>
      <h2 className="content__title">All</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzasRender}
      </div>
			<Pagination onChangePage={number => setPage(number)} />
    </>
  );
}
