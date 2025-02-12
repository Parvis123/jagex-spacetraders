interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight lg:text-6xl text-zinc-50 capitalize">
        {title}
      </h1>
      <p className="text-zinc-200">{description}</p>
    </div>
  );
};

export default PageHeader;
