import classNames from 'classnames';
import { ArrowUp } from 'phosphor-react';
import React, { ReactNode, useCallback, useState } from 'react';

interface HeadProps {
  columns: {
    key: number | symbol | string;
    title: string;
    headerPosition?: 'center';
  }[];
  additionalFeature?: boolean;
  handleSortBy: (sortBy: 'asc' | 'desc', accessor: string) => void;
}

type HeadCellProps = {
  accessor: string;
  children: ReactNode;
  handleSortBy: (sortBy: 'asc' | 'desc', accessor: string) => void;
  headerPosition?: 'center';
};

const HeaderCell = ({
  children,
  handleSortBy,
  accessor,
  headerPosition,
}: HeadCellProps) => {
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');

  const handleOnClick = useCallback(() => {
    setSortBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    handleSortBy(sortBy, accessor);
  }, [accessor, handleSortBy, sortBy]);

  return (
    <th
      className="cursor-pointer uppercase text-xs font-bold transition-colors duration-150 bg-white border-b pt-4 px-4 pb-1 text-gray-500 select-none"
      onClick={handleOnClick}
    >
      <div
        className={classNames('flex items-center', {
          'justify-center': headerPosition === 'center',
        })}
      >
        {children}
        <span>
          <ArrowUp
            className={classNames('w-6 h-6 transition-all duration-150', {
              'rotate-180': sortBy === 'desc',
            })}
          />
        </span>
      </div>
    </th>
  );
};

const TableHeader: React.FC<HeadProps> = ({
  columns,
  additionalFeature = false,
  handleSortBy,
}: HeadProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <HeaderCell
            accessor={String(column.key)}
            handleSortBy={handleSortBy}
            {...column}
            key={String(column.key)}
          >
            {column.title}
          </HeaderCell>
        ))}
        {additionalFeature && <th className="border-b pt-4 px-4 pb-1" />}
      </tr>
    </thead>
  );
};

export default TableHeader;
