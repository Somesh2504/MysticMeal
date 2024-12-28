import './App.css';
import ProductCards from './ProductCard';
import Header from './header';
import DishList from './DishList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dishes  from './Dishes'
function App() {
  return(
    <>
     
       <BrowserRouter> 
       <Header/>
        <Routes> 
        <Route exact path="/" element={<ProductCards></ProductCards>} /> 
        <Route path="/DisheList/:dishName" element={<DishList></DishList>} />
        <Route path="/category/:categoryName" element={<Dishes></Dishes>} />
        </Routes> 
      </BrowserRouter>
      </>
  )
}

export default App;
