import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  const user_id = props.location.pathname.split("/")[2];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {console.log(user)}
        <h1>Perfil del usuario</h1>
        <hr></hr>
        <img alt={`profile_${user.id}`} src={user.avatar} height="100"></img>
        <h2>Nombre: {user.name}</h2>
        <h2>Apellido: {user.lastName}</h2>
        <h2>Correo electrónico: {user.email}</h2>
        <Link to={"/"}>Volver</Link>
        <hr></hr>
      </div>
    );
  }
};

export default User;
