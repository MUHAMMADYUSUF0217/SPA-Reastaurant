import { useEffect, useState } from "react";
import {useParams, useHistory } from "react-router-dom";
import {getMealById } from '../api'; 
import { Loader } from "../Components/Loader";

export default function Recipe() {
    const [recipe, setRecipe] = useState([]);
    const {id} = useParams();
    const {goBack} = useHistory();
    const [showRecipe, setShowRecipe] = useState(false)
    useEffect(() => {
        getMealById(id).then(data => setRecipe(data.meals[0]))
    }, []);
    const handleRecipeShow = () => {
        setShowRecipe(!showRecipe)
      }
    return(
        <>
        <button className="btn" onClick={goBack} >Go Back</button>
        {!recipe.idMeal ? <Loader/> : (
            <div className="recipe">
               <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
               <h1>{recipe.strMeal}</h1> 
               <h5> <b>Category:</b> {recipe.strCategory} </h5>
               {recipe.strArea ? <h6><b>Area:</b> {recipe.strArea}</h6> : null }
               <p>{recipe.strInstructions}</p>
               <button onClick={handleRecipeShow} className="btn" >Show Recipe</button>
               {showRecipe ? (
            <table className="centred">
              <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
              </thead>
              <tbody>
              {Object.keys(recipe).map(key => {
                if (key.includes('Ingredient') && recipe[key]) {
                  return (
                    <tr>
                      <td>{recipe[key]}</td>
                      <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                    </tr>
                  )
                }
              })}
              </tbody>
            </table>
          ) : null}
               {recipe.strYoutube ? (
                   <div className="row">
                    <h5>Video Recipe</h5>
                    <iframe src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`} allowFullScreen title={id} frameBorder="0" />
                   </div>
               ) : null }
            </div>
        )}
        </>
    )
}