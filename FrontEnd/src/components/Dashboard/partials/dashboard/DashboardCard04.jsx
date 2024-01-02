import React, { useState, useEffect } from 'react';

// array(['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
//        'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
//        'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
//        'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee'],
//       dtype=object)

function DashboardCard04() {
  const [data, setData] = useState({
    text: 'apple',
    imageUrl: './img/apple.jpg',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating an API call (replace with actual data fetching logic)
        const response = await fetch('your-api-endpoint');
        const result = await response.json(); // Assuming your API returns JSON
        //FrontEnd\src\components\images\blackgram.jpg
        // Define a mapping between text responses and image URLs
        const imageMapping = {
          rice: './img/rice.avif',
          maize: './img/maize.png',
          chickpea: './img/chickpea.jpeg',
          kidneybeans: './img/kidneybeans.jpg',
          pidgeonpeas: './img/pidgeonpeas.jpg',
          mothbeans: './img/mothbeans.jpg',
          mungbeans: './img/fadf',
          blackgram: './img/blackgram.jpg',
          lentil: './img/l.jpg',
          pomegranate: './img/pomegranate.jpg',
          banana: './img/banana.jpg',
          mango: './img//mango.jpg',
          grapes: './img/grapes.jpg',
          watermelon: './img/watermelon.webp',
          muskmelon: './img/muskmelon.avif',
          apple: './img/apple.jpg',
          orange: './img/daff',
          papaya: './img/fsfa',
          coconut: './img/faf',
          cotton: './img/dadad',
          jute: './img/dadfa',
          coffee: './img/dad',

          // ... add mappings for all 22 responses
        };

        // Assuming the API response has a 'text' property
        const text = result.text;

        // Set the data with the text and corresponding image URL
        setData({
          text: text,
          imageUrl: imageMapping[text] || './img/apple.jpg', // Use a default image if no mapping is found
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Data</h2>
      </header>
      <div className="p-4">
        <p style={{ color: 'black' }}>{data.text}</p>
        <img src={data.imageUrl} alt="Response Image" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }} />
      </div>
    </div>
  );
}

export default DashboardCard04;
