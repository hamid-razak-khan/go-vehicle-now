
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to the landing page
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return <LandingPage />;
};

export default Index;
