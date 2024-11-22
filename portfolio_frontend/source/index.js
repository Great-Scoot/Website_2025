// Import Bootstrap and my styles
import './styles/styles.scss';

// Import Font-Awesome
import './scripts/fontawesome/fontawesome.js';

// Import React
import React from 'react';
import {createRoot} from 'react-dom/client';

// Import content stage and router
import Stage from './scripts/stage.js';

// Create root and attach router
const root = createRoot(document.getElementById('root')).render(<Stage />);