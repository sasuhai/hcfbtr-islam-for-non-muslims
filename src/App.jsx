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
        {/* Simplified Routing with Language Prefix */}
        <Route path="/" element={<Home />} />
        <Route path="/:lang" element={<Home />} />

        <Route path="/convert-to-islam-malaysia" element={<ConvertToIslam />} />
        <Route path="/:lang/convert-to-islam-malaysia" element={<ConvertToIslam />} />

        <Route path="/classes-for-non-muslims" element={<ClassesForNonMuslims />} />
        <Route path="/:lang/classes-for-non-muslims" element={<ClassesForNonMuslims />} />

        {/* Other Pages */}
        <Route path="/hidayah-centre-branches" element={<Branches />} />
        <Route path="/:lang/hidayah-centre-branches" element={<Branches />} />

        <Route path="/branches/:city" element={<BranchDetail />} />
        <Route path="/:lang/branches/:city" element={<BranchDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/:lang/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/:lang/admin" element={<AdminDashboard />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/:lang/blog" element={<Blog />} />

        <Route path="/donate" element={<Donate />} />
        <Route path="/:lang/donate" element={<Donate />} />

        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/:lang/volunteer" element={<Volunteer />} />

        <Route path="/journey" element={<Journey />} />
        <Route path="/:lang/journey" element={<Journey />} />

        <Route path="/about" element={<About />} />
        <Route path="/:lang/about" element={<About />} />
      </Routes>
    </Layout>
  );
}

export default App;
