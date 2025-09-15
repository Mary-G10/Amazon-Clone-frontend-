import "./App.css";
import Carousel from "./components/carousel/Carousel";
import Header from "./components/header/Header";
import Category from "./components/Category/Category"; 
import Product from "./components/product/Product";

function App() {
  return (
    <div>
      <Header />
      <Carousel />
      <Category />
      <Product/>
    </div>
  );
}

export default App;
