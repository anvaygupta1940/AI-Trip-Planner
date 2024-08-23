import React from 'react'
import { Link } from 'react-router-dom'
import HotelCard from './HotelCard'

const Hotels = ({ trip }) => {
    return (
        <div>
            <h2 className=' text-2xl font-bold my-3'>Hotels Recommendation</h2>

            <div className=' grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => {
                    return (
                        <HotelCard key={index} hotel={hotel}></HotelCard>
                    )
                })}
            </div>
        </div>
    )
}

export default Hotels
