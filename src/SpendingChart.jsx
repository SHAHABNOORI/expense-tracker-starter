import { useMemo } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#F59E0B', '#4ADE80', '#60A5FA', '#F87171', '#C084FC', '#FB923C'];

function SpendingChart({ transactions }) {
  const data = useMemo(() => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3C3835" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#78716C', fontSize: 12 }}
            axisLine={{ stroke: '#3C3835' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#78716C', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={56}
          />
          <Tooltip
            contentStyle={{ background: '#1C1917', border: '1px solid #3C3835', borderRadius: '6px', color: '#F5F5F4', fontSize: '13px' }}
            cursor={{ fill: 'rgba(245, 158, 11, 0.06)' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Spending']}
          />
          <Bar dataKey="value" name="Amount" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
