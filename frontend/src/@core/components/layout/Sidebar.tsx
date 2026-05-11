'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useAppSelector } from '@core/store/hooks';

// #region Sidebar Constants
const SidebarConstants = {
  DrawerWidth: 240,
} as const;

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Products', path: '/products', icon: <InventoryIcon /> },
  { label: 'Analytics', path: '/analytics', icon: <BarChartIcon /> },
  { label: 'Import', path: '/import', icon: <UploadFileIcon /> },
] as const;
// #endregion

// #region Sidebar Component
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: SidebarConstants.DrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SidebarConstants.DrawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Box className="flex items-center gap-2">
          <BarChartIcon color="primary" />
          <Typography variant="h6" color="primary">
            RatingsDash
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={pathname === item.path || pathname.startsWith(item.path)}
              onClick={() => router.push(item.path)}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                  '&:hover': { backgroundColor: 'primary.dark' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
// #endregion
