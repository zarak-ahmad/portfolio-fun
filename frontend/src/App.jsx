import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FunProvider } from './context/FunContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <FunProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FunProvider>
  );
}
