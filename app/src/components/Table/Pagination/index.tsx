import React, { memo } from 'react';
import PaginationItem from './PaginationItem';

interface PaginationProps {
  totalCountOfRegister: number;
  registerPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  offsetLabel: string;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

const Pagination: React.FC<PaginationProps> = ({
  totalCountOfRegister,
  currentPage,
  onPageChange,
  registerPerPage,
  offsetLabel,
}: PaginationProps) => {
  const lastPage = Math.ceil(totalCountOfRegister / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];
  return (
    <section className="flex items center justify-between mt-8 gap-6">
      <div>
        <strong>{registerPerPage * currentPage - registerPerPage + 1}</strong> -{' '}
        <strong>{registerPerPage * currentPage}</strong> {offsetLabel}{' '}
        <strong>
          {new Intl.NumberFormat('en-US').format(totalCountOfRegister)}
        </strong>
      </div>
      <div className="flex gap-2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <p className="text-gray-400 text-center">...</p>
            )}
          </>
        )}
        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          ))}
        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />
        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <p className="text-gray-400 text-center">...</p>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </div>
    </section>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
  registerPerPage: 10,
};

export default memo(Pagination);
