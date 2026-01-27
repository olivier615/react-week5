import { Outlet } from 'react-router'
import { Header } from './components/Header'

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container py-4">
      <Outlet />
      </main>
    </>
  );
}