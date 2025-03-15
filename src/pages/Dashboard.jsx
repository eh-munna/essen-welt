import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, DollarSign, Users, Utensils } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-[#075E54] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Restaurant Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#128C7E] text-white">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Utensils size={30} />
            <span className="text-xl font-bold">120</span>
          </CardContent>
        </Card>

        <Card className="bg-[#25D366] text-white">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <DollarSign size={30} />
            <span className="text-xl font-bold">$5,400</span>
          </CardContent>
        </Card>

        <Card className="bg-[#075E54] text-white">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Users size={30} />
            <span className="text-xl font-bold">85</span>
          </CardContent>
        </Card>

        <Card className="bg-[#128C7E] text-white">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart size={30} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-between">
        <Button className="bg-[#25D366] text-white">Manage Menu</Button>
        <Button className="bg-[#128C7E] text-white">View Orders</Button>
      </div>
    </div>
  );
};

export default Dashboard;
