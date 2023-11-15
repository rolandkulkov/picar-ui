import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import background from '../../assets/images/background.png';
import './App.css';

function Menu() {
  return (
    <div>
      
    <img className="absolute img-fluid" src={background}/>
    <div className="menu">
        <ul>
            <li>
              <Link to="/">
                <button className="active">
                    PLAY
                </button>
              </Link>
            </li>
            <li>
            <Link to="/settings">
                <button>
                    SETTINGS
                </button>
            </Link>
            </li>
        </ul>
    </div>
    </div>
  );
}

function Home() {
  document.addEventListener('keydown', function(event) {
    // Prevent arrow keys from scrolling the page
    event.preventDefault();

    // Define key codes for arrow keys
    const arrowUp = 38;
    const arrowDown = 40;
    const arrowLeft = 37;
    const arrowRight = 39;

    // Get the key code from the event
    const keyCode = event.keyCode;

    // Send API requests based on arrow keys
    switch (keyCode) {
        case arrowUp:
            sendRequest('/forward');
            break;
        case arrowDown:
            sendRequest('/backwards');
            break;
        case arrowLeft:
            sendRequest('/left');
            break;
        case arrowRight:
            sendRequest('/right');
            break;
    }
});

function sendRequest(endpoint) {
    // Send a GET request to the Flask API
    fetch('http://192.168.1.6:5000' + endpoint, {
        method: 'GET',
        mode: 'no-cors',  // Próbáld ki a no-cors módot
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
  return (
    <div className='main'>
    <h2>Home</h2>
    </div>
  );
}

function Settings() {
  return (
    <div className='main'>
    <h2>Settings</h2>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
