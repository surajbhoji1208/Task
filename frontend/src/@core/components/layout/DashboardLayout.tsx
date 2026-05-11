'use client';

import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAppSelector } from '@core/store/hooks';

// #region Dashboard Layout Constants
const LayoutConstants = {
  DrawerWidth: 240,
} as const;
// #endregion

// #region Dashboard Layout Component
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: sidebarOpen
            ? `calc(100% - ${LayoutConstants.DrawerWidth}px)`
            : '100%',
          marginLeft: sidebarOpen ? `${LayoutConstants.DrawerWidth}px` : 0,
          transition: 'margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
// #endregion
