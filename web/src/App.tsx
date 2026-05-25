import { useState,useEffect } from "react";
import "./App.css";
import Applications from "./Applications";

const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [status, setStatus] = useState<'up' | 'down' | 'loading'>('loading')

  useEffect(()=>{
    fetch(`${API_URL}/health`)
    .then((r) => r.json())
    .then((data) => setStatus(data.ok ? 'up' : 'down'))
    .catch(()=> setStatus('down'))
  },[])

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>Prep OS</h1>
      {status === 'loading' && <p>checking...</p>}
      {status === 'up' && <p style={{color:'green'}}>● API is up</p>}
      {status === 'down' && <p style={{color:'red'}}>● API is down</p>}
      <Applications/>
    </div>
  );
}

export default App;
