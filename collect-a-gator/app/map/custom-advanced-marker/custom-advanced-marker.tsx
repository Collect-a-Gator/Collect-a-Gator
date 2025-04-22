import { useState } from 'react';
import {AdvancedMarker} from '@vis.gl/react-google-maps';
import classNames from 'classnames';
import {PlaceDetails} from '../types';
import { StaticImageData } from "next/image";

import {PlaceOverviewExpanded} from '../place-overview/place-overview-expanded';
import ufIcon from "./category-icons/book-heart.svg";
import cafeIcon from "./category-icons/coffee.svg";
import cultureIcon from "./category-icons/palette.svg";
import parksIcon from "./category-icons/trees.svg";
import restaurantIcon from "./category-icons/utensils.svg";



import './custom-advanced-marker.css'


export const CustomAdvancedMarker = 
({ latitude, longitude, cat, tit, img, placeid }: 
  { latitude: number; longitude: number, cat: string, tit: string, img: StaticImageData, placeid: string }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState<PlaceDetails | null>(null);

  const position = {
    //marston
    lat: latitude, 
    lng: longitude
  };
  const category = cat;
  const title = tit;
  const image = img;

//  CUSTOM PIN !!!
  const renderCustomPin = () => {

    const [selectedMarker, setSelectedMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    // const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; image: any } | null>(null);

    let imageSrc;

    if (cat == "restaurant") {
      imageSrc = restaurantIcon.src;
    } else if (cat == "UF") {
      imageSrc = ufIcon.src;
    } else if (cat == "cafe"){
      imageSrc = cafeIcon.src;
    } else if (cat == "culture"){
      imageSrc = cultureIcon.src;
    } else if (cat == "nature"){
      imageSrc = parksIcon.src;
    }
    
    return (
      <>
        
        <div className="custom-pin" style={{ backgroundColor: cat === "restaurant" ? "#e6ba1e" :
                                              cat === "UF"         ? "#ff7f36" :
                                              cat === "nature"     ? "#247824" :
                                              cat === "culture"    ? "#8866d1" :
                                              cat === "cafe"       ? "#855b31" :
                                                                    "darkgreen" }}>


          <button className="close-button" style={{ color: cat === "restaurant" ? "#e6ba1e" :
                                                            cat === "UF"         ? "#ff7f36" :
                                                            cat === "nature"     ? "#247824" :
                                                            cat === "culture"    ? "#8866d1" :
                                                            cat === "cafe"       ? "#855b31" :
                                                                                  "darkgreen" }}>
            <span className="material-symbols-outlined"> close </span>
          </button>

          <div className="image-container">
            {/* <RealEstateGallery
              isExtended={clicked}
            /> */}
            <span className="icon" style={{ backgroundColor: cat === "restaurant" ? "#e6ba1e" :
                                              cat === "UF"         ? "#ff7f36" :
                                              cat === "nature"     ? "#247824" :
                                              cat === "culture"    ? "#8866d1" :
                                              cat === "cafe"       ? "#855b31" :
                                                                    "darkgreen" }}>
            <img
                src={imageSrc}
              />
            </span>

            <span className="collectible">
              <img
                src={image.src}
                alt="Marker Gator"
                style={{ width: "100px", height: "135px" }}
              />
            </span>
          </div>           

          {/*Place Overview only when the marker is clicked */}
          {clicked && (
            <div className="details-container">
              <div className="details-container">
                <PlaceOverviewExpanded 
                latitude={position.lat}
                longitude={position.lng}
                placeId={placeid}/> 
                </div>
            </div>
          )}
          
    
        </div>

        <div className="tip"  style={{ color: cat === "restaurant" ? "#e6ba1e" :
                                              cat === "UF"         ? "#ff7f36" :
                                              cat === "nature"     ? "#247824" :
                                              cat === "culture"    ? "#8866d1" :
                                              cat === "cafe"       ? "#855b31" :
                                                                    "darkgreen" }}
        />
      </>
      
    );
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        // title={'AdvancedMarker with custom html content.'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classNames('real-estate-marker', {clicked, hovered})}
        onClick={() => {
          setClicked(!clicked);
        }}>
        {renderCustomPin()}
      </AdvancedMarker>
    </>
  );
};