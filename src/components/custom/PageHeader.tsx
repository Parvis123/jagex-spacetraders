interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-zinc-50">
        {title}
      </h1>
      <p className="text-lg text-zinc-200">{description}</p>
    </div>
  );
};

export default PageHeader;
