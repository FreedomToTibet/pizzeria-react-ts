import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortBy } from '../redux/slices/filterSlice';

const SortPopup = ({onClickIncrease, increase}) => {
	const dispatch = useDispatch();
	const sortBy = useSelector((state) => state.filterSlice.sortBy);
	const [visiblePopup, setVisiblePopup] = useState(false);
	const list = [{name: 'population', sort: 'rating'}, {name: 'price', sort: 'price'}, {name: 'name', sort: 'title'}];

	const onClickSetectedItem = (obj) => {
		dispatch(setSortBy(obj));
		setVisiblePopup(false);
	}

	return (
		<div className="sort">
				<div className="sort__label">

					<svg
						width="14"
						height="8"
						viewBox="0 0 10 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						onClick={() => onClickIncrease()}
						style={increase ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' }}
					>
						<path
							d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
							fill="#2C2C2C"
						/>
					</svg>
					<b>Sort by:</b>
					<span onClick={() => setVisiblePopup(!visiblePopup)}>{sortBy.name}</span>
				</div>
				{visiblePopup && (
					<div className="sort__popup">
						<ul>
							{list.map((obj, index) => (
								<li 
									key={index}
									onClick={() => onClickSetectedItem(obj)}
									className={sortBy.sort === obj.sort ? 'active' : ''}
								>{obj.name}</li>
							))}
						</ul>
					</div>
				)}
			</div>
	);
};

export default SortPopup;