import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';

import { setCategory, setPage, setSortBy, setIncrease } from '../redux/slices/filterSlice';

export default function Home({ searchValue }) {
  const { category, increase, sortBy, page } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [pizzas, setPizzas] = useState([]);
  const [pizzasValue, setPizzasValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pizzasPageQuantity, setPizzasPageQuantity] = useState(0);
  const [isQueryParsed, setIsQueryParsed] = useState(false);
	const isMounted = useRef(false);

  const onClickCategory = (index) => {
    dispatch(setCategory(index));
  };

  const onChangePage = (number) => {
    dispatch(setPage(number));
  };

  // Parse query parameters and update state
  useEffect(() => {
    if (!window.location.search) {
      setIsQueryParsed(true);
      return;
    }

    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    
    if (query.category !== undefined) dispatch(setCategory(Number(query.category)));
    if (query.page !== undefined) dispatch(setPage(Number(query.page)));
    if (query.sortBy !== undefined) dispatch(setSortBy({ name: '', sort: query.sortBy }));
		if (query.order !== undefined && (query.order === 'asc') !== increase) {dispatch(setIncrease());}

    setIsQueryParsed(true);
  }, [dispatch]);

  const host = 'https://66ebdc782b6cf2b89c5c1b3d.mockapi.io/api/items';

  // Fetch data based on updated state
  useEffect(() => {
    if (!isQueryParsed) return;

    setIsLoading(true);
    axios
      .get(
        `${host}?page=${page}&&${category > 0 ? `category=${category}` : ''}&sortBy=${
          sortBy.sort
        }&${increase ? `order=asc` : `order=desc`}`,
      )
      .then((response) => {
        const data = response.data;
        setPizzasValue(data);
        setPizzasPageQuantity(Math.ceil(data.length / 4));
      });

    axios
      .get(
        `${host}?page=${page}&limit=4&${
          category > 0 ? `category=${category}` : ''
        }&sortBy=${sortBy.sort}&${increase ? `order=asc` : `order=desc`}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      });
  }, [category, sortBy, increase, page, isQueryParsed]);

  // Update URL with current state
  useEffect(() => {
    if (!isQueryParsed) return;

		if (isMounted.current) {
			const query = qs.stringify({
				sortBy: sortBy.sort,
				order: increase ? 'asc' : 'desc',
				category: category,
				page,
			});
			
			navigate(`?${query}`);
		} 
		isMounted.current = true;
  }, [category, sortBy, increase, page, navigate, isQueryParsed]);

  const pizzasPage = searchValue
    ? pizzasValue.filter((pizza) =>
        pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : pizzas;

  const pizzasRender = pizzasPage.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories category={category} onClickCategory={onClickCategory} />
        <SortPopup />
      </div>
      <div className="content__items">{isLoading ? skeletons : pizzasRender}</div>
      <Pagination
        pageCount={searchValue ? Math.ceil(pizzasPage.length / 4) : pizzasPageQuantity}
        onChangePage={onChangePage}
				currentPage={page}
      />
    </>
  );
}