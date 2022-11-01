import { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';
import * as R from 'ramda';
import Pagination from './Pagination';
import TableHeader from './TableHeader';
import TableSearch from './TableSearch';
import TableSkelton from './TableSkeleton';

export type ColumnProps<ObjectType> = {
  cell?: (value: ObjectType) => JSX.Element;
  key: keyof ObjectType;
  title: string;
  headerPosition?: 'center';
}[];

interface TableComponentProps<ObjectType> {
  additionalFeature?: (value: ObjectType) => JSX.Element;
  allData?: ObjectType[];
  columns: ColumnProps<ObjectType>;
  data: ObjectType[];
  error: boolean;
  filtersElement?: JSX.Element;
  hasPagination?: boolean;
  hasSearch?: boolean;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  page: number;
  rowsCount: number;
  setRowsCount: (rows: number) => void;
  totalCount: number;
}

type FiltersProps = {
  sortBy: 'asc' | 'desc';
  accessor: string;
}[];

const TableComponent = <ObjectType extends { id: string }>({
  additionalFeature,
  allData = [],
  columns,
  data,
  error,
  filtersElement,
  hasPagination = true,
  hasSearch = true,
  isLoading,
  onPageChange,
  page,
  rowsCount,
  setRowsCount,
  totalCount,
}: TableComponentProps<ObjectType>): JSX.Element => {
  const { t } = useTranslation('common');
  const [sortedData, setSortedData] = useState<ObjectType[]>([]);

  const filters = useRef<FiltersProps>([]);

  useEffect(() => {
    if (data) {
      setSortedData(data);

      filters.current = columns.map((column) => ({
        accessor: String(column.key),
        sortBy: 'asc',
      }));
    }
  }, [columns, data]);

  // TO-DO, refactor sort
  const handleSortBy = useCallback(
    (sortBy: 'asc' | 'desc', accessor: string) => {
      const newSortBy = sortBy === 'asc' ? 'desc' : 'asc';

      filters.current = [
        { accessor, sortBy: newSortBy },
        ...filters.current.filter(
          (predicate) => predicate.accessor !== accessor
        ),
      ];
      const sort = R.sortWith(
        filters.current.map((filter) =>
          R[filter.sortBy === 'asc' ? 'ascend' : 'descend'](
            R.prop(filter.accessor) as any
          )
        ) as any
      );
      const sorted = sort(sortedData) as ObjectType[];
      setSortedData(sorted);
    },
    [sortedData]
  );

  const handleOnSearch = useCallback(
    (value: string) => {
      if (value.length) {
        setSortedData(() => {
          const dataResults = [...allData];

          const values = columns.reduce((acc, column) => {
            const filteredValues = dataResults.filter((dataResult) =>
              String(dataResult[column.key])
                .toLowerCase()
                .includes(value.toLowerCase())
            );

            filteredValues.forEach((fv) =>
              dataResults.splice(
                dataResults.findIndex(
                  (dataResult) => dataResult[column.key] === fv[column.key]
                ),
                1
              )
            );

            return [...filteredValues, ...acc];
          }, [] as any[]);

          return [...values];
        });
      } else {
        setSortedData(data);
      }
    },
    [allData, columns, data]
  );

  if (!isLoading && error) {
    return (
      <div>
        <h2 className="text-sm text-gray-400">Error while fetching data</h2>
      </div>
    );
  }

  if (isLoading) {
    return <TableSkelton />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        {hasSearch && (
          <TableSearch
            handleOnSearch={handleOnSearch}
            placeholder={t('table_search')}
          />
        )}
        {filtersElement}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader
            columns={columns}
            additionalFeature={!!additionalFeature}
            handleSortBy={handleSortBy}
          />

          <tbody>
            <>
              {sortedData &&
                sortedData.map((object) => (
                  <tr key={object.id}>
                    {columns.map(({ cell, key }) => {
                      const value = object[key] as any;

                      return cell ? (
                        <td className="border-0 p-4" key={key as string}>
                          {cell(object)}
                        </td>
                      ) : (
                        <td className="border-0 p-4" key={key as string}>
                          {value}
                        </td>
                      );
                    })}

                    {additionalFeature && <td>{additionalFeature(object)}</td>}
                  </tr>
                ))}
            </>
          </tbody>
        </table>
      </div>

      {sortedData && !sortedData.length && (
        <div>
          <p className="text-sm text-gray-400 p-3">No results found</p>
        </div>
      )}

      {hasPagination && (
        <>
          <Pagination
            totalCountOfRegister={totalCount}
            currentPage={page}
            onPageChange={onPageChange}
            registerPerPage={rowsCount}
            offsetLabel={t('table_offset')}
          />
          <div>
            <select
              className="select select-bordered focus:outline-0 max-w-xs"
              defaultValue={rowsCount}
              onChange={(e) => setRowsCount(Number(e.target.value))}
            >
              <option value={5}>{t('table_show')} 5</option>
              <option value={10}>{t('table_show')} 10</option>
              <option value={20}>{t('table_show')} 20</option>
              <option value={50}>{t('table_show')} 50</option>
            </select>
          </div>
        </>
      )}
    </>
  );
};

export default TableComponent;
