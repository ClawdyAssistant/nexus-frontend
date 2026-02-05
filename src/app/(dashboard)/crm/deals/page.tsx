import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deals Pipeline</h1>
          <p className="text-gray-600">Track your sales opportunities</p>
        </div>
        <Button>Add Deal</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {['Qualified', 'Proposal', 'Negotiation', 'Closed'].map((stage) => (
          <Card key={stage}>
            <CardHeader>
              <CardTitle className="text-base">{stage}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">No deals in this stage</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
