import { db } from '@/service/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCard from './components/UserTripCard';

const MyTrips = () => {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/");
            return;
        }
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        setTrips([]);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setTrips((prev) => [
                ...prev,
                doc.data()
            ])
        });
    }


    useEffect(() => {
        getUserTrips();
    }, []);


    return (
        <div className=' p-5 md:px-10 lg:px-34 xl:px-46'>

            <h1 className=' font-bold text-4xl text-center'>My Trips</h1>
            <div className=' grid grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
                {trips?.map((trip, index) => {
                    return (
                        <UserTripCard key={index} trip={trip}></UserTripCard>
                    )
                })}
            </div>
        </div>
    )
}

export default MyTrips
