import {useState, FC} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {addItem} from '../../redux/slices/cartSlice';

interface IPizzaBlockProps {
  id: string;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
	prices: { [key: number]: number };
}

const PizzaBlock: FC<IPizzaBlockProps> = ({id, title, prices, imageUrl, sizes, types}) => {
  const dispatch = useDispatch();

  const quantity =
    useSelector(
      (state: {cartSlice: {items: {id: string; quantity: number}[]}}) =>
        state.cartSlice.items.find((obj) => obj.id === id)?.quantity,
    ) || 0;

  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(0);
  const typesNames = ['thin', 'traditional'];
	const price = prices[sizes[activeSize]];

  const onClickAddPizza = () => {
    const obj = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: typesNames[activeType],
    };
    dispatch(addItem(obj));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => setActiveType(type)}
              className={activeType === type ? 'active' : ''}
            >
              {typesNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? 'active' : ''}
            >
              {size} cm.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} $</div>
        <button onClick={onClickAddPizza} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          {quantity > 0 && <i>{quantity}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
