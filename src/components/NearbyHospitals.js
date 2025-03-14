import React, { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import centerImage from '../images/center.jpg';
import locationMarker from '../images/locationMarker.png';
import BackButton from "./BackButton";

const libraries = ["places"];

const NearbyHospitals = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef(null);
  const markerRefs = useRef([]);
  const userMarkerRef = useRef(null);
  const compassRef = useRef(null);
  const boundaryCircleRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [selectedType, setSelectedType] = useState("hospital");
  const [hospitalLocations, setHospitalLocations] = useState([]);
  const [pharmacyLocations, setPharmacyLocations] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        
        if (isLoaded) {
          initializeMap(location);
          fetchAllPlaces(location);
        }
      },
      () => {
        console.error("Error getting location");
      },
      { enableHighAccuracy: true }
    );
  }, [isLoaded]);

  const getMapStyles = (zoom) => {
    return zoom > 16
      ? [
          { featureType: "road", elementType: "geometry", stylers: [{ visibility: "on" }] },
          { featureType: "landscape", elementType: "geometry", stylers: [{ visibility: "on" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ visibility: "on" }] },
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "on" }] }, // Show all POIs
          { featureType: "poi.medical", elementType: "labels.text.fill", stylers: [{ color: "#ff0000", weight: "bold" }] }, // Highlight hospitals in red
          { featureType: "poi.medical", elementType: "labels.icon", stylers: [{ saturation: 100 }] }, // Make hospital icons more visible
        ]
      : [
          { featureType: "road", elementType: "geometry", stylers: [{ visibility: "on" }] },
          { featureType: "landscape", elementType: "geometry", stylers: [{ visibility: "on" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ visibility: "on" }] },
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }, // Hide all POIs except hospitals
          { featureType: "poi.medical", elementType: "labels.text.fill", stylers: [{ color: "#ff0000", weight: "bold" }] }, // Highlight hospitals
          { featureType: "poi.medical", elementType: "labels.icon", stylers: [{ saturation: 100 }] }, // Make hospital icons more visible
        ];
  };

  const initializeMap = (location) => {
    mapRef.current = new window.google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 15,
      styles: getMapStyles(16),
    });

    userMarkerRef.current = new window.google.maps.Marker({
      position: location,
      map: mapRef.current,
      title: "You are here",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "blue",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "white",
      },
      rotation: compassRef.current || 0,
    });

    // Create a circular boundary around the user
    boundaryCircleRef.current = new window.google.maps.Circle({
      strokeColor: "#007BFF",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#007BFF",
      fillOpacity: 0.07, // Light visibility effect
      map: mapRef.current,
      center: location,
      radius: 1000, // Radius in meters
    });

    mapRef.current.addListener("zoom_changed", () => {
      const newZoom = mapRef.current.getZoom();
      mapRef.current.setOptions({ styles: getMapStyles(newZoom) });
    });
  };

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (event) => {
        compassRef.current = event.alpha;
        if (userMarkerRef.current) {
          userMarkerRef.current.setOptions({ rotation: event.alpha });
        }
      });
    }
  }, []);

  const fetchAllPlaces = async (location) => {
    const hospitalData = await fetchNearbyPlaces(location, "hospital");
    const pharmacyData = await fetchNearbyPlaces(location, "pharmacy");

    setHospitalLocations(hospitalData);
    setPharmacyLocations(pharmacyData);

    updateMarkers(hospitalData);
  };

  const fetchNearbyPlaces = async (location, type) => {
    try {
      const radius = type === "hospital" ? 1500.0 : 500.0;
      const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "places.displayName,places.location",
        },
        body: JSON.stringify({
          includedTypes: [type],
          locationRestriction: {
            circle: {
              center: {
                latitude: location.lat,
                longitude: location.lng,
              },
              radius: radius,
            },
          },
        }),
      });

      const data = await response.json();
      return data.places || [];
    } catch (error) {
      console.error(`Error fetching ${type} places:`, error);
      return [];
    }
  };

  const updateMarkers = (locations) => {
    markerRefs.current.forEach(marker => marker.setMap(null));
  
    markerRefs.current = locations.map((place) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: place.location.latitude,
          lng: place.location.longitude,
        },
        map: mapRef.current,
        title: place.displayName,
        icon: {
          url: locationMarker,
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 60),
        },
      });
  
      // Add click event listener to center and zoom on hospital location
      marker.addListener("click", () => {
        mapRef.current.panTo(marker.getPosition());
        mapRef.current.setZoom(19);
      });
  
      return marker;
    });
  };
  

  const handleTypeChange = (type) => {
    setSelectedType(type);
    updateMarkers(type === "hospital" ? hospitalLocations : pharmacyLocations);
  };

  const centerMapToUser = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.setCenter(userLocation);
      mapRef.current.setZoom(16);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <>
    <BackButton/>
    {/* buttons container */}
      <div style={{ display: "flex", justifyContent: "center", margin: "60px 0 10px 0", gap: "20px" }}>
        <button
          onClick={() => handleTypeChange("hospital")}
          style={{
            padding: "8px",
            backgroundColor: selectedType === "hospital" ? "lightblue" : "white",
            border: "1px solid #ccc",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          Hospitals
        </button>

        <button
          onClick={() => handleTypeChange("pharmacy")}
          style={{
            padding: "8px",
            backgroundColor: selectedType === "pharmacy" ? "lightblue" : "white",
            border: "1px solid #ccc",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          Medical Stores
        </button>
      </div>

    {/* map container */}
      <div className="map-container mb-5" style={{ width: "100%", height: "500px", position: "relative" }}>
        <div  id="map" style={{ width: "100%", height: "100%" }} />

        <button
          onClick={centerMapToUser}
          style={{
            position: "absolute",
            bottom: "160px",
            right: "10px",
            padding: "8px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            cursor: "pointer",
            borderRadius: "50px",
          }}
        >
          <img style={{ width: "25px" }} src={centerImage} alt="center" />
        </button>
      </div>
    </>
  );
};

export default NearbyHospitals;
