import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';



const Header = () => {
    const [openDialog, setOpenDialog] = useState();

    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("user >>", JSON.parse(user));


    // login function 
    const login = useGoogleLogin({
        onSuccess: (resp) => {
            // console.log("success resp>>", resp);
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
            // console.log("user info>>", resp);
            localStorage.setItem("user", JSON.stringify(resp?.data));
            setOpenDialog(false);
        })
    }

    useEffect(() => {
        // console.log("user >> ", user);  
    })
    return (
        <div className=' w-full shadow-sm p-3 border-gray-500 border-b flex justify-between items-center px-5'>
            <a href='/'>
                <p className=' font-bold text-xl'><span className=' animate-pulse'>🌏</span> ExploreEasy</p>
            </a>

            <div>
                {
                    user ?
                        <div className=' flex gap-2 items-center'>

                            <a href='/my-trips'>
                                <Button className=" rounded-full">My Trips</Button>
                            </a>
                            <a href='/create-trip'>
                                <Button className=" rounded-full">+ Create Trip</Button>
                            </a>

                            <Popover>
                                <PopoverTrigger>
                                    <img src={user?.picture} className=' h-[35px] w-[35px] rounded-full'></img>
                                </PopoverTrigger>
                                <PopoverContent className="w-[150px] mt-2 p-2 mr-4">
                                    <h2 className=' bg-transparent font-bold text-lg text-center cursor-pointer'
                                        onClick={() => {
                                            googleLogout();
                                            localStorage.clear();
                                            window.location.reload();
                                        }}>LogOut</h2>
                                </PopoverContent>
                            </Popover>

                        </div> :
                        <Button onClick={() => setOpenDialog(true)}>SignIn</Button>
                }

            </div>

            {/* dialog box */}
            <Dialog open={openDialog}>
                <DialogContent className="bg-black">
                    <DialogHeader>
                        <DialogTitle><h1 className=' font-bold text-3xl'>🌏 ExploreEasy</h1></DialogTitle>
                        <DialogDescription>
                            <h2 className=' mt-5 font-bold text-lg'>Sign In With Google</h2>
                            <p className=' text-gray-600'>Sign in to the App with Google Authentication securely.</p>
                            <Button className=" w-full mt-5 flex items-center gap-3" onClick={login}>
                                <FcGoogle className=' w-7 h-7 bg-transparent' />
                                <span className="bg-transparent">Sign In With Google</span>
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Header
