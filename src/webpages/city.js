import React, { useState, useEffect, Component } from "react";
import { Link, useHistory } from "react-router-dom";

const City = (props) => {
  const user_id = props.location.pathname.split("/")[2];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState([]);
  const [people, setPeople] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log(people);
    if (people.length > 0) {
      Promise.all(responses).then((a) => {
        let ret = a;
        setUsers(ret);
      });
    }
  });

  function handleClick(e) {
    console.log(e);
  }

  useEffect(() => {
    fetch(
      `https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/cities/${user_id}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setPeople(data.users);
          setCity(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  const responses = people.map(async (user_id) => {
    try {
      const response = await fetch(
        `https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/users/${user_id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Detalles sobre la ciudad</h1>
        <hr></hr>
        <h2>Nombre: {city.name}</h2>
        <h2>País: {city.country}</h2>
        <hr></hr>
        <h4 style={{ textDecorationLine: "underline" }}>
          Usuarios presentes en la ciudad:
        </h4>
        {users.map(function (object, i) {
          return (
            <div style={{ marginLeft: 20 }}>
              <br></br>
              <button onClick={(e) => history.push(`/user/${object.id}`)}>
                {object.name} {object.lastName}
              </button>
              <br></br>
            </div>
          );
        })}
        <hr></hr>
        <Link to={"/cities"}>Ir a lista de ciudades</Link>
      </div>
    );
  }
};

export default City;
