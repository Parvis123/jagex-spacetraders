import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};

export default LoadingScreen;
