import { useEffect, useState } from 'react';
import api from '@/utils/api';
import SchoolCard from '@/components/SchoolCard';

export default function ShowSchools(){
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/schools');
        setSchools(res.data || []);
      } catch (e) {
        setError('Failed to load schools');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Schools</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="grid-cards">
          {schools.map(s => <SchoolCard key={s.id} school={s} apiBase={apiBase} />)}
          {schools.length === 0 && <p>No schools found.</p>}
        </div>
      )}
    </main>
  );
}
