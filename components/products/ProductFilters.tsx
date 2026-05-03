'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { label: 'All Items', value: null },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Handbags', value: 'handbags' },
  { label: 'Watches', value: 'watches' },
  { label: 'Jewelry', value: 'jewelry' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Shoes', value: 'shoes' },
];

interface ProductFiltersProps {
  activeType?: string;
}

export default function ProductFilters({ activeType }: ProductFiltersProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function buildHref(type: string | null): string {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase text-vault-muted mb-4 font-medium">
        Category
      </p>
      <ul className="space-y-1">
        {CATEGORIES.map((cat) => {
          const isActive = cat.value === (activeType ?? null);
          return (
            <li key={cat.label ?? 'all'}>
              <Link
                href={buildHref(cat.value)}
                className={`flex items-center justify-between py-2 px-3 text-sm transition-all duration-200 border ${
                  isActive
                    ? 'border-vault-gold text-vault-gold bg-vault-gold/5'
                    : 'border-transparent text-vault-muted hover:text-vault-text hover:border-vault-border'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-vault-gold" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
