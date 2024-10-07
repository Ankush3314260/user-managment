import { Routes,Route } from "react-router-dom";
import Home from './Home'
import UserDetail from "./UserDetail";
import CreateUserform from "./Components/CreateUserform";
import { useEffect } from "react";
function App() {
  useEffect(()=>{
    
    window.addEventListener('beforeunload', function() {
  // Clear local storage
  localStorage.clear();
});
  
  },[])
  return (
    <div>
      
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/user/:id" element={<UserDetail/>}/>
      <Route path="/createuser" element={<CreateUserform/>}/>
    </Routes>
    </div>
  );
}

export default App;
