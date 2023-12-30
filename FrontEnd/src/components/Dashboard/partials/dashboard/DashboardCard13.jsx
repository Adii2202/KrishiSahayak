import React from 'react';
import ReactDOM from 'react-dom/client'
import App2 from './App2.jsx'
import '../../../../../src/App.css'
import { StateContextProvider } from './Context/index.jsx'



function DashboardCard13() {
  return (
    <div className="col-span-full xl:col-span-6 bg-black shadow-lg rounded-sm border border-slate-200">
      <StateContextProvider>
        <App2 />
      </StateContextProvider>,
    </div>
  );
}

export default DashboardCard13;
