import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useAnalysis = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState("processing");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Get framework display name
  const getFrameworkName = (framework) => {
    const frameworkMap = {
      bursa: "Bursa Malaysia",
      nsrf: "NSRF",
      issb: "ISSB",
    };
    return frameworkMap[framework] || "ESG";
  };

  // Generate dynamic analysis steps based on selected framework
  const getAnalysisSteps = useCallback(() => {
    const selectedFramework = window.selectedFramework;
    const frameworkName = getFrameworkName(selectedFramework);

    return [
      {
        title: "Processing File",
        description: "Extracting text and data from PDF documents",
        icon: "📄",
      },
      {
        title: "Compiling Internal Data",
        description: "Organizing and structuring extracted information",
        icon: "🔄",
      },
      {
        title: `Cross-Referencing with ${frameworkName} Frameworks`,
        description: `Mapping data to ${frameworkName} standards and requirements`,
        icon: "🔗",
      },
      {
        title: "Generating Report Content",
        description: `Creating comprehensive ${frameworkName}-compliant report sections`,
        icon: "📊",
      },
      {
        title: "Finalizing Report",
        description: `Completing final ${frameworkName} report formatting and validation`,
        icon: "✅",
      },
    ];
  }, []);

  const startAnalysis = useCallback(async () => {
    setAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStepIndex(0);
    setAnalysisStage("processing");

    // Simulate analysis progress with timer
    const dynamicSteps = getAnalysisSteps();
    const totalSteps = dynamicSteps.length;
    const stepDuration = 3000; // 3 seconds per step

    for (let i = 0; i < totalSteps; i++) {
      setCurrentStepIndex(i);

      // Animate progress within each step
      const progressStart = (i / totalSteps) * 100;
      const progressEnd = ((i + 1) / totalSteps) * 100;

      for (
        let progress = progressStart;
        progress <= progressEnd;
        progress += 2
      ) {
        await new Promise((resolve) => setTimeout(resolve, 60)); // 60ms intervals
        setAnalysisProgress(Math.min(progress, 100));
      }

      if (i < totalSteps - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, stepDuration - 1800)
        ); // Remaining time for step
      }
    }

    // Mark as complete
    setAnalysisStage("done");
    setAnalysisProgress(100);
    setCurrentStepIndex(totalSteps - 1);
  }, [getAnalysisSteps]);

  const cancelAnalysis = useCallback(() => {
    setAnalyzing(false);
    setAnalysisProgress(0);
    setCurrentStepIndex(0);
    setAnalysisStage("processing");
  }, []);

  const completeAnalysis = useCallback(() => {
    setAnalyzing(false);
    navigate("/dashboard");
  }, [navigate]);

  return {
    analyzing,
    analysisStage,
    analysisProgress,
    currentStepIndex,
    analysisSteps: getAnalysisSteps(),
    startAnalysis,
    cancelAnalysis,
    completeAnalysis,
  };
};

export default useAnalysis;
