import { useForm } from 'react-hook-form';
import api from '@/utils/api';
import { useState } from 'react';

export default function AddSchool(){
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMsg('');
    try {
      const formData = new FormData();
      Object.keys(data).forEach(k => {
        if(k !== 'image') formData.append(k, data[k]);
      });
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const res = await api.post('/api/schools', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMsg('School added successfully!');
      reset();
    } catch (e) {
      setMsg('Failed to add school.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-8">
      <div className="card max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add School</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">School Name</label>
            <input className="input" placeholder="e.g., Greenwood High"
              {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">Address</label>
            <input className="input" placeholder="123 Street"
              {...register('address', { required: 'Address is required' })} />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">City</label>
              <input className="input" placeholder="City"
                {...register('city', { required: 'City is required' })} />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="label">State</label>
              <input className="input" placeholder="State"
                {...register('state', { required: 'State is required' })} />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Contact Number</label>
              <input className="input" placeholder="10-digit number"
                {...register('contact', { 
                  required: 'Contact is required',
                  pattern: { value: /^[0-9]{10,15}$/, message: 'Enter 10-15 digits' }
                })} />
              {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact.message}</p>}
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" placeholder="name@example.com"
                {...register('email_id', { 
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                })} />
              {errors.email_id && <p className="text-red-600 text-sm mt-1">{errors.email_id.message}</p>}
            </div>
          </div>
          <div>
            <label className="label">School Image</label>
            <input type="file" accept="image/*" className="input"
              {...register('image')} />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save School'}
          </button>
          {msg && <p className="mt-3">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
