interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

const DashboardCard = ({ title, children }: DashboardCardProps) => {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
