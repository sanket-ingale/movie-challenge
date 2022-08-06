import './MovieCard.css'
import React, { useState } from 'react';
import MovieModal from './MovieModal';

export default function MovieCard(props){
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
        <div className="movie--card" onClick={() => setModalShow(true)}>
            <img
                className='movie--img'
                src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src=require("../../images/movie-poster-placeholder.png");
                }}
                alt="Movie"
            />
            <div className='movie--info'>
                <span className='movie--title'>{props.original_title} ({props.release_date?.split('-')[0]})</span>
                {/* <div className='movie--cat--box'>
                    {props.genres?.map(item => <div className='movie--cat'>{`${item.name}|`}</div>)}
                </div> */}
            </div>
        </div>
        <MovieModal 
            show={modalShow} 
            onHide={() => setModalShow(false)} 
            key={props.id}
            {...props}
        />
        </>
    );
}

