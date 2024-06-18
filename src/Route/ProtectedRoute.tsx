// ProtectedRoute.js
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ path, ...props }: {path:string, props: any}) => {
  const { isLoggedIn } = useAuth(); // Get authentication state from context

  return isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
