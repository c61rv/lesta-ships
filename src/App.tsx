import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import VehicleListPage from './pages/ShipListPage/ShipListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<VehicleListPage />} />
          <Route path="*" element={<div>404: Страница не найдена</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;