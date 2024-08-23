import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/create-trip",
    element: <CreateTrip></CreateTrip>
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip></ViewTrip>
  },
  {
    path: "/my-trips",
    element: <MyTrips></MyTrips>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header></Header>
      <RouterProvider router={router}>
      </RouterProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
