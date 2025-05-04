import { createRoot } from 'react-dom/client'; // For rendering the app
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // For handling routes
import { Provider } from 'react-redux'; // Import the Redux Provider
import Store from './store/dashboardStore.js';
//import store from './store'; // Import your Redux store

// Render the application
createRoot(document.getElementById('root')).render(
    <Provider store={Store}> {/* Wrap the app with the Redux Provider */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);