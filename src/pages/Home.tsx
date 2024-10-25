import {useState, useEffect, useRef, useContext, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import {Pagination} from '../components/Pagination';
import {SearchContext} from './AppLayout';

import {setCategory, setPage, setSortBy, setIncrease} from '../redux/slices/filterSlice';
import {fetchPizzas} from '../redux/slices/pizzaSlice';
import {RootState, AppDispatch} from '../redux/store';

interface IPizza {
  id: string;
  title: string;
  type: string;
  size: number;
  quantity: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
	prices: { [key: number]: number };
}

export default function Home() {
  const {category, increase, sortBy, page} = useSelector(
    (state: RootState) => state.filterSlice,
  );
  const {pizzas, status} = useSelector((state: RootState) => state.pizzaSlice) as {
    pizzas: IPizza[];
    status: string;
  };
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('Home must be used within a SearchContext.Provider');
  }
  const {searchValue} = context;

  const [pizzasValue, setPizzasValue] = useState<IPizza[]>([]);
  const [pizzasPageQuantity, setPizzasPageQuantity] = useState(0);
  const [isQueryParsed, setIsQueryParsed] = useState(false);
  const isMounted = useRef(false);

  const onClickCategory = useCallback((index: number) => {
    dispatch(setCategory(index));
		dispatch(setPage(1)); // Reset page to 1 when category changes
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setPage(number));
  };

  // Parse query parameters and update state
  useEffect(() => {
    if (!window.location.search) {
      setIsQueryParsed(true);
      return;
    }

    const query = qs.parse(window.location.search, {ignoreQueryPrefix: true});

    if (query.category !== undefined) dispatch(setCategory(Number(query.category)));
    if (query.page !== undefined) dispatch(setPage(Number(query.page)));
    if (query.sortBy !== undefined) {
			const sortBy = Array.isArray(query.sortBy) ? query.sortBy[0] : query.sortBy;
			dispatch(setSortBy({ name: '', sort: sortBy as string }));
		};
    if (query.order !== undefined && (query.order === 'asc') !== increase) {
      dispatch(setIncrease());
    }

    setIsQueryParsed(true);
  }, [dispatch]);

  const host = 'https://66ebdc782b6cf2b89c5c1b3d.mockapi.io/api/items';

	// Fetch total number of items based on category
  useEffect(() => {
    if (!isQueryParsed) return;

    const fetchTotalItems = async () => {
      try {
        const response = await axios.get(
          `${host}?${category > 0 ? `category=${category}` : ''}`,
        );
        const data = response.data;
				setPizzasValue(data);
        setPizzasPageQuantity(Math.ceil(data.length / 4));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalItems();
  }, [category, isQueryParsed]);

	// Fetch paginated items based on updated state
  useEffect(() => {
    if (!isQueryParsed) return;

    dispatch(fetchPizzas({host, page, category, sortBy, increase}));
  }, [category, sortBy, increase, page, isQueryParsed, dispatch]);

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
      {status === 'error' ? (
        <div
          style={{
            textAlign: 'center',
            color: 'red',
            fontSize: '1.5em',
            marginBlock: '20px',
          }}
        >
          Something went wrong...<i>😕</i>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzasRender}
        </div>
      )}
      {!searchValue && <Pagination
        pageCount={searchValue ? Math.ceil(pizzasPage.length / 4) : pizzasPageQuantity}
        onChangePage={onChangePage}
        currentPage={page}
      />}
    </>
  );
}
