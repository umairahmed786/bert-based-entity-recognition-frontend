
import './App.css';
import NerComponent from './components/Main-Screen/NerComponent';
import Navbar from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <main>
        <Navbar />
        <NerComponent />
      </main>
    </div>
  );
}

export default App;
