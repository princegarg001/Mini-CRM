import { useForm } from 'react-hook-form';

export default function LeadForm({ onSubmit, existing }){
  const { register, handleSubmit, reset } = useForm({ defaultValues: existing || { status:'New' } });
  const submit = async (data) => { const res = await onSubmit(data); if (!res.error) reset(); };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <input placeholder="Title" {...register('title')} />
      <input placeholder="Description" {...register('description')} />
      <select {...register('status')}>
        <option>New</option>
        <option>Contacted</option>
        <option>Converted</option>
        <option>Lost</option>
      </select>
      <input type="number" step="0.01" placeholder="Value" {...register('value', { valueAsNumber: true })} />
      <button>{existing? 'Update' : 'Add'}</button>
    </form>
  );
}
