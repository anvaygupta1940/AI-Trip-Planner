import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/TextSearchApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const PlacesToVisitCard = ({ place }) => {
  // 'https://www.google.com/maps/search/?api=1&query=' + place?.placeName + "," + place?.geoCoordinates

  const [photoUrl, setPhotoUrl] = useState();
  const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName
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
    place && GetPlacePhoto();
  }, [place]);


  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.geoCoordinates}&query_place=${place?.placeName}`} target='_blank'>

      <div className=' border rounded-md hover:scale-105 transition-all cursor-pointer p-3'>

        <div className='flex gap-5 items-center'>
          <img src={photoUrl ? photoUrl : '/hotel.jpg'} className=' w-[130px] h-[130px] rounded-md object-cover'></img>
          <div className=' flex flex-col gap-2'>
            <p className=' font-bold text-lg'>{place?.placeName}</p>
            <p className=' text-sm  text-gray-400'>{place?.placeDetails}</p>
            <p><span className=' text-gray-500'>⏱️Time to Travel :</span> <span className=' font-bold'>{place?.timeToTravel}</span></p>

          </div>
        </div>

        <div className=' flex justify-between items-center mt-3'>
          <p className=' font-bold'><span className=' text-gray-500 font-bold'>Ticket Price :</span> {place?.ticketPricing}</p>
          <Button className="ml-auto  text-xl"><FaMapLocationDot /></Button>
        </div>
      </div>
    </Link>
  )
}

export default PlacesToVisitCard
