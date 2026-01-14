import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ConvertToIslam from './pages/ConvertToIslam';
import ClassesForNonMuslims from './pages/ClassesForNonMuslims';

import Branches from './pages/Branches';
import BranchDetail from './pages/BranchDetail';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import Journey from './pages/Journey';
import About from './pages/About';
import Login from './pages/Login';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert-to-islam-malaysia" element={<ConvertToIslam />} />
        <Route path="/classes-for-non-muslims" element={<ClassesForNonMuslims />} />

        <Route path="/hidayah-centre-branches" element={<Branches />} />
        <Route path="/branches/:city" element={<BranchDetail />} />

        {/* Authentication & Admin */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Other Pages */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Layout>
  );
}

export default App;
