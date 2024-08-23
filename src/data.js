export const SelectTravelsList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole travels in exploration",
        icon: "🛩️",
        people: "1"
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Two traveles in tandem",
        icon: "🥂",
        people: "2"
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of fun loving peoples",
        icon: "🏡",
        people: "3 to 5 People"
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekers",
        icon: "🎉",
        people: "5 to 10 People"
    }
]



export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💸"
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keeping cost on the average side",
        icon: "💰"
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Don't worry about cost",
        icon: "🤑"
    }
]


export const AI_PROMPT = "Generate Travel Plan for Location : {location} , for {totalDays} days for {traveler} with a {budget} Budget, give me 10 Hotels options list with Hotel Name, Hotel address , price , hotel image url, geo coordinates , rating, descriptions and suggest itinerary list in array  with placeName, place details ,place image url , geo coordinates , ticket pricing , time travel each of the location for {totalDays} days with each day plan from morning to night and with best time to visit each place in json format."