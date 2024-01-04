import { useState,useEffect } from "react";
import { useParams,NavLink } from "react-router-dom";
import axios from "axios";

export function PizzaSinglePage() {

    const param = useParams();
    const id = param.pizzaId;
    const [pizza, setPizza] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
      setPending(true);
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://pizza.kando-dev.eu/Pizza/${id}`, {

          });
  
          setPizza(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setPending(false);
        }
      };
  
      fetchData();
    }, [id]);
  
    return (
      <div className="p-5 m-auto text-center content bg-lavender">
        {isPending || !pizza.id ? (
          <div className="spinner-border"></div>
        ) : (
          <div>
            <div className="card p-3">
              <div className="card-body">
                <h5 className="card-title">{pizza.name}</h5>
                <NavLink to={"/"}>
                  <img
                    className="img-fluid rounded"
                    style={{ maxHeight: 500 }}
                    alt="hello"
                    src={pizza.kepURL ? pizza.kepURL : "http://via.placeholder.com/400x800"}
                  />
                </NavLink>
              </div>
              <h5 className='text-muted'>Gluténmentes: {pizza.isGlutenFree ? "igen" : "nem"}</h5>
            </div>
          </div>
        )}
      </div>
    );
  }