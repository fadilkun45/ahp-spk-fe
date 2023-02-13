import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Layout/DashboardLayout';
import Dashboard from './Page/Dashboard';
import PenilaianKandidat from './Page/PenilaianKandidat/PenilaianKandidat';
import LoadingScreen from "./components/Loading";
import PusatKontrolAkun from './Page/PusatKontrolAkun/PusatKontrolAkun';
import Kriteria from './Page/Kriteria/Kriteria';
import Login from './Page/Login';
import { useState } from 'react';
import Sesi from './Page/Sesi/Sesi';

function App() {
  const [isloading, setIsloading] = useState(false)
  
  return (
      <>

      {isloading && <LoadingScreen />}
      
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login setLoading={setIsloading} />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/kandidat-belom-dinilai" element={<PrivateRoute><PenilaianKandidat /></PrivateRoute>} />
        <Route path="/pusat-kontrol-akun" element={<PrivateRoute><PusatKontrolAkun setLoading={setIsloading} /></PrivateRoute>} />
        <Route path="/pusat-kontrol-ahp" element={<PrivateRoute><Kriteria setLoading={setIsloading} /></PrivateRoute>} />
        <Route path="/sesi-seleksi-programmer" element={<PrivateRoute><Sesi setLoading={setIsloading} /></PrivateRoute>} />
      </Routes>

    </BrowserRouter>
      </>
  );
}

export default App;
