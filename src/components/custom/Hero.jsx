import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className=' flex flex-col items-center px-8 md:px-32 lg:px-64 gap-9 p-4'>
            <h1 className=' bg-gradient-to-b from-teal-100 to-teal-800 bg-clip-text text-transparent text-[50px] text-center font-bold'>
                Discover Your Next Adventure with AI:
                Personalized Itineraries at Your Fingertips
            </h1>
            <p className=' text-center text-gray-500 text-lg'>
                Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>
            <Link to={"/create-trip"}>
                <Button className=" bg-gradient-to-b from-teal-500 to-teal-800 w-[250px]">Get Started</Button>
            </Link>



        </div>
    )
}

export default Hero
