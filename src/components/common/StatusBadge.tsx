import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  let dotColor = 'bg-slate-400';
  let textColor = 'text-slate-700';
  let bgColor = 'bg-slate-100';

  if (['active', 'delivered', 'paid', 'in stock', 'growth'].includes(normalized)) {
    dotColor = 'bg-emerald-500';
    textColor = 'text-emerald-800';
    bgColor = 'bg-emerald-50/80';
  } else if (['processing', 'pending', 'low stock', 'starter'].includes(normalized)) {
    dotColor = 'bg-amber-500';
    textColor = 'text-amber-800';
    bgColor = 'bg-amber-50/80';
  } else if (['shipped', 'confirmed', 'business'].includes(normalized)) {
    dotColor = 'bg-blue-500';
    textColor = 'text-blue-800';
    bgColor = 'bg-blue-50/80';
  } else if (['inactive', 'cancelled', 'out of stock'].includes(normalized)) {
    dotColor = 'bg-rose-500';
    textColor = 'text-rose-800';
    bgColor = 'bg-rose-50/80';
  }

  const px = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md ${bgColor} ${textColor} ${px}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} aria-hidden="true" />
      <span className="capitalize">{status}</span>
    </span>
  );
};
