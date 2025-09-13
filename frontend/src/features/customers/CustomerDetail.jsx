import { useParams } from 'react-router-dom';
import { useGetCustomerQuery, useUpdateCustomerMutation } from './customerApi';
import CustomerForm from './CustomerForm';
import LeadList from '../leads/LeadList';

export default function CustomerDetail(){
  const { id } = useParams();
  const { data } = useGetCustomerQuery(id);
  const [updateCustomer] = useUpdateCustomerMutation();
  if (!data) return null;
  return (
    <div>
      <h2>{data.name}</h2>
      <CustomerForm existing={data} onSubmit={(body)=>updateCustomer({ id, ...body })} />
      <h3>Leads</h3>
      <LeadList customerId={id} />
    </div>
  );
}
