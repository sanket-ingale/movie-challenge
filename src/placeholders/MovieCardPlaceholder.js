import './MovieCardPlaceholder.css'
import React from 'react';

export default function MovieCard(props){
    return (
        <div className="movie--card--placeholder">
            <div className='movie--img--placeholder'></div>
            <div className='movie--info--placeholder'>
                <div className='movie--title--placeholder'></div>
                <div className='movie--subtitle--placeholder'></div>
            </div>
        </div>
    );
}

