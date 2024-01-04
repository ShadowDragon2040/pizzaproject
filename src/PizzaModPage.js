import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function PizzaModPage() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.pizzaId;
  const [, setPizzak] = useState([]);
  const [modname, setModname] = useState("");
  const [modisGlutenFree, setModisGlutenFree] = useState("");
  const [modkepurl, setModkepurl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://pizza.kando-dev.eu/Pizza/${id}`, {
        });

        const pizza = response.data;
        setPizzak(pizza);
        setModname(pizza.name);
        setModisGlutenFree(pizza.isGlutenFree);
        setModkepurl(pizza.kepURL);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, modname, modisGlutenFree, modkepurl]);

  const modName = (e) => {
    setModname(e.target.value);
  };

  const modIsGlutenFree = (e) => {
    setModisGlutenFree(e.target.value);
  };

  const modKepUrl = (e) => {
    setModkepurl(e.target.value);
  };

  return (
    <div className="p-5 text-center content bg-lavender">
      <h2>Pizza módosítása</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios.put(`https://pizza.kando-dev.eu/Pizza/${id}`, {
            id: id,
            name: e.target.elements.name.value,
            isGlutenFree: e.target.elements.isGlutenFree.value,
            kepURL: e.target.elements.kepURL.value,
          })
          .then(() => {
            navigate("/");
          })
          .catch(console.log);
        }}
      >

        <div className="form-group row pb-3">
          <label htmlFor="name2" id="name2" className="col-sm-3 col-form-label">Név:</label>
        </div>
        <div>
          <input type="text" name="name" className="form-control" defaultValue={modname} onChange={modName} />
        </div>

        <div className="form-group row pb-3">
          <label htmlFor="2" id="isGlutenFree2" className="col-sm-3 col-form-label">Gluténmentes:</label>
        </div>
        <div>
          <input type="text" name="isGlutenFree" className="form-control" defaultValue={modisGlutenFree} onChange={modIsGlutenFree} />
        </div>

        <div className="form-group row pb-3">
          <label htmlFor="kepURL2" id="kepURL2" className="col-sm-3 col-form-label">Kép URL:</label>
        </div>
        <div>
          <input type="text" name="kepURL" className="form-control" defaultValue={modkepurl} onChange={modKepUrl} />
        </div>
        <button type="submit" className="btn btn-success">Küldés</button>
      </form>
    </div>
  );
}