type IconNode = [string, Record<string, string | number>][];

export function Icon({
  data,
  size = 28,
  className = "",
}: {
  data: IconNode;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {data.map(([tag, attrs], i) => {
        const Tag = tag as keyof React.JSX.IntrinsicElements;
        return <Tag key={i} {...attrs} />;
      })}
    </svg>
  );
}
