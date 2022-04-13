import { Link } from "react-router-dom";
export function MealItem(props) {
    const {strMeal, strMealThumb, idMeal} = props;
    return(
        <div className="card">
        <div className="card-image">
          <img src={strMealThumb} alt={strMeal}/>
        </div>
        <div className="card-content">
        <span className="card-title"><b>{strMeal}</b></span>
        </div>
        <div className="card-action">
        </div>
        <div className="card-action">
            <Link to={`/meal/${idMeal}`} className="btn">
                Watch Recipe
            </Link>
        </div>
      </div>
    )
}