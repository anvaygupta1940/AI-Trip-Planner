import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const ViewTrip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState();

    const getTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("trip data:", docSnap.data());
            setTrip(docSnap.data());

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            alert("No Trip Found !!");
        }
    }

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    return (
        <div className=' p-5 md:px-10 lg:px-34 xl:px-46'>

            {/* information section  */}
            <InfoSection trip={trip}></InfoSection>


            {/* hotel section */}
            <Hotels trip={trip}></Hotels>


            {/* daily plan section */}
            <PlacesToVisit trip={trip}></PlacesToVisit>

            {/* footer */}
            <Footer></Footer>

        </div>
    )
}

export default ViewTrip
