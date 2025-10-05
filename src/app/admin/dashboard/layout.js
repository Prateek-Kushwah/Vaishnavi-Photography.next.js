// app/admin/dashboard/layout.js
import AdminLayoutClient from './AdminLayoutClient';

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}