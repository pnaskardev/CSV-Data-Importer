/* eslint-disable no-unused-expressions */
import {useState} from "react";
import axios from "axios";
import './App.css';

// function App() {
//   // const handleGetData = () => {
//   //   // Handle logic for getting data
//   // };


//   const [files ,setFiles]=useState(null);
//   const [progress ,setProgress]=useState({started:false,pc:0});
//   const [msg,setMsg]=useState(null);

//   const handleUpload = () => {
//     // Handle logic for uploading data
//     if(!files)
//     {
//       setMsg("No file selected");
//       return;
//     }
//     const fd=new FormData();
//     for(let i=0;i<files.length;i++)
//     {
//       fd.append(`file${i+1}`,files[i]);
//     }
   

//     setMsg("Uploading...")
//     setProgress(prevState=>{
//       return {...prevState, started:true}
//     })
//     axios.post('http://localhost:8000/upload',fd,{
//       onUploadProgress:(progressEvent)=>
//       {
//         setProgress(prevState=>{
//           return {...prevState,pc:progressEvent.progress*100}
//         })
//       },
//       headers:{
//         "Custom-Header":"value",
//       }
//     }).then(res=>{
//       setMsg("Upload succesfylly")
//       console.log(res.data)
//     })
//     .catch(err=>{
//       setMsg(err)
//       console.log(err)
//     })

//   };

//   return (
//     <div class="App">
//       <input onChange={(e)=>{setFiles(e.target.files)}} type="file" multiple/>
//       <button onClick={handleUpload}>Upload</button>
//       {progress.started && <progress max="100" value={progress.pc}></progress>}
//       {msg && <span>{msg}</span>}
//     </div>
//   );
// }

const App = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

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
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      <div>{progress}% Uploaded</div>
    </div>
  );
};

export default App;
