import PaginationAdmin from "@/app/admin/_components/PaginationAdmin";

export type Column<T> = {
  header: React.ReactNode;
  cell: (item: T, index: number, totalCurrentItems: number) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export type TableType = "Users" | "Vehicles" | "Bookings";

type AdminTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  totalPages?: number;
  totalCount?: number;
  tableType: TableType;
  showPagination?: boolean;
  currentPage?: number;
  itemsPerPage?: number;
};

export function AdminTable<T extends { id: string }>({
  data,
  columns,
  totalPages,
  totalCount,
  tableType,
  showPagination = true,
  currentPage = 1,
  itemsPerPage = 10,
}: AdminTableProps<T>) {
  return (
    <section className="bg-white/60 backdrop-blur-3xl rounded-[2rem] overflow-hidden border border-white/60 shadow-xl shadow-rose-500/5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-4xl">
          <thead>
            <tr className="bg-accent text-black ">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-4 text-sm font-semibold text-slate-600 ${
                    col.headerClassName ? col.headerClassName : "text-left"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {data.length > 0 ? (
              data.map((item, rowIndex) => {
                const Index = (currentPage - 1) * itemsPerPage + rowIndex + 1;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-accent/30 transition-colors"
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-6 py-5 ${col.cellClassName || ""}`}
                      >
                        {col.cell(item, Index, data.length)}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-7 text-center text-sm text-slate-600 font-medium"
                >
                  {`No data containing ${tableType}.`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <PaginationAdmin
          totalPages={totalPages}
          totalCount={totalCount}
          currentCount={data.length}
          tableType={tableType}
        />
      )}
    </section>
  );
}
