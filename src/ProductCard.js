import React, { useEffect, useState } from 'react';
import './App.css';
import useApi from './Api';
import { useNavigate } from 'react-router-dom';

function ProductCards() {
    const response = useApi('https://www.themealdb.com/api/json/v1/1/categories.php');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (response && response.categories) {
            setProducts(response.categories);
        }
    }, [response]);

    useEffect(() => {
        const productCards = document.querySelectorAll('.product-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        productCards.forEach(card => {
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, [products]);

    const handleGetMoreDishes = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <div className="categories">
            <main className="main-content">
                <h1>Categories</h1>
                <div className="product-grid">
                    {products.map((product, index) => (
                        <div className="product-card" key={index}>
                            <img src={product.strCategoryThumb} alt={product.strCategory} />
                            <h4>{product.strCategory}</h4>
                            <button 
                                className="more-dishes-button" 
                                onClick={() => handleGetMoreDishes(product.strCategory)}>
                                Get More Dishes
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductCards;
