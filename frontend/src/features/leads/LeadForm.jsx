import { useState } from 'react';
import { useForm } from 'react-hook-form';


export default function LeadForm({ onSubmit, existing }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: existing || { status: 'New', value: 0 }
  });
  const [serverError, setServerError] = useState(null);
  const submit = async (data) => {
    setServerError(null);
    try {
      const res = await onSubmit(data);
      if (res?.error) {
        // RTK Query error shape
        setServerError(res.error.data?.message || res.error.error || 'Failed to add lead');
      } else {
        reset();
      }
    } catch (err) {
      setServerError(err.message || 'Failed to add lead');
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="crm-lead-form">
      {serverError && <div className="crm-lead-error" style={{marginBottom:8}}>{serverError}</div>}
      <div className="crm-lead-form-group">
        <input
          placeholder="Title"
          {...register('title', { required: 'Title is required' })}
          className={errors.title ? 'crm-lead-input error' : 'crm-lead-input'}
        />
        {errors.title && <span className="crm-lead-error">{errors.title.message}</span>}
      </div>
      <div className="crm-lead-form-group">
        <input
          placeholder="Description"
          {...register('description')}
          className="crm-lead-input"
        />
      </div>
      <div className="crm-lead-form-group">
        <select
          {...register('status', { required: 'Status is required' })}
          className={errors.status ? 'crm-lead-input error' : 'crm-lead-input'}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
        {errors.status && <span className="crm-lead-error">{errors.status.message}</span>}
      </div>
      <div className="crm-lead-form-group">
        <input
          type="number"
          step="0.01"
          placeholder="Value"
          {...register('value', { required: 'Value is required', valueAsNumber: true, min: { value: 0, message: 'Value must be positive' } })}
          className={errors.value ? 'crm-lead-input error' : 'crm-lead-input'}
        />
        {errors.value && <span className="crm-lead-error">{errors.value.message}</span>}
      </div>
      <button type="submit" disabled={isSubmitting} className="crm-lead-btn">
        {existing ? 'Update' : isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
