import {Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import CloudHosted from './pages/cloudHosted';
import SelfHosted from './pages/selfHosted';
import { url } from './urls';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
         <Route exact path={url.cloudHosted} element={<CloudHosted/>}/>
         <Route exact path={url.selfhosted} element={<SelfHosted/>}/>
         <Route path="*" element={<Navigate to={url.selfhosted}/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;

