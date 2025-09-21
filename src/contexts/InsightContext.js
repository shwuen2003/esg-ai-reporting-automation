import React, { createContext, useContext, useState } from "react";

const InsightContext = createContext();

export const useInsight = () => {
  const context = useContext(InsightContext);
  if (!context) {
    throw new Error("useInsight must be used within an InsightProvider");
  }
  return context;
};

export const InsightProvider = ({ children }) => {
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateInsight = (data) => {
    setInsightData(data);
    setError(null);
  };

  const setInsightError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  const setInsightLoading = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      setError(null);
    }
  };

  const clearInsight = () => {
    setInsightData(null);
    setError(null);
    setLoading(false);
  };

  const value = {
    insightData,
    loading,
    error,
    updateInsight,
    setInsightError,
    setInsightLoading,
    clearInsight,
  };

  return (
    <InsightContext.Provider value={value}>{children}</InsightContext.Provider>
  );
};
