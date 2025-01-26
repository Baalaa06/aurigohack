import React, { useState, useEffect } from "react";
import "./styles.css";

// Mock Data for Weather, Appearance Breaches, and Video
const mockWeatherData = {
  temperature: 42,
  humidity: 85,
  hazards: ["Gas Leak", "High Winds"],
};

const mockAppearanceBreaches = [
  { workerId: "W001", name: "John Doe", issue: "No Helmet", time: "10:30 AM" },
  { workerId: "W002", name: "Jane Smith", issue: "Improper Vest", time: "11:15 AM" },
];

const mockWorkerActivities = [
  { workerId: "W001", name: "John Doe", status: "Active", lastSeen: "10:35 AM" },
  { workerId: "W002", name: "Jane Smith", status: "Idle", lastSeen: "11:20 AM" },
];

const mockVideoUrl = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

const translations = {
  english: {
    login: "Login",
    username: "Username",
    password: "Password",
    welcome: "Welcome",
    worker: "Worker",
    supervisor: "Supervisor",
    currentStatus: "Current Site Status",
    temperature: "Temperature",
    humidity: "Humidity",
    hazards: "Hazards",
    emergencyStatus: "Emergency Status",
    postMessage: "Post a Message to Workers",
    enterMessage: "Enter message",
    emergencyAlert: "Trigger Emergency Alert",
    emergencyForm: "Emergency Alert Form",
    notifyEmergency: "Yes, Notify!",
    cancel: "Cancel",
    logout: "Logout",
    breaches: "Appearance Rule Breaches",
    workerCount: "Number of Workers Currently Working",
    abnormalWeather: "⚠️ Abnormal Weather Conditions Detected!",
    liveFeed: "Live Site Feed",
    workerActivity: "Worker Activities",
  },
  hindi: {
    login: "लॉगिन",
    username: "यूज़रनाम",
    password: "पासवर्ड",
    welcome: "स्वागत है",
    worker: "कर्मचारी",
    supervisor: "पर्यवेक्षक",
    currentStatus: "वर्तमान साइट स्थिति",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    hazards: "खतरे",
    emergencyStatus: "आपातकालीन स्थिति",
    postMessage: "कर्मचारियों को संदेश पोस्ट करें",
    enterMessage: "संदेश दर्ज करें",
    emergencyAlert: "आपातकालीन अलर्ट जारी करें",
    emergencyForm: "आपातकालीन अलर्ट फॉर्म",
    notifyEmergency: "हाँ, सूचित करें!",
    cancel: "रद्द करें",
    logout: "लॉगआउट",
    breaches: "दिखावट नियम उल्लंघन",
    workerCount: "वर्तमान में काम कर रहे श्रमिकों की संख्या",
    abnormalWeather: "⚠️ असामान्य मौसम की स्थिति का पता चला!",
    liveFeed: "साइट का लाइव फीड",
    workerActivity: "कर्मचारी गतिविधियाँ",
  },
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // "worker" or "supervisor"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("english");
  const [weatherData, setWeatherData] = useState({});
  const [appearanceBreaches, setAppearanceBreaches] = useState([]);
  const [workerActivities, setWorkerActivities] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  // Simulate data fetching on component mount
  useEffect(() => {
    setWeatherData(mockWeatherData);
    setAppearanceBreaches(mockAppearanceBreaches);
    setWorkerActivities(mockWorkerActivities);
    setVideoUrl(mockVideoUrl);
  }, []);

  const handleLogin = () => {
    if (username === "worker" && password === "worker123") {
      setRole("worker");
      setLoggedIn(true);
    } else if (username === "supervisor" && password === "supervisor123") {
      setRole("supervisor");
      setLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    setLoggedIn(false);
    setRole("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Hazard Monitoring Dashboard</h1>
        <p>Monitor construction site safety, weather, and worker activities.</p>
        <div className="language-selection">
          <select onChange={(e) => setLanguage(e.target.value)} value={language}>
            <option value="english">English</option>
            <option value="hindi">हिंदी</option>
            
          </select>
        </div>
      </header>

      <main className="content">
        {!loggedIn ? (
          // Login Form
          <div className="login-container">
            <h2>{translations[language].login}</h2>
            <input
              type="text"
              placeholder={translations[language].username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder={translations[language].password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button onClick={handleLogin} className="login-button">
              {translations[language].login}
            </button>
          </div>
        ) : (
          // Dashboard View
          <div className="dashboard-container">
            <h2>
              {translations[language].welcome}{" "}
              {role === "worker" ? translations[language].worker : translations[language].supervisor}
            </h2>

            {/* Worker View */}
            {role === "worker" && (
              <div>
                <h3>{translations[language].breaches}</h3>
                <ul>
                  {appearanceBreaches
                    .filter((breach) => breach.workerId === username)
                    .map((breach, index) => (
                      <li key={index}>
                        {breach.time}: {breach.issue}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Supervisor View */}
            {role === "supervisor" && (
              <div>
                <h3>{translations[language].currentStatus}</h3>
                <p>
                  {translations[language].temperature}: {weatherData.temperature}°C
                </p>
                <p>
                  {translations[language].humidity}: {weatherData.humidity}%
                </p>
                <p>
                  {translations[language].hazards}: {weatherData.hazards?.join(", ")}
                </p>

                <h3>{translations[language].workerActivity}</h3>
                <ul>
                  {workerActivities.map((activity, index) => (
                    <li key={index}>
                      {activity.name} ({activity.workerId}): {activity.status} - Last seen at{" "}
                      {activity.lastSeen}
                    </li>
                  ))}
                </ul>

                <h3>{translations[language].liveFeed}</h3>
                <video controls width="100%">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <button onClick={handleLogout} className="logout-button">
              {translations[language].logout}
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Created by Neural Knights</p>
      </footer>
    </div>
  );
};

export default App;
