import { GetPlaceDetails } from '@/service/TextSearchApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTripCard = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState();
    const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userChoice?.location?.label
        }

        const result = await GetPlaceDetails(data).then((resp) => {
            // printing place photo reference id
            console.log("place data >>", resp?.data?.places[0]?.photos[1]?.name);

            const sz = resp?.data?.places[0]?.photos?.length;
            console.log("Array size >>", sz);
            const num = Math.floor(Math.random() * (sz - 1));
            console.log("num>>", num);
            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", resp?.data?.places[0]?.photos[num]?.name);
            console.log("photo url >> ", PhotoUrl);
            setPhotoUrl(PhotoUrl);
        })
    }

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);
    return (
        <Link to={"/view-trip/" + trip?.id}>
            <div className=' hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl ? photoUrl : '/hotel.jpg'} className=' h-[200px] rounded-md object-cover w-full'></img>
                <div className=' flex flex-col gap-1 items-center mt-2'>
                    <h1 className=' font-bold  text-lg'>{trip?.userChoice?.location?.label}</h1>
                    <p className=' text-gray-500 text-sm'>{trip?.userChoice?.noOfDays} Days trips with {trip?.userChoice?.budget} budget.</p>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCard
