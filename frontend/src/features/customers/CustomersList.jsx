import { useState } from 'react';
import { useListCustomersQuery, useCreateCustomerMutation, useDeleteCustomerMutation } from './customerApi';
import CustomerForm from './CustomerForm';
import { Link } from 'react-router-dom';

export default function CustomersList(){
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const { data } = useListCustomersQuery({ page, q, limit: 10 });
  const [createCustomer] = useCreateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  return (
    <div>
      <h2>Customers</h2>
      <div>
        <input placeholder="Search name/email" value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={()=>setPage(1)}>Search</button>
      </div>
      <CustomerForm onSubmit={createCustomer} />
      <ul>
        {data?.items?.map(c => (
          <li key={c._id}>
            <Link to={`/customers/${c._id}`}>{c.name}</Link> — {c.email}
            <button onClick={()=>deleteCustomer(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span> Page {data?.page} / {data?.pages} </span>
        <button disabled={data && data.page >= data.pages} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  );
}
