export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-vault-surface border border-vault-border" />
      <div className="pt-4 space-y-2">
        <div className="h-2.5 w-16 bg-vault-surface-2 rounded" />
        <div className="h-3.5 w-3/4 bg-vault-surface-2 rounded" />
        <div className="h-3 w-1/3 bg-vault-surface-2 rounded" />
      </div>
    </div>
  );
}
