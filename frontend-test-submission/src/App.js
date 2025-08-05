import React, { useEffect } from 'react';
import './App.css';
import UrlShortenerPage from './UrlShortenerPage';
import { logEvent } from './logger';

function App() {
  // Insert your latest valid access token EXACTLY here.
  const AUTH_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtdW5hZnBhdGFuNzg2N0BnbWFpbC5jb20iLCJleHAiOjE3NTQzODIxMTQsImlhdCI6MTc1NDM4MTIxNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImE0MTk1NjU3LWYwODMtNDJhMC1hMTllLWVjNTZlY2Q2YWVjZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InBhdGFuIG11bmFmIiwic3ViIjoiZmUyMDllMTItZjJhNC00MjgwLWE3ZGItZWNlMTNmYmRlNDM4In0sImVtYWlsIjoibXVuYWZwYXRhbjc4NjdAZ21haWwuY29tIiwibmFtZSI6InBhdGFuIG11bmFmIiwicm9sbE5vIjoiMjI0ODFhMDVpOSIsImFjY2Vzc0NvZGUiOiJIYkRwcEciLCJjbGllbnRJRCI6ImZlMjA5ZTEyLWYyYTQtNDI4MC1hN2RiLWVjZTEzZmJkZTQzOCIsImNsaWVudFNlY3JldCI6Ik1HdnRacGJ0QXBzWWpoVWEifQ.3yt8C-jE4LneIGC_yb52hXRnV_vfxYZBgU1j5XZM5-s"; 

  // Log when the App component loads
  useEffect(() => {
    logEvent({
      stack: "frontend",
      level: "info",
      package: "component",
      message: "App component loaded",
      token: AUTH_TOKEN
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortener Demo</h1>
      </header>
      {/* Pass the token to child pages */}
      <UrlShortenerPage authToken={AUTH_TOKEN} />
    </div>
  );
}

export default App;