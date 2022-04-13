import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilterCategory } from "../api";
import { Loader } from "../Components/Loader";
import { MealList } from "../Components/MealList";

export default function Category() {
    const {name} = useParams()
    const [meals, setMeals] = useState([])
    useEffect(() => {
        getFilterCategory(name).then(data => setMeals(data.meals))
    }, [name]);
    return (
      <>
        {!meals.length ? <Loader/> : <MealList meals={meals} />}
      </>          
    )
}