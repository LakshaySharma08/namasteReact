import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.js'
import RestaurantCard from './components/RestaurantCard.js';
import Body from './components/Body.js';




const Body = () => {
    return(
        <div className = "body">
            <div className='search'>Search</div>
            <div className='res-container'>
                
                {
                    resList.map(restaurant => <RestaurantCard key = {restaurant.data.id} resData = {restaurant}></RestaurantCard>)
                }
            </div>
        </div>
    )
}
const AppLayout = () => {
    return (
        <div className = 'app'>
        <Header/>
        <Body />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppLayout></AppLayout>);