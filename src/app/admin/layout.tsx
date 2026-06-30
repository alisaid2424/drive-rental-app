import AdminNavbar from "./_components/AdminNavbar";
import AdminSidebar from "./_components/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 overflow-x-auto ml-20 lg:ml-56 p-3 lg:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
