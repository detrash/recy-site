type Item = {
  key: string;
  label: string;
};

type SelectProps = {
  items: Item[];
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
        <option key={item.key} value={item.key}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
