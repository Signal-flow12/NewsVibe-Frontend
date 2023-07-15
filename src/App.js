import './App.css';
import { Route, Routes } from 'react-router-dom'
import Post from './pages/Post';

function App() {
  return (
    <div className="App">
      <header>
        <Routes>
          <Route path='/' element={<Post />} />
          
        </Routes>
      </header>
    </div>
  );
}

export default App;
