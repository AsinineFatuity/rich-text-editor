import {Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import CloudHosted from './pages/cloudHosted';
import SelfHosted from './pages/selfHosted';
import TenantEditDocument from './pages/tenantEdit';
import { Home } from './pages/home';
import SignaturePad from './pages/signaturePad';
import { url } from './urls';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
         <Route exact path={url.home} element={<Home/>}/>
         <Route exact path={url.cloudHosted} element={<CloudHosted/>}/>
         <Route exact path={url.selfhosted} element={<SelfHosted/>}/>
         <Route exact path={url.signaturePad} element={<SignaturePad/>}/>
         <Route exact path={url.tenantEdit} element={<TenantEditDocument/>}/>
         <Route path="*" element={<Navigate to={url.home}/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;

