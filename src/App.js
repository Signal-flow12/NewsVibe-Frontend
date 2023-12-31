import './App.css';
import { Route, Routes } from 'react-router-dom'
import Post from './pages/Post';
import PostDelete from './pages/PostDelete';
import PostShow from './pages/PostShow';
import Header from './components/Header';
import PostEdit from './pages/PostEdit';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5537'
    },
    secondary: {
      main: '#dbf8ff'
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline />
      <Header />
      <header>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path="/:id" element={<PostShow />} />
          <Route path='/:id/delete' element={<PostDelete />} />
          <Route path='/:id/edit' element={<PostEdit />} />
        
        </Routes>
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
