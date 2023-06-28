import { BrowserRouter } from 'react-router-dom';
import "./Assets/scss/styles.scss";
import IndexRoute from './Routes/IndexRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <IndexRoute/>
      </BrowserRouter>
    </div>
  );
}

export default App;
