import { useListCustomersQuery } from '../customers/customerApi';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

export default function Dashboard(){
  const user = useSelector(s=>s.auth.user);
  const { data } = useListCustomersQuery({ page:1, limit:5 });
  const items = data?.items || [];

  // demo stats – in a proper app you'd call a /reports endpoint
  const stats = JSON.parse(localStorage.getItem('leadStats') || '{"New":2,"Contacted":1,"Converted":1,"Lost":0}');
  const chartData = Object.entries(stats).map(([name, value])=>({ name, value }));

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Total customers (first page): {items.length}</p>
      <div style={{ width: 300, height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={chartData} label />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
