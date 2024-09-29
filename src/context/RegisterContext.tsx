import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface SidebarProviderValue {
  selectedRole: null | string;
  setSelectedRole: React.Dispatch<React.SetStateAction<null | string>>;
  setShowRegistrationForm: React.Dispatch<React.SetStateAction<boolean>>;
  showRegistrationForm: boolean;
}

export const RegisterContext = React.createContext<SidebarProviderValue>({
  selectedRole: null,
  setSelectedRole: () => {},
  setShowRegistrationForm: () => {},
  showRegistrationForm: false,
});

export const RegisterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedRole, setSelectedRole] = useState<null | string>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setShowRegistrationForm(false);
    }
  }, [location]);

  const value: SidebarProviderValue = {
    selectedRole,
    setSelectedRole,
    setShowRegistrationForm,
    showRegistrationForm,
  };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};
