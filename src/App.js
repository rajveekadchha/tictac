import logo from './logo.svg';
import './App.css';
import TicTacToe from "./TicTacToe";

function App() {
  return (
    <div className="App">
      <TicTacToe boardSize={4} />
    </div>
  );
}

export default App;
