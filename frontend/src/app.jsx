import AppRoutes from './routes/Approutes';
import UserContextProvider from './pages/Components/UserContext';

function App() {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

export default App;