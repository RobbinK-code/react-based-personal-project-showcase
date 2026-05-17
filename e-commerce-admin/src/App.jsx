import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProductDashboard from './components/ProductDashboard';
import AddProductForm from './components/AddProductForm';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee', display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Product Dashboard</Link>
        <Link to="/add-product">Add New Product</Link>
      </nav>

      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProductDashboard />} />
          <Route path="/add-product" element={<AddProductForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;