import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { ResidueType } from 'src/graphql/generated/graphql';
import { USER_WASTE_TYPES } from 'src/utils/constants';
import { formatNumber } from 'src/utils/formatNumber';
import TableComponent, { ColumnProps } from '../Table';
import { UsersType } from './ActiveUsersTable';

type FormDetail = UsersType['forms'][0];

type UserFormDetailsProps = {
  formDetails: FormDetail[];
  isLoading?: boolean;
  hasError?: boolean;
};

type UsersFormType = {
  id: string;
  [ResidueType.Glass]: number;
  [ResidueType.Paper]: number;
  [ResidueType.Plastic]: number;
  [ResidueType.Metal]: number;
  [ResidueType.Organic]: number;
  [ResidueType.Textile]: number;
  [ResidueType.Landfill_Waste]: number;
};

const UserFormDetails: React.FC<UserFormDetailsProps> = ({
  formDetails,
  hasError = false,
  isLoading = false,
}) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const [page, setPage] = useState(1);
  const [rowsCount, setRowsCount] = useState(5);

  const formattedData = useMemo(() => {
    const formatData = formDetails.map((formDetail) => {
      const findResidue = (residueType: ResidueType) =>
        formDetail.documents.find(
          (documentType) => documentType.residueType === residueType
        );

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
    return formatData as UsersFormType[];
  }, [formDetails]);

  const columns = useMemo<ColumnProps<UsersFormType>>(() => {
    return [
      {
        key: 'id',
        title: 'ID',
      },
      ...USER_WASTE_TYPES.map((wasteType) => {
        return {
          key: wasteType.key,
          title: `${t(wasteType.value.toLowerCase())} Kgs`,
          cell: (form: UsersFormType) => {
            const amount = formatNumber(form[wasteType.key] || 0, locale);
            return <p>{`${amount} Kgs`}</p>;
          },
        };
      }),
    ];
  }, [locale, t]);

  const dataByPage =
    formattedData?.slice((page - 1) * rowsCount, rowsCount * page) || [];

  return (
    <TableComponent<UsersFormType>
      allData={formattedData || []}
      columns={columns as any}
      data={dataByPage}
      error={hasError}
      isLoading={isLoading}
      onPageChange={(newPage) => setPage(newPage)}
      page={page}
      rowsCount={rowsCount}
      setRowsCount={(newRowsCount) => {
        setPage(1);
        setRowsCount(newRowsCount);
      }}
      totalCount={formDetails?.length || 0}
    />
  );
};

export default UserFormDetails;
