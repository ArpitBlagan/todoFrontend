import {Routes,Route,BrowserRouter as Router} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import Forget from './components/Forget';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/reg" element={<Register/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/:id" element={<Forget/>}/>
      </Routes>
    </Router>
  )
}

export default App
