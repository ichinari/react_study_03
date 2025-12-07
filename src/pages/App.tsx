import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@routes/Router.tsx';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;
