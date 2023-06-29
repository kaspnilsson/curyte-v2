interface Props {
  title: string;
  description: string;
}
export const PageHeader = ({ title, description }: Props) => (
  <div className="flex flex-col items-start gap-2">
    <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
      {title}
    </h1>
    <p className="text-lg text-muted-foreground">{description}</p>
  </div>
);
