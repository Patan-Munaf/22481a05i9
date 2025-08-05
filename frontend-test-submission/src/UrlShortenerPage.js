import React, { useState } from 'react';
import { logEvent } from './logger';

function UrlShortenerPage({ authToken }) {
  // Initialize state for 5 URLs
  const [inputs, setInputs] = useState([
    { url: '', validity: '', shortcode: '' }
  ]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Add up to 5 inputs
  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };

  // Handle change for form inputs
  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  // Validate inputs (URL not empty, validity integer if given)
  const validateInputs = () => {
    for (const { url, validity } of inputs) {
      if (!url.trim()) return "Please enter a URL for every field.";
      if (validity && (!/^\d+$/.test(validity) || parseInt(validity) <= 0)) {
        return "Validity must be a positive integer if provided.";
      }
    }
    return null;
  };

  // Simulate backend API shortening (replace with real API!)
  const handleShorten = async () => {
    setError('');
    const problem = validateInputs();
    if (problem) {
      setError(problem);
      logEvent({
        stack: "frontend",
        level: "error",
        package: "component",
        message: `Input validation failed: ${problem}`,
        token: authToken
      });
      return;
    }

    logEvent({
      stack: "frontend",
      level: "info",
      package: "component",
      message: "User clicked Shorten button",
      token: authToken,
    });

    // Fake API response for demonstration
    const apiResults = inputs.map((inp, i) => ({
      original: inp.url,
      short: `http://short.ly/abc${i + 1}`,
      expires: inp.validity ? 
       new Date(Date.now() + parseInt(inp.validity)*60000).toLocaleString() :
       new Date(Date.now() + 30*60000).toLocaleString()
    }));

    setResults(apiResults);

    logEvent({
      stack: "frontend",
      level: "info",
      package: "component",
      message: "Shorten response received and shown to user",
      token: authToken
    });
  };

  return (
    <div style={{ padding: "2em" }}>
      <h2>Shorten URLs</h2>
      {inputs.map((input, i) => (
        <div key={i} style={{ marginBottom: "1em" }}>
          <input
            type="text"
            placeholder="Original URL"
            value={input.url}
            onChange={e => handleChange(i, "url", e.target.value)}
            style={{ marginRight: "1em" }}
          />
          <input
            type="text"
            placeholder="Validity (minutes, optional)"
            value={input.validity}
            onChange={e => handleChange(i, "validity", e.target.value)}
            style={{ marginRight: "1em" }}
          />
          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={input.shortcode}
            onChange={e => handleChange(i, "shortcode", e.target.value)}
            style={{ marginRight: "1em" }}
          />
        </div>
      ))}
      <button onClick={addInput} disabled={inputs.length >= 5}>
        Add More URL
      </button>
      <button onClick={handleShorten}>
        Shorten
      </button>
      <br />
      {error && <div style={{ color: "red" }}>{error}</div>}

      {results.length > 0 &&
        <div style={{ marginTop: "2em" }}>
          <h3>Results</h3>
          <ul>
            {results.map((r, i) => (
              <li key={i}>
                Original: {r.original}<br />
                Short: <a href={r.short}>{r.short}</a><br />
                Expires: {r.expires}
              </li>
            ))}
          </ul>
        </div>}
    </div>
  );
}

export default UrlShortenerPage;