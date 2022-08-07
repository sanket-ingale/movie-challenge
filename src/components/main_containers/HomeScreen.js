import './HomeScreen.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, {useState, useEffect} from "react";
import Carousel from 'react-bootstrap/Carousel';
import MovieCard from '../sub_containers/MovieCard';
import MovieModal from '../sub_containers/MovieModal';
import MovieCardPlaceholder from '../../placeholders/MovieCardPlaceholder'

export default function HomeScreen() {

    const [modalShow, setModalShow] = useState(false);
    const [movieTrendingData, setMovieTrendingData] = useState({});
    const [movieSearchData, setMovieSearchData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [backBtnFlag, setBackBtnFlag] = useState(false);
    const [searchBtnFlag, setSearchBtnFlag] = useState(false);
    const [carouselItem, setCarouselItem] = useState({});
    const urlTrending = 'https://api.themoviedb.org/3/trending/movie/day?api_key=e4c0763bea0e844e73ba3886a1b8a175';
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=e4c0763bea0e844e73ba3886a1b8a175&query=${searchQuery}&page=1&include_adult=${false}`;

    const getMovies = async () => {
        setMovieTrendingData(await (await fetch(urlTrending)).json());
        // console.log(data);
    }

    const onSearchChange = e => {
        setSearchQuery(e.target.value);
        setSearchBtnFlag(true);
    }

    const enterPress = (event) => event.key === 'Enter' && getSearchMovies();
    
    const searchClick = () => getSearchMovies();
    
    const backPress = () => { 
        setSearchBtnFlag(false);
        setBackBtnFlag(false);   
        setSearchQuery('');
        setMovieSearchData([]);
    }
    
    const getSearchMovies = async () => {
        setMovieSearchData(await (await fetch(searchURL)).json());
        setBackBtnFlag(true);
    }

    const handleCarouselEvent = (item) => {
        setCarouselItem(item);
        setModalShow(true);
    }
    
    const movieTrendingCards = movieTrendingData.results?.slice(3, 19).map(item => <MovieCard key={item.id} {...item}/>);

    const movieSearchCards = movieSearchData.results?.map(item => <MovieCard key={item.id} {...item}/>);

    useEffect(() => {
        getMovies();
        setTimeout(()=>{
            document.getElementById('card-placeholder').style.display = 'none';
        }, 2000);
    },[backBtnFlag]);

    // console.log(carouselArray[6].backDrop);
    // console.log(movieTrendingData);
    // console.log(movieTrendingData.results[5]?.backdrop_path);

    return (
        <div className="home--screen">
            <div className="search--bar--container">
                {backBtnFlag && <div className="back--btn" onClick={backPress}>gh</div>}
                <input 
                    type="search" 
                    placeholder="Search movies" 
                    className='search--bar' 
                    value={searchQuery} 
                    onChange={onSearchChange}
                    onKeyPress={enterPress}
                />
                {searchBtnFlag && <div type="button" className="search--btn" onClick={searchClick}></div>}               
            </div>
            {movieSearchData.total_results === 0 && backBtnFlag && (
                <span className="error-msg">
                    Sorry, no such movie found :(
                </span>
            )}
            {backBtnFlag ?
            <div className='card--container'>
                {movieSearchCards}
            </div>
            : 
            <div className='home--sub--screen'>
                <Carousel className='homescreen--carousel'>
                    {movieTrendingData.results?.slice(0, 3).map( item => {
                        return (
                            <Carousel.Item key={item.id}>
                                <img
                                    className="d-block w-100 carousal--img"
                                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                                    alt="First slide"
                                />
                                <p className='carousel--title' onClick={() => handleCarouselEvent(item)}>{item.original_title}</p>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
                <div className='card--container'id='card-placeholder'>
                    {[0,0,0,0,0].map(i => <MovieCardPlaceholder/>)}
                </div>
                <div className='card--container'>
                    {movieTrendingCards}
                </div>
            </div>
            }
            <MovieModal 
                show={modalShow} 
                onHide={() => setModalShow(false)} 
                key={carouselItem.id}
                {...carouselItem}
            />
        </div>
    );
}