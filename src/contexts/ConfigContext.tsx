import { createContext, useCallback, useMemo, useState } from "react";
import { ConfigContextType } from "./types";

const initialValues: ConfigContextType = {
  layout: {
    sidebarWidth: 200,
    headerHeight: 70,
  },
  isSidebarMobileOpen: false,
  handleToggleSidebarMobile: () => {},
}

export const ConfigContext = createContext<ConfigContextType>(initialValues);

const ConfigProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSidebarMobileOpen, toggleSidebarMobile] = useState(false);

  const handleToggleSidebarMobile = useCallback(() => {
    toggleSidebarMobile((prev) => !prev);
  }, []);
  
  const value = useMemo(() => ({
    ...initialValues,
    isSidebarMobileOpen,
    handleToggleSidebarMobile
  }), [isSidebarMobileOpen, handleToggleSidebarMobile]);

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider;

