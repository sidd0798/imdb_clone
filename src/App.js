// import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Banner from './component/Banner';
import Movies from './component/Movies';
import Pagination from './component/Pagination';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favourite from './component/Favourite';
import Pagenotfound from './component/Pagenotfound';
import Crime from './component/Crime';


function App() {
  return (
    <>

      {/* <h1>Hello React❤️</h1> */}
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path='/' element={
            <>
              <Banner></Banner>
              <Movies></Movies>
             


            </>


          }></Route>
          <Route path='/fav' element={
           <Favourite></Favourite>
          }>
          </Route>
          <Route path='*' element={
            <Pagenotfound></Pagenotfound>
          }>


          </Route>
          <Route path='/Crime' element={
               <Crime></Crime>
          }>
           
          </Route>
        </Routes>
        

      </BrowserRouter>



    </>

  );
}

export default App;
