export function StationCode({ code, className }: { code: string; className?: string }) {
  return <span className={className ? `code ${className}` : "code"}>{code}</span>;
}
