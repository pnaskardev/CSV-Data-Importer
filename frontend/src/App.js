/* eslint-disable no-unused-expressions */
import React from "react";
import {useState} from "react";
import axios from "axios";
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ColumnDisplay from "./components/column_display";

const App = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [jsonData, setJsonData] = useState([]);

  // const notify=()=>toast("Notify");

  const displayData = () => {
    axios.get('http://localhost:8000/get/').then((response) => {
      console.log(response.data);
      // ColumnDisplay(response.data);
      setJsonData(response.data);
    }).catch((error) => 
    {
      console.log(error);
    });
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('http://localhost:8000/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentCompleted = Math.round((loaded / total) * 100);
            setProgress(percentCompleted);
          },
        })
        .then((response) => {
          console.log(response.data);
          // Handle the response data as needed
          showSuccessToast();
          
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors
          console.log('Inside catch method')
          showErrorToast(error);
        });
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `File has been uploaded`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,  
    });
  };

  const showErrorToast = (msg, timer) => {
    console.log('Inside showWError Function ')
    toast.error(msg || `Wrong file type upload a .CSV file`, {
      position: "top-right",
      autoClose: timer ? timer : 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    
    <>
      {/* <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
      /> */}
      <div className="App">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
        <button onClick={displayData}>Get Data</button>
        {jsonData && <ColumnDisplay data={jsonData}/>}
        {/* <button onClick={notify}>Upload File</button> */}
        <ToastContainer/>
          {/* <ColumnDisplay data={"list"} /> */}
            
        <div>{progress}% Uploaded</div>
        {/* Display the JSON data in column format */}
        {jsonData && jsonData.list && jsonData.list.length > 0 && (
          <div>
            <h2>JSON Data</h2>
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>datetime</th>
                  <th>close</th>
                  <th>high</th>
                  <th>low</th>
                  <th>open</th>
                  <th>volume</th>
                  <th>instrument</th>
                </tr>
              </thead>
              <tbody>
                {jsonData.list.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.datetime}</td>
                    <td>{item.close}</td>
                    <td>{item.high}</td>
                    <td>{item.low}</td>
                    <td>{item.open}</td>
                    <td>{item.volume}</td>
                    <td>{item.instrument}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
   
    
  );
};

export default App;
