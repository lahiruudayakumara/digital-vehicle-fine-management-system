import { BlacklistEntry } from "@/types/blacklist";

const BlackListTable = ({
  blackList,
  onClick,
}: {
  blackList: BlacklistEntry[];
  onClick: (id: string) => void;
}) => (
  <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-200 text-gray-700">
        <tr>
          {[
            "blackList ID",
            "Name",
            "License No",
            "Date",
            "Reason",
            "Points",
            "Status",
          ].map((header) => (
            <th key={header} className="p-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {blackList.map((entry) => (
          <tr key={entry.id} className="border-t border-gray-200">
            {Object.entries(entry).map(([, value], idx) => (
              <td
                key={idx}
                className="p-3 cursor-pointer"
                onClick={() => onClick(entry.license)}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BlackListTable;
