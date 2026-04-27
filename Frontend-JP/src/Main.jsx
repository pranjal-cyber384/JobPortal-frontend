import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext.jsx';
import { JobProvider } from './Context/JobContext.jsx';
import { ApplicationProvider } from './Context/ApplicationContext.jsx';
import { AdminProvider } from './Context/AdminContext.jsx';
createRoot(document.getElementById('root')).render(
<StrictMode>
    <BrowserRouter>
    <AuthProvider>
     <JobProvider>
      <ApplicationProvider>
        <AdminProvider>
       <App/>
       </AdminProvider>
    </ApplicationProvider>
     </JobProvider>
    </AuthProvider>
    </BrowserRouter>
</StrictMode>

);