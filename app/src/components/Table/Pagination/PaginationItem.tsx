import React, { memo } from 'react';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent = false,
  onPageChange,
  number,
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <button className="btn btn-sm text-xs w-4 bg-gray-100 btn-disabled">
        {number}
      </button>
    );
  }
  return (
    <button
      className="btn btn-sm btn-primary text-xs text-white w-4"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  );
};

export default memo(PaginationItem);
