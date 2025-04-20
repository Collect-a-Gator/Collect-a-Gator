import './place-overview.css';
import dynamic from "next/dynamic";
import {APIProvider, useMapsLibrary} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';


    const PlaceOverview = dynamic(
        () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlaceOverview),
        { ssr: false }
    );
    const PlaceDirectionsButton = dynamic(
        () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlaceDirectionsButton),
        { ssr: false }
    );

    function ReverseGeocoder(lat: number, lng: number) {
      const [placeId, setPlaceId] = useState<string | null>(null);
      const geocodingLib = useMapsLibrary('geocoding');
    
      useEffect(() => {
        if (!geocodingLib) return;
    
        const geocoder = new google.maps.Geocoder();
        const latLng = { lat, lng };
    
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            setPlaceId(results[0].place_id);
          } else {
            console.error('Geocoder failed:', status);
          }
        });
      }, [geocodingLib, lat, lng]);
    
      return placeId;
    }

    function usePlaceId(lat: number, lng: number) : string {

      const placeIdResult: string | null = ReverseGeocoder(lat, lng);

      if (placeIdResult !== null) {
        return placeIdResult;
      }

      return "good luck";
    }

export const PlaceOverviewExpanded= 
({ latitude, longitude }: 
  { latitude: number; longitude: number }) => {


  const geocoder = new google.maps.Geocoder();
  const placeId: string = usePlaceId(latitude, longitude);

  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  
  return (
    <div className="details-container">

      <APIProvider apiKey={googleApiKey}>

       <PlaceOverview
                  size="large"
                  //hardcode place id as a string
                  place={placeId}
                  googleLogoAlreadyDisplayed
                >
                  <div slot="action" className="SlotDiv">
                    <PlaceDirectionsButton slot="action" variant="filled">
                      Directions
                    </PlaceDirectionsButton>
                  </div>
        </PlaceOverview>

        </APIProvider>
    </div>
  );
};