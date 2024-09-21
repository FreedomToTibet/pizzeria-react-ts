import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import {Pagination} from '../components/Pagination';

import {setCategory, setPage, setSortBy} from '../redux/slices/filterSlice';

export default function Home({searchValue}) {
  const {category, increase, sortBy, page} = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [pizzas, setPizzas] = useState([]);
  const [pizzasValue, setPizzasValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pizzasPageQuantity, setPizzasPageQuantity] = useState(0);

  const onClickCategory = (index) => {
    dispatch(setCategory(index));
  };

  const onChangePage = (number) => {
    dispatch(setPage(number));
  };

  useEffect(() => {
    if (!window.location.search) return;

    const query = qs.parse(window.location.search, {ignoreQueryPrefix: true});
		console.log(query);
    dispatch(setCategory(Number(query.category)));
    dispatch(setPage(Number(query.page)));
    dispatch(setSortBy({name: 'population', sort: query.sortBy}));
  }, [dispatch]);

  const host = 'https://66ebdc782b6cf2b89c5c1b3d.mockapi.io/api/items';

  useEffect(() => {
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

  }, [category, sortBy, increase, page]);

  useEffect(() => {
    const query = qs.stringify({
      sortBy: sortBy.sort,
      order: increase ? 'asc' : 'desc',
      category: category,
      page,
    });
    navigate(`?${query}`);
  }, [category, sortBy, increase, page, navigate]);

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
      {/* <h2 className="content__title">{categories[category]}</h2> */}
      <div className="content__items">{isLoading ? skeletons : pizzasRender}</div>
      <Pagination
        pageCount={searchValue ? Math.ceil(pizzasPage.length / 4) : pizzasPageQuantity}
        onChangePage={onChangePage}
      />
    </>
  );
}
