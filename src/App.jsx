
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './components/PrivateRoute';
import ProtectedPage from './components/ProtectedPage'; // Componente de ejemplo de página protegida

const App = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <div>
        {isAuthenticated ? (
          <div>
            <h2>You are logged in!</h2>
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/protected" 
            element={
              <PrivateRoute>
                <ProtectedPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => <h2>Home Page</h2>;

export default App;
