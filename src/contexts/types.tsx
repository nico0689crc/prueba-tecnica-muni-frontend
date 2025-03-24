export type ConfigContextType = {
  layout: {
    sidebarWidth: number;
    headerHeight: number;
  },
  isSidebarMobileOpen: boolean;
  handleToggleSidebarMobile: () => void;
}
