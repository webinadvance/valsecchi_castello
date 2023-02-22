import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {useState} from "react";
export function Map() {

    const [center, setCenter] = useState({ lat: 40.712776, lng: -74.005974 }); // Set initial center location to New York City
    const apiKey = 'AIzaSyDbECZClk8FuVKitiZYsCN7VS-BFWEjjPA';
    const randomizeLocation = () => {
        // Function to generate a random location within a bounding box around the current center location
        const bounds = new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(center.lat - 0.5, center.lng - 0.5),
            new window.google.maps.LatLng(center.lat + 0.5, center.lng + 0.5)
        );
        const latLng = new window.google.maps.LatLng(
            bounds.getSouthWest().lat() + Math.random() * (bounds.getNorthEast().lat() - bounds.getSouthWest().lat()),
            bounds.getSouthWest().lng() + Math.random() * (bounds.getNorthEast().lng() - bounds.getSouthWest().lng())
        );
        setCenter({ lat: latLng.lat(), lng: latLng.lng() });
    };
    
    return (
        <section className="bg-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Location</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Where to Find Us
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Lorem ipsum dolor sit amet consect adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                    </p>
                </div>
                <div className="mt-10">
                    <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                            center={center}
                            zoom={12}
                            mapContainerClassName="w-full h-96 rounded-md shadow-md"
                        >
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        className="py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={randomizeLocation}
                    >
                        Randomize Location
                    </button>
                </div>
            </div>
        </section>
    );
}