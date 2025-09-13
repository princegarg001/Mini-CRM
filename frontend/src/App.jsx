import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import AuthGuard from './features/auth/AuthGuard';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import CustomerDetail from './features/customers/CustomerDetail';
import CustomersList from './features/customers/CustomersList';
import Dashboard from './features/dashboard/Dashboard';

export default function App() {
  return (
    <div className="crm-root">
      <aside className="crm-sidebar">
        <div className="crm-logo">
          <img src="/images/OIP (2).jpeg" alt="CRM Logo" />
          <span>Mini CRM</span>
        </div>
        <Nav />
      </aside>
      <main className="crm-main">
        <header className="crm-header">
          <h1>Mini CRM</h1>
        </header>
        <section className="crm-content">
          <Routes>
            <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/customers" element={<AuthGuard><CustomersList /></AuthGuard>} />
            <Route path="/customers/:id" element={<AuthGuard><CustomerDetail /></AuthGuard>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}
