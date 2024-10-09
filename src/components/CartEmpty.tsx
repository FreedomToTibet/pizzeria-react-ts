import { Link } from 'react-router-dom';

const CartEmpty = () => {
	return (
		<div className="cart cart--empty">
          <h2>
            Card is empty <i>😕</i>
          </h2>
          <p>
						You forgot to order THE delicious pizza
            <br />
            We have a choice for every taste and appetite
          </p>
          <img src="/img/empty-cart.png" alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Go back</span>
          </Link>
        </div>
	)
}

export default CartEmpty;
