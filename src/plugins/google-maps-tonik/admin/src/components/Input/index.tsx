import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Loader, Button } from '@strapi/design-system';
import { Refresh } from '@strapi/icons';
import Geohash from 'latlon-geohash';
import { useIntl } from 'react-intl';
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
  GroundOverlay
} from '@react-google-maps/api';
import { Config, Coordinates, Location } from '../../../../types';
import { getConfig } from '../../utils/axios';
import { getDefaultCordsFromAttribute } from '../../utils/input';
import { useGeolocated } from 'react-geolocated';

const mapsLibraries: 'places'[] = ['places']; // allow the use of places api for searchbox

const fallbackCenter: Coordinates = {
  lat: 0, // tonik - original 51.51652494189269
  lng: 0, // tonik - original 7.45560626859687
};

const Input = ({
  attribute,
  intlLabel,
  onChange,
  value,
  name,
  required,
}: any) => {
  const overwriteFieldValue = (value: Location | null) => {
    onChange({
      target: {
        name,
        value: value ? JSON.stringify(value) : null,
        type: attribute.type, // json
      },
    });
  };

  const { formatMessage } = useIntl();

  /*
  const { coords: userCords }: { coords: GeolocationCoordinates | undefined } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
    }); // Get user's current coordinates
  */
  const userCords = {
    lat: fallbackCenter.lat,
    latitude: fallbackCenter.lat,
    lng: fallbackCenter.lng,
    longitude: fallbackCenter.lng
  };

  const defaultCords: Coordinates | null =
    getDefaultCordsFromAttribute(attribute); // Get default coordinates from attribute

  /* State initialization */
  const [configIsLoaded, setConfigIsLoaded] = useState(false); // Indicates whether plugin config has been fetched
  const [mapsIsLoaded, setMapsIsLoaded] = useState(false); // Indicates wether google maps has been loaded

  const [requirementNotMet, setRequirementNotMet] = useState(false); // Indicates whether the requirement is met

  const [config, setConfig] = useState<Config>({
    id: 0,
    googleMapsKey: '',
  }); // Plugin config

  const [cords, setCords] = useState<Coordinates | null>(null); // Current coordinates

  const [mapsCenter, setMapsCenter] = useState<Coordinates>(
    fallbackCenter // Current map's center coordinates
  );

  const [address, setAddress] = useState<string>(''); // Searchbox input value

  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null); // Searchbox ref


  /* tonik - START */
  const overlayEnable = [
    {
      urlcontains: "/api::plot.plot/",
      errormessage: "ERROR: <br /><br />Either: <br />The interactive site map image is missing on the development page, upload a 3000 x 3000 pixel image <br />OR <br />Publish this plot and refresh page",
      query: `query {
        plots(
          filters: {
            id: {
              eq: [parentid]
            }
          }
        ) {
          data {
            id
            attributes {
              development {
                data {
                  attributes {
                    interactivemap {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    }
  ];
  const [doOnce, setDoOnce] = useState<boolean | null>(true);
  const [doOnce2, setDoOnce2] = useState<boolean | null>(true);
  const [doOnce3, setDoOnce3] = useState<boolean | null>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [mapOverlayImage, setMapOverlayImage] = useState<string | null>("");
	const [groundOverlayImage, setGroundOverlayImage] = useState<GroundOverlay | null>(null);
  const [imageDimensions, setImageDimensions] = useState({
    height: 0,
    width: 0,
  });

  const loadImage = (setImageDimensions: any, imageUrl: string) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width
      });
    };
    img.onerror = (err) => {
      //console.log("img error");
      //console.error(err);
    };
  };

  function GetBounds(latitude: number, longitude: number, imageWidth: number, imageHeight: number) {
    const EarthRadius = 6378137; // Earth's radius in meters

    const worldWidth = 256; // Width of the world map at zoom level 0

    const metersPerPixelX = (worldWidth * EarthRadius * 2 * Math.PI) / 360;
    const metersPerPixelY = (worldWidth * EarthRadius * Math.PI) / 180;

    const degreesPerPixelX = 360 / imageWidth;
    const degreesPerPixelY = 180 / imageHeight;

    const north = latitude + (imageHeight / 2) * degreesPerPixelY;
    const south = latitude - (imageHeight / 2) * degreesPerPixelY;

    const east = longitude + (imageWidth / 2) * degreesPerPixelX;
    const west = longitude - (imageWidth / 2) * degreesPerPixelX;

    return {
      north,
      south,
      east,
      west,
    };
  }
  
  function GetImagefromData(obj: any) {
    for (var k in obj) {
        if (typeof obj[k] == "object" && obj[k] !== null) {
            if(obj[k]
              && obj[k].url
              && obj[k].url != ""){
              setMapOverlayImage(obj[k].url);
            }
            GetImagefromData(obj[k]);
        }
    }
  }
  
  function GetMapOverlayImage(queryin: string) {
    if(queryin != ""){
      fetch("/graphql", {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: queryin
        })
      })
      .then((response) => response.json())
      .then((result) => {
        GetImagefromData(result);
      });
    }
  }
  
  useEffect(() => {
    if(window && doOnce){
      setDoOnce(false);
      if(window
        && window.location
        && window.location.href
        && window.location.href != ""){
          if(overlayEnable
            && Object.keys(overlayEnable).length > 0){
              Object.keys(overlayEnable).map(function(obj, i) {
                if(overlayEnable[i] !== null
                  && overlayEnable[i] !== undefined
                  && overlayEnable[i].urlcontains
                  && window.location.href.includes(overlayEnable[i].urlcontains)){
                    setErrorMessage(overlayEnable[i].errormessage);
                    const splitArray = window.location.href.split(overlayEnable[i].urlcontains);
                    if(splitArray
                      && Object.keys(splitArray).length > 1){
                        GetMapOverlayImage(overlayEnable[i].query.replace("[parentid]", splitArray[Object.keys(splitArray).length - 1]));
                      }
                }
              });
          }
        }
    }
  }, [doOnce, mapOverlayImage, errorMessage]);
  
  useEffect(() => {
    if(window && doOnce2
      && mapOverlayImage && mapOverlayImage != ""){
      setDoOnce2(false);

      loadImage(setImageDimensions, mapOverlayImage);
    }

  }, [doOnce2, mapOverlayImage]);
  /* tonik - END */




  /* Reset function */
  const resetComponent = (persistValue = true) => {
    /* Field's value */
    if (!persistValue) overwriteFieldValue(null); // Overwrite field's value to null, if field's value is not being persisted

    /* Current coordinates */
    const parsedValue: Location | null = persistValue
      ? JSON.parse(value || null)
      : null; // Parse saved location, if field's value is being persisted

    setCords(parsedValue?.coordinates || null); // Set cords to saved coordinates, if they exist

    /* Current map's center coordinates */
    setMapsCenter(
      parsedValue?.coordinates ??
        (userCords
          ? { lat: userCords.latitude, lng: userCords.longitude }
          : fallbackCenter) // Set map's center to saved coordinates, default coordinates, user coordinates or default coordinates
    );

    /* Searchbox input value */
    setAddress('');
  };

  /* Center the map at userCords, in the right situation */
  useEffect(() => {
    if (!cords && userCords)
      // If no coordinates have been picked, use user's current coordinates instead of fallback for map's center
      setMapsCenter({ lat: userCords.latitude, lng: userCords.longitude });
  }, [userCords, cords]);

  /* On mount, reset this field and fetch the plugin's config */
  useEffect(() => {
    resetComponent();

    /* Fetch plugin config using axios instance */
    getConfig()
      .then((response) => {
        const { data }: { data: Config } = response.data;
        setConfig(data);

        setConfigIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /* When google maps is loaded, set the default coordinates if they exist */
  useEffect(() => {
    if (mapsIsLoaded && !value && defaultCords) {
      setCords(defaultCords);
      setMapsCenter(defaultCords);
    }
  }, [mapsIsLoaded]);

  /* Handle coordinates change */
  useEffect(() => {
    setRequirementNotMet(required && !cords); // Mark the requirement as not met if field's value is null but it's required

    if (!cords || !mapsIsLoaded) return;

    /* Generate geohash from coordinates */
    const geohash = Geohash.encode(cords?.lat, cords?.lng);

    /* Update field's json value */
    const location: Location = {
      coordinates: cords,
      geohash,
    };

    overwriteFieldValue(location);
  }, [cords]);

  /* Handle a place being selected using searchbox */
  const handlePlaceChanged = () => {
    const results: google.maps.places.PlaceResult[] | undefined =
      searchBox?.getPlaces();

    if (results && results.length) {
      const place = results[0];

      if (place.formatted_address) setAddress(place.formatted_address);

      const coordinates = place.geometry?.location?.toJSON() as Coordinates;
      setCords(coordinates);
      setMapsCenter(coordinates);
    }
  };

  return (
    <>
      <Typography variant='pi' fontWeight='bold'>
        {formatMessage(intlLabel)}
      </Typography>
      
      {/* tonik - START */
        mapOverlayImage && mapOverlayImage != "" ?
        /* tonik - END */

      <Box
        marginTop={1}
        borderColor={requirementNotMet ? 'danger600' : 'primary200'}
      >
        {configIsLoaded && (
          <LoadScript
            googleMapsApiKey={config.googleMapsKey}
            libraries={mapsLibraries}
            onLoad={() => setMapsIsLoaded(true)}
          />
        )}

        {!configIsLoaded || !mapsIsLoaded ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader small>Loading content...</Loader>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={{
              width: '100%',
              height: '400px',
            }}
            center={mapsCenter}
            zoom={14} // tonik - original 20
            /* tonik - START */
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              draggableCursor: 'crosshair',
              styles: [
                {
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                }
              ],
              restriction: {
                latLngBounds: ({
                  north: 0.5,
                  south: -0.5,
                  east: 0.5,
                  west: -0.5,
                }),
                strictBounds: false,
              },
              minZoom: 10,
              maxZoom: 17
            }}
            /* tonik - END */
            onClick={({ latLng }) => setCords(latLng?.toJSON() as Coordinates)}
          >
            {/* tonik - original START
            <StandaloneSearchBox
              bounds={
                userCords
                  ? new google.maps.LatLngBounds({
                      lat: userCords.latitude,
                      lng: userCords.longitude,
                    })
                  : undefined
              }
              onLoad={(ref) => setSearchBox(ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <input
                type='text'
                placeholder={formatMessage({
                  id: 'google-maps-tonik.input.search.placeholder',
                  defaultMessage: 'Search for a place',
                })}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `300px`,
                  height: `40px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: 'absolute',
                  left: '50%',
                  marginLeft: '-140px',
                  marginTop: '10px',
                }}
              />
            </StandaloneSearchBox>
              tonik - original END */}

            {/* tonik - START */
            <GroundOverlay
              key={'interactive-googlemap-groundoverlay-white'}
              url='https://www.wainhomes.co.uk/img/white.gif'
              bounds={{
                north: 80,
                south: -80,
                east: 80,
                west: -80
                }}
              onClick={({ latLng }) => setCords(latLng?.toJSON() as Coordinates)}
              />
              /* tonik - END */}

            {/* tonik - START */
              mapOverlayImage && mapOverlayImage != "" ?
              (<GroundOverlay
                key={'interactive-googlemap-groundoverlay'}
                url={mapOverlayImage}
                bounds={{
                  north: 0.103,
                  south: -0.103,
                  east: 0.103,
                  west: -0.103,
                }}
                onClick={({ latLng }) => setCords(latLng?.toJSON() as Coordinates)}
              />)
              : ""
              /* tonik - END */}

            {cords && <Marker position={cords} />}

          </GoogleMap>
        )}
      </Box>

      /* tonik - START */
      : ""
      /* tonik - END */}
      
      {/* tonik - START */
      mapOverlayImage && mapOverlayImage != "" ?
      /* tonik - END */

      requirementNotMet && (
        <Box paddingTop={1}>
          <Typography variant='pi' textColor='danger600'>
            {formatMessage({
              id: 'google-maps-tonik.input.error.required',
              defaultMessage: 'You must pick a location',
            })}
          </Typography>
        </Box>
      )

      /* tonik - START */
      : ""
      /* tonik - END */}
      
      {/* tonik - START */
      mapOverlayImage && mapOverlayImage != "" ?
      /* tonik - END */

      <Box paddingTop={2}>
        <Button startIcon={<Refresh />} onClick={() => resetComponent(false)}>
          {formatMessage({
            id: 'google-maps-tonik.input.button.reset',
            defaultMessage: 'Reset',
          })}
        </Button>
      </Box>

      /* tonik - START */
      :
      errorMessage && errorMessage != "" ?
        <div
						key={"key-error-message"}
						dangerouslySetInnerHTML={{__html:errorMessage}} style={{
              fontSize: "0.75rem",
              lineHeight: "1.33",
              fontWeight: 600,
              color: "rgb(183, 43, 26)",
              padding: "10px",
              border: "1px solid rgb(245, 192, 184)",
              background: "rgb(252, 236, 234)",
              marginTop: "4px",
            }} />
      /* tonik - END */

        /* tonik - START */
        : ""
        /* tonik - END */}
    </>
  );
};

export default Input;
