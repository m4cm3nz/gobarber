import React from 'react';
import GlobalStyles from './styles/global';
// import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyles />
  </>
);

export default App;
