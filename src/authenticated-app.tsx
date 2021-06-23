import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";

const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <ProjectListScreen />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AuthenticatedApp;
