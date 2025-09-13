import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './features/dashboard/Dashboard';
import CustomersList from './features/customers/CustomersList';
import CustomerDetail from './features/customers/CustomerDetail';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import AuthGuard from './features/auth/AuthGuard';

export default function App(){
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<AuthGuard><Dashboard/></AuthGuard>} />
        <Route path="/customers" element={<AuthGuard><CustomersList/></AuthGuard>} />
        <Route path="/customers/:id" element={<AuthGuard><CustomerDetail/></AuthGuard>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}
