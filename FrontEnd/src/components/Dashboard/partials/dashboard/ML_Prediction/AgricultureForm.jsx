import React, { useState } from 'react';
import axios from 'axios';

const mean = {
  N: 50.414286,
  P: 53.617532,
  K: 49.561688,
  temperature: 25.639997,
  humidity: 71.812337,
  ph: 6.462513,
  rainfall: 102.945517,
};

const variance = {
  N: 1323.634624,
  P: 1123.951739,
  K: 2686.586835,
  temperature: 25.833810,
  humidity: 492.505029,
  ph: 0.606162,
  rainfall: 2927.305546,
};

const CropPredictionForm = ({ onPredictionUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    N: 0,
    P: 0,
    K: 0,
    temperature: 0,
    humidity: 0,
    ph: 0,
    rainfall: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const standardizeValues = (rawValues) => {
    const standardizedValues = {};
    for (const key in rawValues) {
      standardizedValues[key] = (rawValues[key] - mean[key]) / Math.sqrt(variance[key]);
    }
    return standardizedValues;
  };

  const handlePredict = async () => {
    // Check if any of the fields is empty or not a number
    for (const key in formData) {
      if (formData[key] === 0 || isNaN(parseFloat(formData[key]))) {
        console.error(`Invalid value for ${key}`);
        alert(`Please fill in all the values before predicting.`);
        return; // Stop the prediction if any field is empty or not a number
      }
    }

    const standardizedData = standardizeValues(formData);

    

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', standardizedData);
      console.log(response);
      onPredictionUpdate(response.data.prediction, `/img/${response.data.prediction}.jpg`);
      onClose();
    } catch (error) {
      console.error('Error predicting crop:', error);
    }
  };
  return (
    <div>
      {/* ... (your input fields) */}
      <div>
        <label>N:</label>
        <input type="number" name="N" onChange={handleChange} />
      </div>
      <div>
        <label>P:</label>
        <input type="number" name="P" onChange={handleChange} />
      </div>
      <div>
        <label>K:</label>
        <input type="number" name="K" onChange={handleChange} />
      </div>
      <div>
        <label>Temperature:</label>
        <input type="number" name="temperature" onChange={handleChange} />
      </div>
      <div>
        <label>Humidity:</label>
        <input type="number" name="humidity" onChange={handleChange} />
      </div>
      <div>
        <label>pH:</label>
        <input type="number" name="ph" onChange={handleChange} />
      </div>
      <div>
        <label>Rainfall:</label>
        <input type="number" name="rainfall" onChange={handleChange} />
      </div>
      <button onClick={handlePredict}>Predict</button>
      {/* {prediction && <p>Prediction: {prediction}</p>}
      {image && <img src={image} alt="Predicted Crop" style={{ width: '300px', height: 'auto' }} />} */}
      {/* <button onClick={handlePredict}>Predict</button> */}
    </div>
  );
};

export default CropPredictionForm;