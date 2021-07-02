import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <div className = "container-fluid">
        <div className = "container py-5">
          <div className = "row">
            <div className = "col-md-4 col-sm-12 col-12"></div>
            <div className = "col-md-4 col-sm-12 col-12 border border-dark">
              <Calculator/>
            </div>
            <div className = "col-md-4 col-sm-12 col-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
