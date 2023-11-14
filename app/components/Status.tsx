import { type IconType } from 'react-icons';

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div className={`${bg} ${color} flex items-center gap-1 rounded px-1`}>
      {text}
      <Icon size={15} />
    </div>
  );
};

export default Status;
