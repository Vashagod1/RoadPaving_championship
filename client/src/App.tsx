import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Sites from "./pages/Sites.tsx";
import Alert from "./pages/Alert.tsx";
import {MapBlock} from "./features/MapBlock.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="sites" element={<Sites />} />
                <Route path="map" element={<MapBlock />} />
                <Route path="alerts" element={<Alert />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;