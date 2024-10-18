interface ICategoriesProps {
	category: number;
	onClickCategory: (index: number) => void;
}

const Categories: React.FC<ICategoriesProps> = ({ category, onClickCategory }) => {
	
	const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spice', 'Mixed'];

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