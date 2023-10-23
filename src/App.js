import logo from './logo.svg';
import './App.css';
import { MsalProvider } from '@azure/msal-react';
import { Route, Routes } from 'react-router-dom';
import MainNavbar from "./components/MainNavbar";
import Sidebar from  "./components/Sidebar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";


const App = ({ instance }) => {
    
  return (
    <MsalProvider instance={instance}>
      <Sidebar />
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </MsalProvider>
  );
}

export default App;
