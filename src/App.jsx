import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ConvertToIslam from './pages/ConvertToIslam';
import ClassesForNonMuslims from './pages/ClassesForNonMuslims';
import Shahadah from './pages/Shahadah';
import Branches from './pages/Branches';
import BranchDetail from './pages/BranchDetail';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert-to-islam-malaysia" element={<ConvertToIslam />} />
        <Route path="/classes-for-non-muslims" element={<ClassesForNonMuslims />} />
        <Route path="/shahadah-guidance" element={<Shahadah />} />
        <Route path="/hidayah-centre-branches" element={<Branches />} />
        <Route path="/branches/:city" element={<BranchDetail />} />

      </Routes>
    </Layout>
  );
}

export default App;
