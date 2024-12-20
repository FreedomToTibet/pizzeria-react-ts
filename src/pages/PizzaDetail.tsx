import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';

interface IPizza {
  id: string;
  title: string;
  imageUrl: string;
	description: string;
	sizes: number[];
  prices: { [key: number]: number };
}

const PizzaDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [pizza, setPizza] = useState<IPizza | null>(null);

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
			<button
        className="button button--outline button--add go-back-btn"
				style={{ marginLeft: '2%', marginBottom: '1%' }}
        onClick={handleReturn}
      >
        <span>Return</span>
      </button>
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <div className="pizza-detail__info">
			<span>Price: ${pizza.prices[pizza.sizes[0]]}</span>
      </div>
      <p><span style={{fontWeight: "bold"}}>Ingredients:</span> {pizza.description}</p>
    </div>
  );
};

export default PizzaDetail;
