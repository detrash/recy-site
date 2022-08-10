import classNames from 'classnames';
import { ArrowUp } from 'phosphor-react';
import React, { ReactNode, useCallback, useState } from 'react';

interface HeadProps {
  columns: {
    key: number | symbol | string;
    title: string;
  }[];
  additionalFeature?: boolean;
  handleSortBy: (sortBy: 'asc' | 'desc', accessor: string) => void;
}

type HeadCellProps = {
  accessor: string;
  children: ReactNode;
  handleSortBy: (sortBy: 'asc' | 'desc', accessor: string) => void;
};

const HeaderCell = ({ children, handleSortBy, accessor }: HeadCellProps) => {
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [hasClicked, setHasClicked] = useState(false);

  const handleOnClick = useCallback(() => {
    setSortBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    handleSortBy(sortBy, accessor);
  }, [accessor, handleSortBy, sortBy]);

  return (
    <th
      className="cursor-pointer transition-colors duration-150 bg-white border-b pb-1 text-gray-500 relative select-none"
      onClick={handleOnClick}
    >
      <div className="flex items-center">
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
            key={String(column.key)}
            handleSortBy={handleSortBy}
          >
            {column.title}
          </HeaderCell>
        ))}
        {additionalFeature && <th />}
      </tr>
    </thead>
  );
};

export default TableHeader;
