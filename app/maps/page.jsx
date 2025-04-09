"use client";
import React, { useEffect, useRef, useState } from "react";

const MapsPage = () => {
  const mapRef = useRef(null);
  const [distanceWithin1Km, setDistanceWithin1Km] = useState(null);
  const [userPlace, setUserPlace] = useState("");
  const [userCoordinates, setUserCoordinates] = useState(null); // 🆕
  const [error, setError] = useState("");

  const googleMapsApiKey = "AIzaSyCJdJuDAGZr4Pj9vrVBa8FstMV-n7r3XUA"; // 🔑 Replace this!

  const eventLocation = { lat: 19.123405, lng: 72.912077 };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const loadMapScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
      } else {
        const existingScript = document.getElementById("googleMaps");
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.id = "googleMaps";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onerror = () =>
          reject("Google Maps JavaScript API failed to load. Check API key.");
        script.onload = resolve;
        document.body.appendChild(script);
      }
    });
  };

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadMapScript();

        if (!navigator.geolocation) {
          setError("Geolocation is not supported by your browser.");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            setUserCoordinates(userLatLng); // 🆕 Save coordinates

            const distance = calculateDistance(
              userLatLng.lat,
              userLatLng.lng,
              eventLocation.lat,
              eventLocation.lng
            );

            setDistanceWithin1Km(distance <= 1);

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: userLatLng }, (results, status) => {
              if (status === "OK" && results[0]) {
                setUserPlace(results[0].formatted_address);
              }
            });

            const map = new window.google.maps.Map(mapRef.current, {
              center: userLatLng,
              zoom: 15,
            });

            new window.google.maps.Marker({
              position: userLatLng,
              map,
              title: "Your Location",
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "white",
              },
              animation: window.google.maps.Animation.BOUNCE,
            });

            new window.google.maps.Marker({
              position: eventLocation,
              map,
              title: "Event Location",
              icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            });
          },
          (err) => {
            setError("Unable to fetch location.");
            console.error(err);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } catch (e) {
        console.error(e);
        setError("Error loading Google Maps. Check API key and billing.");
      }
    };

    initMap();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📍 Event Proximity Check</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {distanceWithin1Km !== null && (
        <p
          style={{
            fontWeight: "bold",
            color: distanceWithin1Km ? "green" : "red",
          }}
        >
          Within 1 km: {distanceWithin1Km.toString()}
        </p>
      )}

      {userCoordinates && (
        <p>
          <strong>Your Coordinates:</strong> Latitude:{" "}
          {userCoordinates.lat.toFixed(6)}, Longitude:{" "}
          {userCoordinates.lng.toFixed(6)}
        </p>
      )}

      {userPlace && (
        <p>
          <strong>Your Place:</strong> {userPlace}
        </p>
      )}

      <div
        ref={mapRef}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "12px",
          marginTop: "1rem",
        }}
      />
    </div>
  );
};

export default MapsPage;
