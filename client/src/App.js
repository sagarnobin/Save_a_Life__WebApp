import './App.css';
import Homepage from './homepage';
import {Routes, Route} from "react-router-dom";
import Login from './login';
import Register from './register';
import Profile from './profile';
import List1 from './list1';
import List2 from './list2';

function App() {
  return (
    <Routes>
      
      <Route index element = {
         <main>
            <Homepage />
        </main>
      }/>
      <Route path='/login' element = {
         <main>
            <Login/>
        </main>
      }/>
       <Route path='/register' element = {
         <main>
            <Register/>
        </main>
      }/>
      <Route path='/profile' element = {
         <main>
            <Profile/>
        </main>
      }/>
      <Route path='/list1' element = {
         <main>
            <List1/>
        </main>
      }/>
      <Route path='/list2' element = {
         <main>
            <List2/>
        </main>
      }/>
    </Routes>
  
   
  );
}

export default App;
