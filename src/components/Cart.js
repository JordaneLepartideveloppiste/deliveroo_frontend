
import "../Scart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Scart = ({counter, list, setList, delivery}) => {

    

    const handleClickAdd = (index) => {
        const newList = [...list];
        newList[index].counter++;
        //console.log(typeof newList[index].price);
        setList(newList);
    }

    const handleClickLess = (index) => {
        const newList = [...list];
        newList[index].counter--;
        //console.log(typeof newList[index].price);
        setList(newList);
    }

    const sumSubTotal = () => {
        let subTotal = 0;
        for (let i=0; i < list.length; i++) {
             console.log(list);
            
            subTotal += list[i].price*list[i].counter;
            
        }
        return subTotal;
    }

    const sumTotal = (num) => {
        let total = 0;
      
        return total = num + 12;
    }

  

    return (
      <div className="scart">
        <button id="valid">Valider mon panier</button>
        <div className="scart_content">
          {list.map(({ counter, product, price }, id) => {
            const totalUnit = price * counter;

            return (
              <div className="product_list" key={id}>
                <div className="counter">
                  <button
                    onClick={() => {
                      handleClickLess(id);
                    }}
                    style={{ display: counter === 0 && "none" }}
                  >
                    <FontAwesomeIcon icon="minus-circle" />
                  </button>
                  <span id="quantity">{counter}</span>
                  <button
                    onClick={() => {
                      handleClickAdd(id);
                    }}
                  >
                    <FontAwesomeIcon icon="plus-circle" />
                  </button>
                </div>
                <span id="product">{product}</span>
                <span className="price">{totalUnit} €</span>
               
              </div>
            );
          })}

          <div className="calcul">
            <div className="sub_total">
              <span id="sub_tot">Sous-Total</span>
              <span className="price">{sumSubTotal()} €</span>
            </div>
            <div className="delivery">
              <span id="deliv">Livraison</span>
              <span className="price">{delivery} €</span>
            </div>
          </div>
          <div className="total">
            <span id="tot">Total</span>
            <span className="price" id="amount">
              {sumTotal(sumSubTotal())} €
            </span>
          </div>
        </div>
      </div>
    );
};

export default Scart;