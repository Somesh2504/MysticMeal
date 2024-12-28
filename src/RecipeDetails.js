import React, { useEffect, useState } from 'react';
import './App.css';
import cross from './x-mark.png'
function RecipeDetails({ mealId }) {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                const data = await response.json();
                setRecipe(data.meals[0]);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [mealId]);

    if (!recipe) {
        return <div>Loading...</div>;
    }
   function handlegoback(){
    setRecipe(null);
   }
    return (
        <>
        <div  onClick={()=>{handlegoback()}}><img src={cross} className='goback'></img></div>
        <div className="recipe-details">
            <h2 className='DishName'>{recipe.strMeal}</h2>
            <div className="recipe-image">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div>
            <h4>Ingredients:</h4>
            <ul> 
                {   Array.from({ length: 20 }, (_, i) => i + 1).map(i =>
                     ( recipe[`strIngredient${i}`] &&
                      <li key={i}>{recipe[`strIngredient${i}`]} - {recipe[`strMeasure${i}`]}</li>
                     ))
                } 
            </ul>
            </div>
            </div>
            <h4  className='in'>Instructions:</h4>
            <p  className='instruction' >{recipe.strInstructions}</p>
        </div>
        </>
    );
}

export default RecipeDetails;
