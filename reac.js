import React, { useState } from "react";
import './styles.css';

// Mock Data for the application (just for demo)
const initialData = {
  temperature: 25, // In °C
  humidity: 60, // In %
  hazards: ["Gas Leak", "High Winds"],
  emergencyStatus: "Standby", // "Standby", "Alerted"
};

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
  },
  tamil: {
    login: "உள்நுழைவு",
    username: "பயனர் பெயர்",
    password: "கடவுச்சொல்",
    welcome: "வாங்க",
    worker: "தொழிலாளர்",
    supervisor: "ஆய்வாளர்",
    currentStatus: "தற்போதைய நிலை",
    temperature: "தாபநிலை",
    humidity: "உருகல்",
    hazards: "ஆபத்துகள்",
    emergencyStatus: "அவசர நிலை",
    postMessage: "பணியாளர்களுக்கு செய்தி அனுப்பவும்",
    enterMessage: "செய்தி உள்ளிடவும்",
    emergencyAlert: "அவசர எச்சரிக்கை உருவாக்கவும்",
    emergencyForm: "அவசர எச்சரிக்கை படிவம்",
    notifyEmergency: "ஆம், அறிவிக்கவும்!",
    cancel: "ரத்துசெய்",
    logout: "வெளியேறு",
  },
  malayalam: {
    login: "ലോഗിൻ",
    username: "ഉപയോക്തൃനാമം",
    password: "പാസ്വേഡ്",
    welcome: "സ്വാഗതം",
    worker: "കൃത്യമായ ജോലി",
    supervisor: "പരിശോധനക്കാരൻ",
    currentStatus: "നിലവിലെ സൈറ്റ് സ്ഥിതിവിവരം",
    temperature: "ചൂട്",
    humidity: "ആർദ്രത",
    hazards: "പകടങ്ങൾ",
    emergencyStatus: "അവസര സ്ഥിതി",
    postMessage: "കാർമ്മികർക്കായി സന്ദേശം പോസ്റ്റ് ചെയ്യുക",
    enterMessage: "സന്ദേശം നൽകുക",
    emergencyAlert: "അവസര എക്കാത്ത alert",
    emergencyForm: "അവസര എക്കാത്ത ഫോം",
    notifyEmergency: "അതെ, അറിയിക്കുക!",
    cancel: "റദ്ദാക്കുക",
    logout: "ലോഗ് ഔട്ട്",
  },
  kannada: {
    login: "ಲಾಗಿನ್",
    username: "ಬಳಕೆದಾರ ಹೆಸರು",
    password: "ಗುಪ್ತಪದ",
    welcome: "ಸ್ವಾಗತ",
    worker: "ಶ್ರಮಿಕ",
    supervisor: "ಆಧಿಕಾರಿ",
    currentStatus: "ಪ್ರಸ್ತುತ ಸೈಟ್ ಸ್ಥಿತಿ",
    temperature: "ಹವಾಮಾನ",
    humidity: "ಆರ್ದ್ರತೆ",
    hazards: "ಆಪತ್ತು",
    emergencyStatus: "ಊರಜಾದು ಸ್ಥಿತಿ",
    postMessage: "ನೌಕರರಿಗೆ ಸಂದೇಶ ಹಾಕಿ",
    enterMessage: "ಸಂದೇಶವನ್ನು ಹಾಕಿ",
    emergencyAlert: "ಹುರಿದ್ರವನೆ ದಿನದ ಭರವಸೆ",
    emergencyForm: "ಜೋರಾಗಿ ಗಮನ ಪಡೆಯಲು ಸಂಪೂರ್ಣ",
    notifyEmergency: "ಹೌದು, ಸಂದರ್ಶನ",
    cancel: "ರದ್ದಾಯಿಸಲು",
    logout: "ಲಾಗ್ ಔಟ್",
  }
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // "worker" or "supervisor"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("english");

  const [data, setData] = useState(initialData);

  const handleLogin = () => {
    // sample authentication logic
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

  const handlePostMessage = () => {
    alert(`Message posted to all workers: "${message}"`);
    setMessage("");
  };

  const handleEmergencyNotification = () => {
    alert("🚨 Emergency services notified!");
    setShowEmergencyForm(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole("");
    setUsername("");
    setPassword("");
    setMessage("");
    setShowEmergencyForm(false);
  };

  return (
    <div className="app-container">
      <div className="language-selection">
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="english">English</option>
          <option value="hindi">हिंदी</option>
          <option value="tamil">தமிழ்</option>
          <option value="malayalam">മലയാളം</option>
          <option value="kannada">ಕನ್ನಡ</option>
        </select>
      </div>

      {!loggedIn ? (
        <div className="login-container">
          <h1>{translations[language].login}</h1>
          <div>
            <input
              type="text"
              placeholder={translations[language].username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder={translations[language].password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <button onClick={handleLogin} className="login-button">
            {translations[language].login}
          </button>
        </div>
      ) : (
        <div className="dashboard-container">
          <h1>
            {translations[language].welcome}{" "}
            {role === "worker" ? translations[language].worker : translations[language].supervisor}
          </h1>

          {role === "worker" ? (
            <div>
              <h2>{translations[language].currentStatus}</h2>
              <p>{translations[language].temperature}: {data.temperature}°C</p>
              <p>{translations[language].humidity}: {data.humidity}%</p>
              <h3>{translations[language].hazards}:</h3>
              <ul>
                {data.hazards.map((hazard, index) => (
                  <li key={index}>{hazard}</li>
                ))}
              </ul>
              <p>{translations[language].emergencyStatus}: {data.emergencyStatus}</p>
            </div>
          ) : (
            <div>
              <h2>{translations[language].postMessage}</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={translations[language].enterMessage}
                rows="4"
                cols="50"
                className="textarea"
              />
              <button onClick={handlePostMessage} className="post-message-button">
                {translations[language].postMessage}
              </button>
              <h3>{translations[language].emergencyAlert}</h3>
              <button
                onClick={() => setShowEmergencyForm(true)}
                className="emergency-button"
              >
                {translations[language].emergencyAlert}
              </button>
            </div>
          )}

          {showEmergencyForm && (
            <div className="emergency-form-container">
              <h2>{translations[language].emergencyForm}</h2>
              <p>{translations[language].notifyEmergency}</p>
              <button
                onClick={handleEmergencyNotification}
                className="yes-btn"
              >
                {translations[language].notifyEmergency}
              </button>
              <button
                onClick={() => setShowEmergencyForm(false)}
                className="cancel-btn"
              >
                {translations[language].cancel}
              </button>
            </div>
          )}

          <button onClick={handleLogout} className="logout-button">
            {translations[language].logout}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;