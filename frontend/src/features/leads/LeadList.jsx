import { useState } from 'react';
import { useListLeadsQuery, useCreateLeadMutation, useDeleteLeadMutation } from '../customers/customerApi';
import LeadForm from './LeadForm';

export default function LeadList({ customerId }){
  const [status, setStatus] = useState('');
  const { data } = useListLeadsQuery({ customerId, status: status || undefined });
  const [createLead] = useCreateLeadMutation();
  const [deleteLead] = useDeleteLeadMutation();

  return (
    <div>
      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="">All</option>
        <option>New</option>
        <option>Contacted</option>
        <option>Converted</option>
        <option>Lost</option>
      </select>
      <LeadForm onSubmit={(body)=>createLead({ customerId, ...body })} />
      <ul>
        {data?.map(l => (
          <li key={l._id}>
            <b>{l.title}</b> — {l.status} — ₹{l.value}
            <button onClick={()=>deleteLead({ customerId, leadId: l._id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
