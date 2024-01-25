import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'  
import Home from './pages/user/Home';
import Admin from './pages/admin/Admin'
 const App = () => {
   return (
     <div>
      <Router> 
     
         <Routes>
          <Route exact path='/*' element={<Home />} />
           <Route path='/login' element={<Login  />} />
           <Route path='/' element={<Home  />} />
           <Route path='/admin' element={<Admin  />} />
  
        </Routes>
      </Router>
      </div>
   )
 }
 
 export default App