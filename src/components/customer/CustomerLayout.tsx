import React from 'react';
import { Outlet } from 'react-router-dom';
import { CustomerNavbar } from './CustomerNavbar';
import { CustomerFooter } from './CustomerFooter';

export const CustomerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <CustomerNavbar />
        <main>
          <Outlet />
        </main>
      </div>
      <CustomerFooter />
    </div>
  );
};
