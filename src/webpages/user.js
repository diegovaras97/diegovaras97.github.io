import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  const user_id = props.location.pathname.split("/")[2];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);

  const [creditError, setCreditError] = useState(null);
  const [creditIsLoaded, setCreditIsLoaded] = useState(false);
  const [credit, setCredit] = useState([]);

  const [citiesError, setCitiesError] = useState(null);
  const [citiesAreLoaded, setCitiesAreLoaded] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(
      `https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/users/${user_id}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUser(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(
      `https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/users/${user_id}/credit-cards`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setCreditIsLoaded(true);
          setCredit(data);
        },
        (error) => {
          setCreditIsLoaded(true);
          setCreditError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(
      `https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/users/${user_id}/addresses`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setCitiesAreLoaded(true);
          setCities(data);
        },
        (error) => {
          setCitiesAreLoaded(true);
          setCitiesError(error);
        }
      );
  }, []);

  if (error || creditError || citiesError) {
    return (
      <div>
        Error: {error.message}, {creditError.message}, {citiesError.message}
      </div>
    );
  } else if (!isLoaded || !creditIsLoaded || !citiesAreLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Perfil del usuario</h1>
        <hr></hr>
        <img alt={`profile_${user.id}`} src={user.avatar} height="100"></img>
        <h3>Nombre: {user.name}</h3>
        <h3>Apellido: {user.lastName}</h3>
        <h3>Correo electrónico: {user.email}</h3>
        <h3>Fecha de nacimiento: {user.birthdate}</h3>
        <hr></hr>
        <h4>Datos tarjeta de crédito:</h4>
        {credit.map(function (object, i) {
          return (
            <div>
              <h3>ID: {object.id}</h3>
              <h3>Numero de tarjeta: {object.creditCard}</h3>
              <h3>CVV: {object.CVV}</h3>
            </div>
          );
        })}

        <hr></hr>
        <h4>Ciudades agregadas por el usuario:</h4>
        {cities.map(function (object, i) {
          return (
            <div>
              <h3>Dirección: {object.address}</h3>
              <h3>Ciudad: {object.city.name}</h3>
              <h3>País: {object.city.country}</h3>
              <h3>Codigo Postal: {object.zip}</h3>
            </div>
          );
        })}
        <Link to={"/users"}>Volver</Link>
        <hr></hr>
      </div>
    );
  }
};

export default User;
