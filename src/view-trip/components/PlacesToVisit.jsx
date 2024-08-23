import React from 'react'
import PlacesToVisitCard from './PlacesToVisitCard';

const PlacesToVisit = ({ trip }) => {

    console.log("itinerary >>", trip?.tripData?.itinerary);
    return (
        <div className=' mt-5'>
            <h2 className=' text-2xl font-bold my-3'>Places To Visit</h2>

            <div className=''>
                {
                    trip?.tripData?.itinerary?.map((item, index) => {
                        return (
                            <div className=' my-3' key={index}>
                                <h1 className=' text-xl font-bold underline'>Day {item?.day}</h1>

                                <div className=' grid md:grid-cols-2 gap-5 mt-3'>
                                    {item?.plan?.map((place, index) => {
                                        return (
                                            <PlacesToVisitCard place={place} key={index}></PlacesToVisitCard>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PlacesToVisit
