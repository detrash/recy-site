import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import {
  ResidueType,
  useAggregateFormTypesQuery,
} from 'src/graphql/generated/graphql';
import { USER_WASTE_TYPES } from 'src/utils/constants';
import { formatNumber } from 'src/utils/formatNumber';
import TableComponent, { ColumnProps } from '../Table';

type AggregateUsersFormType = {
  id: string;
  [ResidueType.Glass]: number;
  [ResidueType.Paper]: number;
  [ResidueType.Plastic]: number;
  [ResidueType.Metal]: number;
  [ResidueType.Organic]: number;
  [ResidueType.Textile]: number;
  [ResidueType.Landfill_Waste]: number;
};

const AggregateUsersTypeTable: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);

  const { data, error, loading: isLoading } = useAggregateFormTypesQuery();

  const formattedData = useMemo(() => {
    const formatData = data?.aggregateFormByUserProfile.map((formDetail) => {
      const findResidue = (residueType: ResidueType) =>
        formDetail.data.find((residue) => residue.residueType === residueType);

      const residues = USER_WASTE_TYPES.reduce((allWaste, wasteType) => {
        return {
          ...allWaste,
          [wasteType.key]: findResidue(wasteType.key)?.amount || 0,
        };
      }, {});

      return {
        id: formDetail.id,
        ...residues,
      };
    });
    return formatData as AggregateUsersFormType[];
  }, [data?.aggregateFormByUserProfile]);

  const dataByPage =
    formattedData?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  const columns = useMemo<ColumnProps<AggregateUsersFormType>>(() => {
    return [
      {
        key: 'id',
        title: t('admin:user_type'),
        cell: (form) => {
          return <p>{t(`common:${form.id.toLowerCase()}`)}</p>;
        },
      },
      ...USER_WASTE_TYPES.map((wasteType) => {
        return {
          key: wasteType.key,
          title: `${t(`common:${wasteType.value.toLowerCase()}`)} Kgs`,
          cell: (form: AggregateUsersFormType) => {
            const amount = formatNumber(form[wasteType.key] || 0, locale);
            return <p>{`${amount} Kgs`}</p>;
          },
        };
      }),
    ];
  }, [locale, t]);

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
