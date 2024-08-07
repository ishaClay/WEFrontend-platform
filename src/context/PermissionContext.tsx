/* eslint-disable react-hooks/exhaustive-deps */
import { getTrainerById } from "@/services/apiServices/trainer";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PermissionContext = React.createContext({
  permissions: {
    createCourse: false,
    updateCourse: false,
    certificate: false,
  },
});
let reCall = true;

export const PermissionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const location = useLocation();
  const [permissions, setPermissions] = React.useState({
    createCourse: false,
    updateCourse: false,
    certificate: false,
  });

  const handlePermission = async () => {
    const data = await getTrainerById({ id: userData?.query?.detailsid });
    if (data) {
      setPermissions({
        createCourse: data?.data?.approved,
        updateCourse: data?.data?.editCourses,
        certificate: data?.data?.assignCertificate,
      });
    }
    reCall = false;
  };

  useEffect(() => {
    if (
      [
        "allcourse",
        "mycourses",
        "allocated-certificate",
        "enrolledcourses",
      ].includes(location.pathname?.split("/").pop() || "")
    ) {
      reCall = true;
    }
  }, [location]);

  useEffect(() => {
    if (reCall && userData?.query?.role === "3") {
      handlePermission();
    }
  }, [reCall]);

  return (
    <PermissionContext.Provider value={{ permissions }}>
      {children}
    </PermissionContext.Provider>
  );
};
