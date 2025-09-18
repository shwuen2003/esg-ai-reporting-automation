import { message } from "antd";
import FileUploadSection from "../components/FileUploadSection";
import AnalysisProgress from "../components/AnalysisProgress";
import useAnalysis from "../hooks/useAnalysis";

const UploadPDF = () => {
  const {
    analyzing,
    analysisStage,
    analysisProgress,
    currentStepIndex,
    analysisSteps,
    startAnalysis,
    cancelAnalysis,
    completeAnalysis,
  } = useAnalysis();

  const handleStartAnalysis = async (framework) => {
    // Check if files are uploaded (mock check)
    if (!window.mockUploadedFiles || window.mockUploadedFiles.length === 0) {
      message.error("Please upload at least one file before starting analysis");
      return;
    }

    if (!framework) {
      message.error("Please select an ESG framework before starting analysis");
      return;
    }

    // Store selected framework for analysis
    window.selectedFramework = framework;
    await startAnalysis();
  };

  // Show analysis screen if analyzing
  if (analyzing) {
    return (
      <AnalysisProgress
        analysisStage={analysisStage}
        analysisProgress={analysisProgress}
        currentStepIndex={currentStepIndex}
        analysisSteps={analysisSteps}
        onCancel={cancelAnalysis}
        onComplete={completeAnalysis}
      />
    );
  }

  // Show upload screen
  return <FileUploadSection onStartAnalysis={handleStartAnalysis} />;
};

export default UploadPDF;
