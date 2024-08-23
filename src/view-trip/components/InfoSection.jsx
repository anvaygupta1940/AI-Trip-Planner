import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/TextSearchApi';
import React, { useEffect, useState } from 'react'
import { FaShare } from "react-icons/fa";


const InfoSection = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState();
    const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userChoice?.location?.label
        }

        const result = await GetPlaceDetails(data).then((resp) => {
            // printing place photo reference id
            // console.log("place data >>", resp?.data?.places[0]?.photos[1]?.name);

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
        <div>
            <img src={photoUrl ? photoUrl : '/hotel.jpg'} alt='destination photo' className=' h-[350px] w-full rounded-md object-cover'></img>

            <div className=' my-5 flex items-center justify-between'>
                <div>
                    <h2 className=' text-2xl font-bold'>{trip?.userChoice?.location?.label}</h2>
                    <div className=' flex gap-5 items-center mt-2 flex-wrap'>
                        <p className=' border border-white rounded-md p-1 px-3 cursor-pointer font-bold'>📅 {trip?.userChoice?.noOfDays} Day</p>
                        <p className=' border border-white rounded-md p-1 px-3 cursor-pointer font-bold'>💰 {trip?.userChoice?.budget}</p>
                        <p className=' border border-white rounded-md p-1 px-3 cursor-pointer font-bold'>🥂 No of Traveler: {trip?.userChoice?.traveler}</p>
                    </div>
                </div>
                <Button className=" bg-black border-white border text-xl mb-auto"><FaShare /></Button>
            </div>
        </div>
    )
}

export default InfoSection
