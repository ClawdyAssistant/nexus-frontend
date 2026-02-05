import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Package, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  // TODO: Fetch real data from API
  const stats = [
    {
      title: 'Total Leads',
      value: '245',
      change: '+12% from last month',
      icon: Users,
    },
    {
      title: 'Open Deals',
      value: '$45,200',
      change: '18 deals in pipeline',
      icon: DollarSign,
    },
    {
      title: 'Products',
      value: '156',
      change: '89% in stock',
      icon: Package,
    },
    {
      title: 'Low Stock Alerts',
      value: '7',
      change: 'Requires attention',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No recent activity to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
