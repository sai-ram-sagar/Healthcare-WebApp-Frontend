import React, { useEffect } from "react";
import { OlaMaps } from "olamaps-web-sdk";

const OlaMapComponent = ({ places }) => {
    useEffect(() => {
        if (!places || places.length === 0) return;

        const mapInstance = new OlaMaps({
            apiKey: process.env.REACT_APP_OLA_MAPS_API_KEY,
            container: "map",
            center: [places[0].longitude, places[0].latitude], // Default to first place
            zoom: 14,
        });

        places.forEach((place) => {
            if (!place.latitude || !place.longitude) return;

            const marker = new mapInstance.Marker({
                color: "red",
            })
                .setLngLat([place.longitude, place.latitude])
                .setPopup(new mapInstance.Popup().setText(place.description))
                .addTo(mapInstance);

            marker.getElement().addEventListener("click", () => {
                mapInstance.flyTo({ center: [place.longitude, place.latitude], zoom: 16 });
            });
        });

        return () => mapInstance.remove();
    }, [places]);

    return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default OlaMapComponent;
