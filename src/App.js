import './App.css';
import { Route, Routes } from 'react-router-dom'
import Post from './pages/Post';
import PostDelete from './pages/PostDelete';
import PostShow from './pages/PostShow';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <header>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path="/:id" element={<PostShow />} />
          <Route path='/:id/delete' element={<PostDelete />} />
        
        </Routes>
      </header>
    </div>
  );
}

export default App;
