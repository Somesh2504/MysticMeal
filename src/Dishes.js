import React, { useEffect, useState } from 'react';
import './App.css';
import { useParams } from 'react-router-dom';
import RecipeDetails from './RecipeDetails'; // Import the new component

function Dishes() {
    const { categoryName } = useParams();
 
    const [dishes, setDishes] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
                const data = await response.json();
                setDishes(data.meals);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };
        fetchDishes();
    }, [categoryName]);

    useEffect(() => {
        const dishCards = document.querySelectorAll('.dish-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        dishCards.forEach(card => {
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, [dishes]);

    const handleGetRecipe = (mealId) => {
        setSelectedDish(mealId);
    };

    return (
        <div className="dishes">
            <h2>Dishes in {categoryName}</h2>
            <div className="dishes-grid">
                {dishes.map((dish, index) => (
                    <div className="dish-card" key={index}>
                        <img src={dish.strMealThumb} alt={dish.strMeal} />
                        <h4>{dish.strMeal}</h4>
                        <button 
                            className="get-recipe-button" 
                            onClick={() => handleGetRecipe(dish.idMeal)}>
                            Get Recipe
                        </button>
                    </div>
                ))}
            </div>
            {selectedDish && <RecipeDetails mealId={selectedDish} />}
        </div>
    );
}

export default Dishes;
