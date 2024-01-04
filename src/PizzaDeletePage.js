import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function PizzaDeletePage() {
  const navigate = useNavigate();
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
          <h2>Hangszer törlése</h2>
          <div className="card p-3">
            <div className="card-body">
              <h5 className="card-title">{pizza.name}</h5>
              <img
                className="img-fluid rounded"
                style={{ maxHeight: 500 }}
                alt="hello"
                src={pizza.kepURL ? pizza.kepURL : "http://via.placeholder.com/400x800"}
              />
            </div>
            <h5 className='text-muted'>Gluténmentes: {pizza.isGlutenFree ? "igen" : "nem"}</h5>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await axios.delete(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                });
                if (res.status === 200) {
                  navigate("/");
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <div>
              <NavLink to={"/"}>
                <button className="btn btn-primary btn-warning rounded">Mégsem</button>
              </NavLink>
              <button className="btn bi-trash3 btn-danger btn-primary btn-warning rounded">Törlés</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
