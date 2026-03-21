import { AppRouter } from "./routes/appRouter";
import { useAuth } from "./context/authContext";

function App() {
  const { isReady } = useAuth();

  // No renderizar el router hasta que el contexto de autenticación
  // haya terminado de verificar la sesión en localStorage.
  if (!isReady) return null;

  return <AppRouter />;
}

export default App;