import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';

const PizzaDetail = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://66ebdc782b6cf2b89c5c1b3d.mockapi.io/api/items/${id}`,
        );
        const data = response.data;
        setPizza(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  if (!pizza) {
    return <div style={{textAlign: "center"}}>Loading...</div>;
  }

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="pizza-detail">
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <div className="pizza-detail__info">
        <span>Price: ${pizza.price}</span>
      </div>
      <p><span style={{fontWeight: "bold"}}>Ingredients:</span> {pizza.description}</p>
      <button
        className="button button--outline button--add go-back-btn"
        onClick={handleReturn}
      >
        <span>Return</span>
      </button>
    </div>
  );
};

export default PizzaDetail;
