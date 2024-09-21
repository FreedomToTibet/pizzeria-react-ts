import React from 'react';

const Categories = ({ category, onClickCategory }) => {
	
	const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spice', 'Closed'];

	return (
		<div className="categories">
				<ul>
					{categories.map((categoryName, index) => (
						<li
							key={`${categoryName}_${index}`}
							className={category === index ? 'active' : ''}
							onClick={() => onClickCategory(index)}
						>
							{categoryName}
						</li>
					))}
				</ul>
			</div>
	);
};

export default Categories;