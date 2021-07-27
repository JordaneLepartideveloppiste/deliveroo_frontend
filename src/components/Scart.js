import { useState } from "react";
import "../Scart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Scart = ({counter, product, price, id}) => {

    const [list, setList] = useState([
      { counter: 1,
         product: "Des bugnes",
          price: Number(price),
          delivery: 12,
         },
    ]);

    const handleClickAdd = () => {
        const newList = [...list];
        newList[0].counter++;
        newList[0].price += Number(price);
        setList(newList);
    }

    const handleClickLess = () => {
        const newList = [...list];
        newList[0].counter--;
        newList[0].price -= Number(price);
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
                onClick={handleClickLess}
                style={{ display: list[index].counter === 0 && "none" }}
              >
                <FontAwesomeIcon icon="minus-circle" />
              </button>
              <span id="quantity">{list[index].counter}</span>
              <button onClick={handleClickAdd}>
                <FontAwesomeIcon icon="plus-circle" />
              </button>
            </div>
            <span id="product">{list[index].product}</span>
            <span className="price">{list[index].price} €</span>
          </div>
          )
            })
        }
          
          <div className="calcul">
            <div className="sub_total">
              <span id="sub_tot">Sous-Total</span>
              <span className="price">prix €</span>
            </div>
            <div className="delivery">
              <span id="deliv">Livraison</span>
              <span className="price">{list[0].delivery} €</span>
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