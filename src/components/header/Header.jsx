import React, { useContext } from "react";
import classes from "./Header.module.css";
import {Link} from 'react-router-dom'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../dataProvider/DataProvider";

const Header = () => {
  const [{basket},dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  console.log(basket.length);
  return (
    <>
    <section className={classes.fixed}>
      
      <div className={classes.header_container}>
        {/* Logo */}
        <div className={classes.logo_container}>
          
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo" />
            </Link>
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivering to</p>
              <span>Ethiopia</span>
              {/* <p>Update Location</p> */}
            </div>
          </div>
           </div>

          {/* Search section */}
          <div className={classes.search}>
          
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <BsSearch />
          </div>

          {/* Right Side Links */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
              alt="" />
            
              <select name=""id="">
                <option value="">EN</option>
              </select>
              </Link>
            
            <Link to="/">
              
                <p>Sign In</p>
                <span>Account & Lists</span>
            
            </Link>

            
            <Link to="/orders">
              <p>Returns &</p>
              <span>Orders</span>
            </Link>

            
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader/>
    </>
  );
};

export default Header;
