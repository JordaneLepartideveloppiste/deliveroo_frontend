import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import logo from "./assets/img/logo_deliveroo.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cart from "./components/Cart";
library.add(faStar, faMinusCircle, faPlusCircle);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3200/");
        console.log(res.data);
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const [list, setList] = useState([
    
  ]);

  const handleClickAddScart = (clickedId, title, price, index) => {
    const newList = [...list];
//list.map((el) => el.id).indexOf(clickedId) !== -1
    const exist = newList.find((elem) => elem.id === clickedId);
    console.log(exist);
    if (exist) {
        console.log("déjà");
        exist.counter++ ;
      } else {
        
        newList.push({ counter: 1, product: title, price: price, id: clickedId });
      }
      setList(newList); 
  };

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
                      (
                        { title, description, price, picture, popular, id },
                        index
                      ) => {
                        return (
                          <div
                            key={id}
                            className="meal"
                            onClick={() => {
                              handleClickAddScart(id, title, price, index);
                            }}
                          >
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
        <Cart counter={1} list={list} setList={setList} delivery={12} />
      </div>
    </div>
  );
}

export default App;
