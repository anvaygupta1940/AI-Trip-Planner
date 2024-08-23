import { Button } from '@/components/ui/button';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/data';
import { chatSession } from '@/service/AiModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
// import { ImSpinner9 } from "react-icons/im";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';



const CreateTrip = () => {
    const [place, setPlace] = useState();
    const [err, setErr] = useState("");
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (name, value) => {

        setData({
            ...data,
            [name]: value
        });
    }

    const Check = () => {

        // if user not logged in , then first logged in
        const user = localStorage.getItem("user");

        if (!user) {
            setOpenDialog(true);
            return;
        }


        if (data?.noOfDays > 5) {
            setErr("Sorry !!, we can only generate trip of atmost 5 days.");
            return;
        }

        if (!data?.location || !data?.traveler || !data?.budget) {
            setErr("Please fill all the details.");
            return;
        }

        setErr("");
        setOpenDialog(false);
        generateTrip();
    }


    // login function 
    const login = useGoogleLogin({
        onSuccess: (resp) => {
            console.log("success resp>>", resp);
            getUserInfo(resp);
        },
        onError: (error) => console.log("Error>>", error)
    });


    const getUserInfo = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: "Application/json"
            }
        }).then((resp) => {
            console.log("user info>>", resp);
            localStorage.setItem("user", JSON.stringify(resp?.data));
            setOpenDialog(false);
            window.location.reload();
            Check();
        })
    }


    const generateTrip = async () => {
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT.replace("{location}", data?.location?.label).replace("{totalDays}", data?.noOfDays).replace("{traveler}", data?.traveler).replace("{budget}", data?.budget).replace("{totalDays}", data?.noOfDays);

        console.log("final promot >> ", FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setLoading(false);
        saveTrip(result?.response?.text()); // save trip data in firebase

    }


    const saveTrip = async (tripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userChoice: data,
            userEmail: user?.email,
            tripData: JSON.parse(tripData),
            id: docId
        });
        setLoading(false);
        navigate("/view-trip/" + docId);
    }


    // useEffect(() => {
    //     console.log("data>>", data);
    // }, [data]);
    const CustomInput = ({ value, onChange, onBlur }) => (
        <input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full p-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for a location"
        />
    );

    return (
        <div className=' mt-10 p-5 md:px-10 lg:px-34 xl:px-46'>

            <h1 className=' text-4xl font-bold my-3 bg-gradient-to-r from-teal-100 to-teal-500 bg-clip-text text-transparent'>Tell us your travel preferences. <span className=' text-white'>🏖️🌄</span></h1>
            <p className=' text-lg text-gray-500'>Just provide some basic information, and our trip planner will generate a
                customized itinerary based on your preferences.
            </p>

            <div className=' mt-10 px-10 flex flex-col gap-5'>

                <div className=''>
                    <p className=' text-xl font-medium my-3'>What is destination of choice?</p>
                    <GooglePlacesAutocomplete
                        className="custom-google-places"
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            placeholder: "Search places...",
                            // className: 'border rounded-md p-2 w-full bg-red-500 ',
                            styles: {
                                input: (provided) => ({
                                    ...provided,
                                    // Optionally customize the input styles further
                                    padding: '8px',
                                    borderColor: 'gray-300',
                                    color: 'gray'
                                }),
                                container: (provided) => ({
                                    ...provided,
                                    // Optionally customize the container styles
                                    width: '100%',
                                    color: "gray"
                                }),
                            },
                            inputComponent: CustomInput, // Use the custom input component
                            place,
                            onChange: (val) => { setPlace(val); handleChange("location", val); }
                        }}
                    />
                </div>

                <div>
                    <p className=' text-xl font-medium my-3'>How many days are you planning yout Trip?</p>
                    <input type="number" placeholder='Ex. 2' className=' border w-full p-2 rounded-md outline-none'
                        onChange={(e) => handleChange("noOfDays", e.target.value)}></input>
                </div>

                <div>
                    <p className=' text-xl font-medium my-3'>What is your Budget?</p>
                    <p className=' text-red-500 -mt-2'>* The budget is exclusively allocated for dining and activities purposes.</p>
                    <div className=' my-4 md:grid grid-cols-3 gap-5'>
                        {SelectBudgetOptions.map((item, index) => {
                            return (
                                <div key={index} className={`p-4 m-2 border rounded-md flex items-center justify-center flex-col gap-2 cursor-pointer hover:border-teal-500 transition-all hover:border-2
                                 ${data.budget === item.title && "border-2 border-teal-500"}`}
                                    onClick={() => handleChange("budget", item.title)}>
                                    <h2 className=' text-4xl'>{item.icon}</h2>
                                    <h2 className=' font-bold text-xl'>{item.title}</h2>
                                    <h2 className=' font-medium text-md text-center'>{item.desc}</h2>
                                </div>
                            )
                        })}
                    </div>
                </div>


                <div>
                    <p className=' text-xl font-medium my-3'>Who do you plan on travelling with on your next adventure?</p>
                    <div className=' my-4 md:grid grid-cols-3 gap-5'>
                        {SelectTravelsList.map((item, index) => {
                            return (
                                <div key={index} className={` p-4 m-2 border rounded-md flex items-center justify-center flex-col gap-2 cursor-pointer hover:border-teal-500 transition-all hover:border-2
                                 ${data.traveler === item.people && "border-2 border-teal-500"}`}
                                    onClick={() => handleChange("traveler", item.people)}>
                                    <h2 className=' text-4xl'>{item.icon}</h2>
                                    <h2 className=' font-bold text-xl'>{item.title}</h2>
                                    <h2 className=' font-medium text-md text-center'>{item.desc}</h2>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>

            {err?.length > 0 && <p className=' text-red-500 font-bold text-lg'>{err}</p>}

            <div className=' my-10 flex justify-end'>
                <Button className="" onClick={() => Check()} disabled={loading}>
                    {
                        loading ? <LiaSpinnerSolid className=' animate-spin w-7 h-7' /> : "Generate Trip"
                    }
                </Button>
            </div>


            {/* dialog box */}
            <Dialog open={openDialog}>
                <DialogContent className=" bg-black">
                    <DialogHeader>
                        <DialogTitle><h1 className=' font-bold text-3xl'>🌏 ExploreEasy</h1></DialogTitle>
                        <DialogDescription>
                            <h2 className=' mt-5 font-bold text-lg'>Sign In With Google</h2>
                            <p className=' text-gray-600'>Sign in to the App with Google Authentication securely.</p>
                            <Button className=" w-full mt-5 flex items-center gap-3" onClick={login}>
                                <FcGoogle className=' w-7 h-7 bg-transparent' />
                                <span className=' bg-transparent'>Sign In With Google</span>
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateTrip
