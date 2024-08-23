import { GetPlaceDetails } from '@/service/TextSearchApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({ hotel }) => {

    const [photoUrl, setPhotoUrl] = useState();
    const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName + "," + hotel?.hotelAddress
        }

        const result = await GetPlaceDetails(data).then((resp) => {
            // printing place photo reference id
            // console.log("place data >>", resp?.data?.places[0]?.photos[1]?.name);

            const sz = resp?.data?.places[0]?.photos?.length;
            console.log("Array size >>", sz);
            const num = Math.floor(Math.random() * (sz - 1));
            console.log("num>>", num);
            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", resp?.data?.places[0]?.photos[num]?.name);
            console.log(" hotel photo url >> ", PhotoUrl);
            setPhotoUrl(PhotoUrl);
        })
    }

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);


    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} target='_blank'>
            <div className=' hover:scale-110 transition-all cursor-pointer'>
                <img src={photoUrl ? photoUrl : '/hotel.jpg'} className=' rounded-md h-[200px] object-cover w-full '></img>
                <div className=' flex gap-1 flex-col my-2'>
                    <p className=' font-bold'>{hotel?.hotelName}</p>
                    <p className=' text-xs '>{hotel?.hotelAddress}</p>
                    <p className=' text-sm'>💰{hotel?.price}</p>
                    <p className=' text-sm'>⭐{hotel?.rating}</p>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard
