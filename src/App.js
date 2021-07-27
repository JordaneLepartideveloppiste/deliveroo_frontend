
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss';
import logo from './assets/img/logo_deliveroo.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Scart from './components/Scart';
library.add(faStar, faMinusCircle, faPlusCircle);


function App() {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
      const fetchData = async () => {
        try {

          const res = await axios.get(
            "http://localhost:3200/"
          );
          console.log(res.data);
          setData(res.data);
          setIsLoading(false);
          
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchData();
    }, [])

    const handleClick = () => {

    }



  return isLoading ? (
    <span>Chargement des données en cours...</span>
  ) : (
    <div className="App">
      <div className="header">
        <div className="header_top">
          <img src={logo} alt="logo" />
        </div>
        <div className="header_bottom">
          <div className="hb_left">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <div className="hb_right">
            <img src={data.restaurant.picture} alt="" />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="categories">
          {data.categories.map(({ name, meals }, index) => {
            return (
              meals.length > 0 && (
              <>
                <span id="name">{name}</span>
                <div className="categories_content" key={index}>
                  {meals.map(
                    ({ title, description, price, picture, popular }, id) => {
                      return (
                        <div className="meal" onClick={handleClick}>
                          <div className="meal_content">
                            <span id="title">{title}</span>
                            <p id="descript">{description}</p>
                            {popular ? (
                              <>
                                <span id="price">{price}€</span>
                                <span id="popul">
                                  <FontAwesomeIcon icon="star" /> Populaire
                                </span>
                              </>
                            ) : (
                              <span id="price">{price}€</span>
                            )}
                          </div>
                          <div className="meal_pic">
                            {picture && (
                              <img
                                id="meal_picture"
                                src={picture}
                                alt="meals_picture"
                              />
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </>
              )
            );
          })}
        </div>
       <Scart counter={0} price={data.categories[0].meals[0].price}/>
      </div>
    </div>
  );
  
}

export default App;
