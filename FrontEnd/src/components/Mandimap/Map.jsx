import React, { useState, useEffect } from 'react';

const MapComponent = () => {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    // Fetch the Google Maps API key from your Node.js backend
    const fetchApiKey = async () => {
      try {
        const response = await fetch('/api/maps-api-key');
        const data = await response.json();
        setApiKey(data.apiKey);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApiKey();
  }, []);

  return (
    <div>
      {apiKey && (
        <iframe
          title="Google Map"
          width="100%"
          height="500"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=latitude,longitude&zoom=15`}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default MapComponent;
