import { IconType } from "react-icons";

interface SummaryCardProps {
  icon: IconType;
  value: number;
  label: string;
  color: string;
}

const SummaryCard = ({ icon: Icon, value, label, color }: SummaryCardProps) => (
  <div className="p-4 bg-white shadow rounded-lg flex flex-col items-center">
    <Icon className={`text-${color}-500 text-3xl`} />
    <p className="text-lg font-bold">{value}</p>
    <span className="text-gray-500">{label}</span>
  </div>
);

export default SummaryCard;
