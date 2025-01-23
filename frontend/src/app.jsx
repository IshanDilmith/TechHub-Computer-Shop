import AppRoutes from './routes/Approutes';
import UserContextProvider from './pages/Components/UserContext';
import './index.css'

function App() {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

export default App;