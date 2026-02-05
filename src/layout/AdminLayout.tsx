import { Outlet } from 'react-router'
import { AdminHeader } from '../components/admin/AdminHeader'

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}