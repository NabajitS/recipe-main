import React from 'react'
import '../styles/RecipeCard.css'
import { useNavigate } from 'react-router-dom'

function RecipeCard({ singleData }) {
    const blob = new Blob([Int8Array.from(singleData.img.data.data)], { type: singleData.img.contentType });
    const image = window.URL.createObjectURL(blob);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/recipeview/${id}`)
    }

    return (
        <div className='recipe-card' key={singleData._id} onClick={() => handleClick(singleData._id)}>
            <div className='recipe-card-img-container'>
                <img alt="Dummy scene" className='recipe-card-img' src={image} />
            </div>

            <h1>{singleData.title}</h1>

        </div>
    )
}

export default RecipeCard
