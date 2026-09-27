import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { SuperAdminNavbar } from './SuperAdminNavbar';

export const SuperAdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden w-full">
      <SuperAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 w-full">
        <SuperAdminNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
