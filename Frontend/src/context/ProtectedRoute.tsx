import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider"; 
import { useEffect, useState, type JSX } from "react";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { loading } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(loading)
  const [error, setError] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    try {
      if (accessToken) {
    console.log("ACCESS TOKEN UPDATED IN STATE:", accessToken);
  }
    } catch (error) {
      setError('Some error occured');
      }
    finally{
      setIsLoading(false);
    }
  }, [accessToken]);

  if (isLoading) return <div className="flex h-screen w-screen justify-center items-center text-4xl">Loading...</div>;
  if (error) return  <div className="flex h-screen w-screen justify-center items-center text-4xl">{error}</div>
  return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
