import RestaurantCard from "./RestaurantCard";
// import Search from "./Search";
import { useState, useEffect } from "react";
import Shimmer from './Shimmer.js';
const Body = () => {
    //local State Variable - Super Powerful Variable

    const [listOfRestaurants, setListOfRestaurant] = useState([]);
    const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState([]);

    const [searchText, setSearchText] = useState('');
    

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async() => {
        const data = await fetch('https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5354618&lng=77.2997735&is-seo-homepage-enabled=true');
        const json = await data.json();
        // console.log(json);
        setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        //this is optional chaining
    }

    
    //conditional rendering
    // if(listOfRestaurants.length === 0){
    //     return <Shimmer></Shimmer>
    // }
    return listOfRestaurants === 0 ? <Shimmer></Shimmer> : (
        <div className = "body">
            <div className='filter'>
                <div className="search">
                    <input type="text" className="search-box" value = {searchText}
                        onChange={ (e  ) =>  {
                            setSearchText(e.target.value);
                        }}
                    />
                        <button onClick={ 
                            () => {
                                const filteredRestaurant = listOfRestaurants.filter(
                                    (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                                );
                                setFilteredListOfRestaurants(filteredRestaurant);

                                
                            }
                        }

                        >
                        Search
                        </button>
                </div>
                <button className = 'filter-btn' 
                onClick = {() => {
                        const filteredList = listOfRestaurants.filter(
                            (res) => res.info.avgRating > 4
                        );
                        setListOfRestaurant(filteredList);
                    }}
                > 
                    Top Rated Restaurants
                </button>
            </div>
            <div className='res-container'>
                
                {
                    filteredListOfRestaurants.map(restaurant => <RestaurantCard key = {restaurant.info.id} resData = {restaurant}></RestaurantCard>)
                }
            </div>
        </div>
    )
}

export default Body;