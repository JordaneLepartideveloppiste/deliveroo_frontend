import { useState } from "react";
import "../Scart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Scart = ({counter, product, price, list, setList, delivery}) => {

    

    const handleClickAdd = (index) => {
        const newList = [...list];
        newList[index].counter++;
        newList[index].price += Number(price);
        setList(newList);
    }

    const handleClickLess = (index) => {
        const newList = [...list];
        newList[index].counter--;
        newList[index].price -= Number(price);
        setList(newList);
    }

    return (
      <div className="scart">
        <button id="valid">Valider mon panier</button>
        <div className="scart_content">
            {list.map(({counter, product, price}, index) => {
                return (
                  <div className="product_list">
                    <div className="counter">
                      <button
                        onClick={() => {
                          handleClickLess(index);
                        }}
                        style={{ display: list[index].counter === 0 && "none" }}
                      >
                        <FontAwesomeIcon icon="minus-circle" />
                      </button>
                      <span id="quantity">{list[index].counter}</span>
                      <button
                        onClick={() => {
                          handleClickAdd(index);
                        }}
                      >
                        <FontAwesomeIcon icon="plus-circle" />
                      </button>
                    </div>
                    <span id="product">{list[index].product}</span>
                    <span className="price">{list[index].price} €</span>
                  </div>
                );
            })
        }
          
          <div className="calcul">
            <div className="sub_total">
              <span id="sub_tot">Sous-Total</span>
              <span className="price">prix €</span>
            </div>
            <div className="delivery">
              <span id="deliv">Livraison</span>
              <span className="price">{delivery} €</span>
            </div>
          </div>
          <div className="total">
            <span id="tot">Total</span>
            <span className="price" id="amount">
              prix €
            </span>
          </div>
        </div>
      </div>
    );
};

export default Scart;