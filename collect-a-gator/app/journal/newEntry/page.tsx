'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Card, Grid, Button, Box, Typography } from '@mui/material';

import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useRef, useState } from 'react';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const restaurantSet = new Set(['ChIJIZBCHZ6j6IgRcKC_Bqug8AQ', 'ChIJSzMhnySj6IgRC8Io5CIREWY', 'ChIJcX6NVGCj6IgRdlAyMcGLNec', 'ChIJ4x5rF9Kj6IgR2TfWxa9yYJQ', 'ChIJh0SCBIqj6IgREMeJkYwseg4', 'ChIJabeoVaGj6IgRW-3TgvRlGYg', 'ChIJxav7fgWj6IgR-g8xGWTUUkw', 'ChIJC2p8EbKj6IgRKUUx8t8-8L0', 'ChIJ0eY99h2k6IgRILAjo-PIX0U','ChIJ684yQIKj6IgRE3Q5qi8nVIE', 'ChIJMe3peL6j6IgRUTeILkOipRI']); //11 total
const cafeSet = new Set(['ChIJU66uvIWj6IgR_T3rKgn_tGY', 'ChIJgVFTjXij6IgRx274YeWh8aU', 'ChIJTbgFM42j6IgR_PZ-IHnxMb8', 'ChIJ-XytOIKj6IgRro9gmn8G7ok', 'ChIJkVxb3Uqj6IgRZzneANZ2dGA', 'ChIJSY-p-I2j6IgR32n1JzbU0vU', 'ChIJi5XRv-6j6IgRPGVVy8qc4xQ', 'ChIJf7451LKj6IgRt4Qk4-EwdAk', 'ChIJ33rkOm6k6IgR-wIFhi48Ahs', 'ChIJ0x1ZLACj6IgRHW3Eyr2MmyY', 'ChIJj11Iydij6IgRSdi5XJWl3Ck']); //11 total
const natureSet = new Set(['ChIJ_aHU15Kj6IgROdcp7P7ZODI', 'ChIJKW06x2Gj6IgR-iSbJWm73Ko', 'ChIJOcvRfCaf6IgRBNn_MkPaShI', 'ChIJk-Ena8yj6IgRd4uM_AVWZsQ', 'ChIJrcWqzlKj6IgRRwRnMA9WvEo', 'ChIJbZXnxrGj6IgRPxxOq-v7gDY', 'ChIJG4zJ_T6j6IgRgMdxRPpp5-M']); //7 total
const ufSet = new Set(['ChIJd71aR52j6IgRHko1BL93Tag', 'ChIJTxlXV4Kj6IgRSJ-tmdH0chA', 'ChIJz_GUjsyY6IgREFi9ssJFKxU', 'ChIJVzpbxXmj6IgRoj4rV3XQcPg', 'ChIJDecmVXaj6IgRYG4b1yi5zgo', 'ChIJfcc954Kj6IgRo01stEhIbT4', 'ChIJF3ENmG2j6IgRzlCRE5ou3Ek', 'ChIJn18R4Guj6IgRuMZobqHdvy8', 'ChIJOYPqxoaj6IgRoBCY9Zz4x7M', 'ChIJn5WOFnij6IgR3MvHCwrOpEA', 'ChIJe816_j-j6IgR3taUoqekpuw' ]); //11 total
const artSet = new Set(['ChIJcRYsM_Oj6IgRWocTBP6Idsg', 'ChIJwcIl25Kj6IgRmhvuFDY2jig', 'ChIJpRSBsY2j6IgRugXoTUGeRIc', 'ChIJgWr2k4yj6IgROMScZaum5k0', 'ChIJXzqBxxSj6IgRU2IaUzNKHgc', 'ChIJV1saDj-j6IgRCzNOsYSBymw', 'ChIJMZ0YT62k6IgRnOeuCVJmzqg', 'ChIJ9RbCvZWj6IgRn7PysJWYZvA', 'ChIJqdK3FfWj6IgRWutG7CpuNy4', 'ChIJkwUtSe6j6IgRvVPNiMab8HY', 'ChIJ05pRW2yj6IgRjcpeXaq3yA8', 'ChIJ9QUvBoaj6IgR1PX_eh9mF5M', 'ChIJs1C1o5Kj6IgRpOftpLlXVxE', 'ChIJCxgEbpOj6IgRX2GBPVg5Xik', 'ChIJTfruNo2j6IgRVxCVkN7eI0k']); //15 total

export default function EntryPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [date, setDate] = React.useState<Dayjs>(dayjs());
    const [title, setTitle] = React.useState<null | string>();
    const [content, setContent] = React.useState<null | string>();
    const [trigger, setTrigger] = React.useState<boolean>(false);
    //maps api
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);
    //User information
    const { user, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        setDate(dayjs()); 
    }, []);

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) setDate(newDate);
    };

    const submitEntry = () => {
        if (title && content) {
            setTrigger(!trigger);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!e.currentTarget.checkValidity()) {
        e.stopPropagation();
        return;
      }
      submitEntry();
      goToEntry();
    };

    const isFirstRender = useRef(true);
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        else {
          
            const fetchData = async () => {
              const response = await fetch(`http://localhost:5050/api/entries`, {
                  method: "POST",
                  body: JSON.stringify({
                      title: title,
                      date: date,
                      content: content,
                      token: user?.id, 
                      location: selectedPlace?.name || "Unknown location", 
                      latitude: selectedPlace?.geometry?.location?.lat() || 0,
                      longitude: selectedPlace?.geometry?.location?.lng() || 0,
                      placeID: selectedPlace?.place_id,
                  }),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8"
                  }
                })
                .then(response => response.json())
                .catch(error => console.error(error));
              };
              fetchData();

              const getUserData = async () => {
                try {
                    const response = await fetch(`http://localhost:5050/api/users/` + user?.id, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return await response.json();
                } catch (error) {
                    console.error("Error fetching user counters:", error);
                    return null;
                }
            };

            const adjustCounters = async () => {
              const userData = await getUserData();
              if (!userData) return;
              const counters = userData.counters || {};

              if (selectedPlace?.place_id) {
              if (ufSet.has(selectedPlace.place_id)) {
                counters.uf = (counters.uf || 0) + 1;
             //   console.log("UF Counter: ", counters.uf);
              } else if (restaurantSet.has(selectedPlace.place_id)) {
                counters.restaurant = (counters.restaurant || 0) + 1;
             //   console.log("Restaurant Counter: ", counters.restaurant);
              } else if (cafeSet.has(selectedPlace.place_id)) {
                counters.cafe = (counters.cafe || 0) + 1;
             //   console.log("Cafe Counter: ", counters.cafe);
              } else if (natureSet.has(selectedPlace.place_id)) {
                counters.nature = (counters.nature || 0) + 1;
              //  console.log("Nature Counter: ", counters.nature);
              } else if (artSet.has(selectedPlace.place_id)) {
                counters.art = (counters.art || 0) + 1;
              //  console.log("Art Counter: ", counters.art);
              } else {
                counters.miscellaneous = (counters.miscellaneous || 0) + 1;
                // console.log("Place ID not found in any set.");
              }
              }

              try {
              console.log("Updated counters before PUT request:", counters);
              await fetch(`http://localhost:5050/api/users/` + user?.id, {
                method: "PUT",
                body: JSON.stringify({
                counters: {
                  uf: counters.uf,
                  restaurant: counters.restaurant,
                  cafe: counters.cafe,
                  nature: counters.nature,
                  art: counters.art,
                  miscellaneous: counters.miscellaneous
                }
                }),
                headers: {
                "Content-Type": "application/json; charset=UTF-8"
                }
              });
              console.log("Counters updated successfully");
              } catch (error) {
              console.error("Error updating counters:", error);
              }
            };

            const adjustBooleans = async () => {
                const userData = await getUserData();
                if (!userData) return;
                const booleans = userData.booleans || {};

                if (selectedPlace?.place_id === 'ChIJIZBCHZ6j6IgRcKC_Bqug8AQ') {
                  booleans.germaines = true;
                } else if (selectedPlace?.place_id === 'ChIJ_aHU15Kj6IgROdcp7P7ZODI') {
                  booleans.depotPark = true;
                } else if (selectedPlace?.place_id === 'ChIJU66uvIWj6IgR_T3rKgn_tGY') {
                  booleans.karmaCream = true; 
                } else if (selectedPlace?.place_id === 'ChIJG4zJ_T6j6IgRgMdxRPpp5-M') {
                  booleans.butterflyGarden = true; 
                } else if (selectedPlace?.place_id === 'ChIJd71aR52j6IgRHko1BL93Tag') {
                  booleans.marston = true; 
                }

                try {
                await fetch(`http://localhost:5050/api/users/` + user?.id, {
                  method: "PUT",
                  body: JSON.stringify({
                  booleans: {
                  germaines: booleans.germaines,
                  depotPark: booleans.depotPark,
                  karmaCream: booleans.karmaCream,
                  butterflyGarden: booleans.butterflyGarden,
                  marston: booleans.marston
                  }
                  }),
                  headers: {
                  "Content-Type": "application/json; charset=UTF-8"
                  }
                });
                console.log("Boolean field updated successfully");
                } catch (error) {
                console.error("Error updating boolean field:", error);
                }
            }
            adjustCounters();
            adjustBooleans();

        }
      }, [trigger]);

      const goToEntry = () => {
        router.push(`/journal`);
      }

    return (
        <Card sx={{
            padding: '20px',
            maxWidth: 'lg',
            margin: 'auto'
        }}>
            <Grid container spacing={2} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}
                >
                  <Grid container spacing={4} justifyContent="center" maxWidth="md" paddingTop="10px">
                    <Grid item xs={12}>
                      <Typography variant="h2">Enter Your New Journal Entry!</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Entry Date"
                          defaultValue={date}
                          format="YYYY-MM-DD"
                          onChange={handleDateChange}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Title"
                        placeholder="Enter a title..."
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        minRows={5}
                        label="Content"
                        placeholder="Write your journal entry..."
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <APIProvider apiKey={googleApiKey}>
                        <Box
                          sx={{
                            width: '100%',
                            '& input': {
                              width: '100%',
                              padding: '16.5px 14px',
                              borderRadius: '4px',
                              border: '1px solid #ccc',
                              fontSize: '1rem',
                              fontFamily: 'Roboto, sans-serif',
                            }
                          }}
                        >
                          <PlaceAutocomplete onPlaceSelect={setSelectedPlace}/>
                        </Box>
                      </APIProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                          <Button type="submit" variant="contained">
                            Submit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button type="reset" variant="contained" color="info">
                            Reset
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
            </Grid>
        </Card>
    );
}

//TEENY TINY SEARCH BAR AT THE TOPPPPPP
  interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  }
  
  const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
      useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');
  
    useEffect(() => {
      if (!places || !inputRef.current) return;
  
      const options = {
        fields: ['geometry', 'name', 'formatted_address', 'place_id']
      };
  
      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
  
    useEffect(() => {
      if (!placeAutocomplete) return;
  
      placeAutocomplete.addListener('place_changed', () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);
  
    return (
      <div className="autocomplete-container">
        <input ref={inputRef} />
      </div>
    );
  };
