'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as Select from '@base-ui/react/select';

const sortOptions = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'pricePerNight', label: 'Price' },
];

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'createdAt';

  const currentLabel = sortOptions.find((o) => o.value === currentSort)?.label ?? 'Newest';

  return (
    <Select.Select.Root value={currentSort} onValueChange={(value) => {
      if (value) router.push(`/rooms?sort=${value}`);
    }}>
      <Select.Select.Trigger className="w-24 px-2 py-1 rounded bg-white hover:bg-gray-50 cursor-pointer flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
        <span className='text-gray-600 text-lg'>{currentLabel}</span>
        <span className='text-gray-600'>▼</span>
      </Select.Select.Trigger>

      <Select.Select.Portal>
        <Select.Select.Positioner>
          <Select.Select.Popup className="w-24 bg-white rounded shadow-lg z-50">
            <Select.Select.List>
              {sortOptions.map((option) => (
                <Select.Select.Item
                  key={option.value}
                  value={option.value}
                  className="px-4 py-2 text-lg cursor-pointer hover:bg-gray-100 text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <Select.Select.ItemText>{option.label}</Select.Select.ItemText>
                </Select.Select.Item>
              ))}
            </Select.Select.List>
          </Select.Select.Popup>
        </Select.Select.Positioner>
      </Select.Select.Portal>
    </Select.Select.Root>
  );
}