import {
  AggregateFormTypesQuery,
  useAggregateFormTypesQuery,
} from '@modules/app/graphql/generated/graphql';
import { useMemo, useState } from 'react';
import TableComponent, { ColumnProps } from '../Table';

type AggregateUsersFormType =
  AggregateFormTypesQuery['aggregateFormByUserProfile'][0]['data'] &
    AggregateFormTypesQuery['aggregateFormByUserProfile'][0];

const AggregateUsersTypeTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);

  const { data, error, loading: isLoading } = useAggregateFormTypesQuery();

  const formattedData = useMemo(() => {
    return data?.aggregateFormByUserProfile.map((formDetail) => ({
      id: formDetail.id,
      ...formDetail.data,
    })) as AggregateUsersFormType[];
  }, [data?.aggregateFormByUserProfile]);

  const dataByPage =
    formattedData?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  const columns = useMemo<ColumnProps<AggregateUsersFormType>>(() => {
    return [
      {
        key: 'id',
        title: 'Type',
      },
      {
        key: 'glassKgs',
        title: 'Glass Kgs',
        cell: (value) => {
          if (!value.glassKgs) return <p>0</p>;

          return <p>{value.glassKgs}</p>;
        },
      },
      {
        key: 'metalKgs',
        title: 'Metal Kgs',
        cell: (value) => {
          if (!value.metalKgs) return <p>0</p>;

          return <p>{value.metalKgs}</p>;
        },
      },
      {
        key: 'organicKgs',
        title: 'Organic Kgs',
        cell: (value) => {
          if (!value.organicKgs) return <p>0</p>;

          return <p>{value.organicKgs}</p>;
        },
      },
      {
        key: 'paperKgs',
        title: 'Paper Kgs',
        cell: (value) => {
          if (!value.paperKgs) return <p>0</p>;

          return <p>{value.paperKgs}</p>;
        },
      },
      {
        key: 'plasticKgs',
        title: 'Plastic Kgs',
        cell: (value) => {
          if (!value.plasticKgs) return <p>0</p>;

          return <p>{value.plasticKgs}</p>;
        },
      },
    ];
  }, []);

  return (
    <>
      <TableComponent<AggregateUsersFormType>
        hasPagination={false}
        hasSearch={false}
        columns={columns}
        data={dataByPage}
        error={!!error}
        isLoading={isLoading}
        onPageChange={(newPage) => setPage(newPage)}
        page={page}
        rowsCount={rowsCount}
        setRowsCount={(newRowsCount) => {
          setPage(1);
          setRowsCount(newRowsCount);
        }}
        totalCount={formattedData?.length || 0}
      />
    </>
  );
};

export default AggregateUsersTypeTable;
