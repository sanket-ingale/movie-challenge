import './MovieModal.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

export default function MovieModal(props) {
    return (
        <Modal {...props} centered fullscreen={true}>
            <Modal.Body>
                <Container>
                    <div className="movie--modal">
                        <img
                            className='movie--img--modal'
                            src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src=require("../../images/movie-poster-placeholder.png");
                            }}
                            alt="Movie"
                        />
                        <div className='movie--info--modal'>
                            <span className='movie--title'>{props.original_title} ({props.release_date?.split('-')[0]})</span>
                            <div className='movie--cat--box'>
                                {props.genres?.map(item => <div className='movie--cat'>{`${item.name}|`}</div>)}
                            </div>
                            <span className='movie--overview'>{props.overview}</span>
                            <div className='p--button close' onClick={props.onHide}>Close</div>
                        </div>
                    </div>
                </Container>
            </Modal.Body>
        </Modal>
    );
}


