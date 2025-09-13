import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Nav(){
  const token = useSelector(s=>s.auth.token);
  const dispatch = useDispatch();
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/customers">Customers</Link>
      {token ? (
        <button onClick={()=>dispatch(logout())}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
