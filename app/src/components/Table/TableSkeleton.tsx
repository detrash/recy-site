const TableSkelton: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 animate-pulse">
      {new Array(9).fill(0).map((_i, index) => (
        <div key={`loading-${index}`} className="bg-slate-200 h-2"></div>
      ))}
    </div>
  );
};

export default TableSkelton;
