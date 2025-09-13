import { useForm } from 'react-hook-form';

export default function CustomerForm({ onSubmit, existing }){
  const { register, handleSubmit, reset } = useForm({ defaultValues: existing });
  const submit = async (data) => { const res = await onSubmit(data); if (!res.error) reset(); };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <input placeholder="Name" {...register('name')} />
      <input placeholder="Email" {...register('email')} />
      <input placeholder="Phone" {...register('phone')} />
      <input placeholder="Company" {...register('company')} />
      <button>{existing? 'Update' : 'Add'}</button>
    </form>
  );
}
