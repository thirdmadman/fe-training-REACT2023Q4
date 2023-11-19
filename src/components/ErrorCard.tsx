export function ErrorCard(props: { title: string; subtitle: string }) {
  const { title, subtitle } = props;

  return (
    <div className="flex min-w-full py-10 items-center justify-center">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
