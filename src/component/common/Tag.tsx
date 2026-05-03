interface TagProps {
  category: string;
  label: string;
  className?: string;
  categoryList: string[];
  addCategory?: (category: string) => void;
  deleteCategory?: (category: string) => void;
}

const Tag = ({ category, label, className, categoryList, addCategory, deleteCategory }: TagProps) => {
  const isSelected = categoryList.includes(category);
  
  return (
    <button
      className={`
        px-4 py-2 ${isSelected ? "bg-primary-2 hover:bg-primary-3 text-white" : "bg-white hover:bg-gray-300 text-gray-700" } rounded-full shadow text-sm
        flex items-center justify-center
        ${className}
      `}
      onClick={isSelected ? () => deleteCategory?.(category) : () => addCategory?.(category)}
    >
      {label}
    </button>
  );
};

export default Tag;
