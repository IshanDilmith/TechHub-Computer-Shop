import AppRoutes from './routes/Approutes';
import UserContextProvider from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

export default App;