import { MagnifyingGlass } from 'phosphor-react';
import React, { memo, useEffect, useState } from 'react';

type TableSearchProps = {
  handleOnSearch: (value: string) => void;
  placeholder: string;
};

const TableSearch: React.FC<TableSearchProps> = ({
  handleOnSearch,
  placeholder,
}: TableSearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    handleOnSearch(searchValue);
  }, [searchValue, handleOnSearch]);

  return (
    <div className="mb-3 flex justify-between items-center">
      <div className="form-control flex-1">
        <div className="input-group">
          <input
            type="text"
            placeholder={placeholder}
            className="input focus:outline-0 focus:border-primary border-gray-300 w-full sm:w-auto"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn btn-primary px-2">
            <MagnifyingGlass className="h-6 w-6 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TableSearch);
