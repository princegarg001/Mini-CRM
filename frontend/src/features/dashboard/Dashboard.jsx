import { useSelector } from 'react-redux';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useGetLeadStatsQuery } from '../../api/baseApi';
import { useListCustomersQuery } from '../customers/customerApi';

export default function Dashboard() {
  const user = useSelector((s) => s.auth.user);
  const { data: customerData } = useListCustomersQuery({ page: 1, limit: 5 });
  const items = customerData?.items || [];
  const { data: statsData, isLoading } = useGetLeadStatsQuery();

  // statsData from API is an array: [{status: 'New', count: 2, ...}, ...]
  // Convert to object: { New: 2, ... }
  const statsObj = Array.isArray(statsData)
    ? statsData.reduce((acc, s) => { acc[s.status] = s.count; return acc; }, {})
    : { New: 0, Contacted: 0, Converted: 0, Lost: 0 };
  const stats = { New: 0, Contacted: 0, Converted: 0, Lost: 0, ...statsObj };
  const chartData = Object.entries(stats).map(([name, value]) => ({ name, value }));

  return (
    <div className="crm-dashboard">
      <div className="crm-dashboard-header">
        <h2>Welcome back, <span className="crm-dashboard-user">{user?.name || 'User'}</span> 👋</h2>
        <p className="crm-dashboard-sub">Here's a quick look at your CRM stats.</p>
      </div>
      <div className="crm-dashboard-cards">
        <div className="crm-dashboard-card">
          <div className="crm-dashboard-card-title">Customers</div>
          <div className="crm-dashboard-card-value">{items.length}</div>
        </div>
        <div className="crm-dashboard-card">
          <div className="crm-dashboard-card-title">Leads</div>
          <div className="crm-dashboard-card-value">{Object.values(stats).reduce((a,b)=>a+b,0)}</div>
        </div>
        <div className="crm-dashboard-card">
          <div className="crm-dashboard-card-title">Converted</div>
          <div className="crm-dashboard-card-value">{stats.Converted || 0}</div>
        </div>
        <div className="crm-dashboard-card">
          <div className="crm-dashboard-card-title">Lost</div>
          <div className="crm-dashboard-card-value">{stats.Lost || 0}</div>
        </div>
      </div>
      <div className="crm-dashboard-chart-area">
        <h3 className="crm-dashboard-chart-title">Lead Status Overview</h3>
        <div className="crm-dashboard-chart">
          {isLoading ? (
            <div style={{textAlign:'center',color:'#6366f1',fontWeight:600}}>Loading chart...</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie dataKey="value" data={chartData} label outerRadius={80} />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
