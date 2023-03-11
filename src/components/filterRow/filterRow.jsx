
import * as React from 'react';

export const FilterRow = () => {

    const [categoryFilter, setCategoryFilter] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('publishDateDesc');



    return (
        <div className="filterRow">
            <label className="filterRow__recipeLabel">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filterRow__recipeLabel--select"
                    required
                >
                    <option value="">Categories</option>
                    <option value="breadsSandwichesAndPizza">Breads,Sandwiches, & Pizza</option>
                    <option value="eggsAndBreakfast">Eggs & Breakfast</option>
                    <option value="saladsAnsSnacks">Salads & Snacks</option>
                    <option value="soups">Soups</option>
                    <option value="mainDish">Main Dish</option>
                    <option value="meatLovers">Meat Lover's</option>
                    <option value="fishAndSeafood">Fish & Seafood</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="dessertsAndBakedGoods">Desserts & Baked Goods</option>
                </select>
                </label>

                <div className="filterRow__addRecipeBox">
                        <a className="filterRow__addRecipeBox--link"  href='/addRecipe'>Click to Add a Recipe</a>
                </div>
                
                <label className="filterRow__dateLabel">
                <select
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                    className="filterRow__dateLabel--select"
                >
                    <option value="publishDateDesc">
                    Sort Date (newest - oldest)
                    </option>
                    <option value="publishDateAsc">
                    Sort Date (oldest - newest)
                    </option>
                </select>
            </label>
      </div>
    )
}

export default FilterRow;