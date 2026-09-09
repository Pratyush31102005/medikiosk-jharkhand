import {createRoot} from 'react-dom/client';
import MediKiosk from '../app/medikiosk';
import '../app/globals.css';
import './fonts.css';

createRoot(document.getElementById('root')!).render(<MediKiosk />);
