import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export function PizzaCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.elements.name.value,
      isGlutenFree: e.target.elements.isGlutenFree.value,
      kepURL: e.target.elements.kepURL.value,
    };

    try {
      await axios.post("https://pizza.kando-dev.eu/Pizza", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 text-center content bg-whitesmoke">
      <h2>Új Pizza</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Név:</label>
        </div>
        <div>
          <input type="text" name="name" className="form-control" />
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Gluténmentes:</label>
        </div>
        <div>
          <input type="text" name="isGlutenFree" className="form-control" />
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép URL:</label>
        </div>
        <div>
          <input type="text" name="kepURL" className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
