import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

const DashboardCard = ({ title, children }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
