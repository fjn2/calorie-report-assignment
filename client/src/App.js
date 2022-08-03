import { ApplicationContext } from './hook/useApplication';
import Routes from './Routes';

function App() {
  return (
    <ApplicationContext>
      <Routes />
    </ApplicationContext>
  );
}

export default App;
