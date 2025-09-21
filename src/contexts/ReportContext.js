import React, { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
};

export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateReport = (data) => {
    setReportData(data);
    setError(null);
  };

  const clearReport = () => {
    setReportData(null);
    setError(null);
  };

  const setReportLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const setReportError = (error) => {
    setError(error);
    setLoading(false);
  };

  const value = {
    reportData,
    loading,
    error,
    updateReport,
    clearReport,
    setReportLoading,
    setReportError,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};
