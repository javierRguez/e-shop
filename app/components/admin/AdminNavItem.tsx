import { type IconType } from 'react-icons';

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected = false,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`flex cursor-pointer items-center justify-center gap-1 border-b-2
  p-2 text-center transition hover:text-slate-800 ${
    selected
      ? 'border-b-slate-800 text-slate-800'
      : 'border-transparent text-slate-500'
  }`}
    >
      <Icon size={20} />
      <div className='break-normal text-center text-sm font-medium'>
        {label}
      </div>
    </div>
  );
};

export default AdminNavItem;
