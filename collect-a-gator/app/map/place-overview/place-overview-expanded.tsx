import './place-overview.css';
import dynamic from "next/dynamic";
import {APIProvider} from '@vis.gl/react-google-maps';


    const PlaceOverview = dynamic(
        () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlaceOverview),
        { ssr: false }
    );
    const PlaceDirectionsButton = dynamic(
        () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlaceDirectionsButton),
        { ssr: false }
    );

    function geocodeLatLng(
      geocoder: google.maps.Geocoder,
      latitude: number,
      longitude: number
    ): string {

      const latlng = {
        lat: latitude,
        lng: longitude,
      };
    
      geocoder
        .geocode({ location: latlng })
        .then((response) => {
          if (response.results[0]) {
            return((response.results[0].place_id));
          } else {
            
            window.alert("No results found");
          }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
        return("No results found");
    }
    

export const PlaceOverviewExpanded= 
({ latitude, longitude }: 
  { latitude: number; longitude: number }) => {

  const latlng = {
    lat: latitude,
    lng: longitude,
  };
  const geocoder = new google.maps.Geocoder();
  var foundPlaceID: string = geocodeLatLng(geocoder, latitude, longitude);
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  
  return (
    <div className="details-container">

      <APIProvider apiKey={googleApiKey}>
 
      <div> YOOOOOOOOOO {foundPlaceID} </div>
      <PlaceOverview
                  size="large"
                  //hardcode place id as a string
                  place={foundPlaceID}
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