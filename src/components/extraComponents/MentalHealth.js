// import React, { useState, useEffect } from 'react';

// const MentalHealth = () => {
//     const [resources, setResources] = useState([]); 
//     useEffect(() => {
//         const fetchResources = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/mental-health');
//                 const data = await response.json();
//                 setResources(data);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };


//         fetchResources();
//     }, []);
//     return (
//         <div className="container mt-5">
//             <h2>Mental Health Support</h2>
//             <p>Access resources and support for your mental well-being.</p>
//             <ul className="list-group">
//                 <li className="list-group-item">
//                     <a href="https://www.mhanational.org/" target="_blank" rel="noopener noreferrer">
//                         Mental Health America
//                     </a>
//                 </li>
//                 <li className="list-group-item">
//                     <a href="https://www.samhsa.gov/" target="_blank" rel="noopener noreferrer">
//                         SAMHSA
//                     </a>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default MentalHealth;

import React, { useEffect } from 'react';
import { OlaMaps } from 'olamaps-web-sdk';

const OlaMapComponent = () => {
  useEffect(() => {
    const olaMaps = new OlaMaps({
      apiKey: 'Z7qh9eHgTkPRMesC8B5jUCLuZjFisa5S0bL2uYv6', // Replace with your actual API key
    });

    olaMaps.init({
      style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
      container: 'map',
      center: [77.61648476788898, 12.931423492103944], // Adjust latitude & longitude as needed
      zoom: 15,
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default OlaMapComponent;
