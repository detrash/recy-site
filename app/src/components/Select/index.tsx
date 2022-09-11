type SelectProps = {
  items: string[];
  selected: string;
  setSelected: (item: any) => void;
};

export const Select: React.FC<SelectProps> = ({
  items,
  selected,
  setSelected,
}) => {
  return (
    <select
      value={selected}
      className="select select-bordered"
      onChange={(value) => setSelected(value.target.value)}
    >
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
