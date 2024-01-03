import { useState, Fragment } from 'react';
import './App.css';
import Modal from './Compo/Modal';
import { Button } from '@material-tailwind/react';

function ML() {
  const [showModal, setShowModal] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);

  const handlePredictionUpdate = (newPrediction, newImage) => {
    setPrediction(newPrediction);
    setImage(newImage);
  };

  return (
    <Fragment>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl mb-5 text-black'>
          Please upload the soil composition and required details to determine suitable crops for cultivation by clicking the button below.
        </h1>
        <Button
          className='bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-3 mt-5'
          onClick={() => setShowModal(true)}
        >
          Click Me
        </Button>
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          onPredictionUpdate={handlePredictionUpdate}
        />
        {prediction && (
          <div>
            <p> <span className=' text-2xl text-black ' >The Most Suitable Crop is:</span>  <span className=' text-3xl text-green-600  ' >{prediction}</span> </p>
            {image && (
              <img className='border-2 border-green-600 '  src={image} alt='Predicted Crop' style={{ width: '300px', height: 'auto' }} />
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default ML;
