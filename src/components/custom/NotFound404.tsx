import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = localStorage.getItem("spaceTraders_token");
    const gameState = localStorage.getItem("spaceTraders_gameState");

    if (token && gameState) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
            404
          </h1>
          <p className="text-gray-500">
            Looks like you've ventured into the unknown digital realm.
          </p>
        </div>
        <Button variant="secondary" onClick={handleNavigate}>
          Back to safety
        </Button>
      </div>
    </div>
  );
};

export default NotFound404;
