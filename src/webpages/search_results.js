import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = (props) => {
  const [error, setError] = useState(null);
  const [userIsLoaded, setUserIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [userPageNumber, setUserPageNumber] = useState(6);
  const [userCurrentPage, setUserCurrentPage] = useState(1);

  const [cityIsLoaded, setCityIsLoaded] = useState(false);
  const [cities, setCities] = useState([]);
  const [cityPageNumber, setCityPageNumber] = useState(6);
  const [cityCurrentPage, setCityCurrentPage] = useState(1);

  const [search, setSearch] = useState(props.location.pathname.split("/")[2]);
  const [lastSearch, setLastSearch] = useState(
    props.location.pathname.split("/")[2]
  );

  function handleCityEvent(e) {
    const value = e.target.value.replace(/\D/, "");
    const pages = Math.ceil(cityPageNumber / 10);
    value > pages ? setCityCurrentPage(pages) : setCityCurrentPage(value);
  }

  function handleUserEvent(e) {
    const value = e.target.value.replace(/\D/, "");
    const pages = Math.ceil(userPageNumber / 10);
    value > pages ? setUserCurrentPage(pages) : setUserCurrentPage(value);
  }

  useEffect(() => {
    setSearch(props.location.pathname.split("/")[2]);
    console.log(lastSearch, search, lastSearch !== search);
    if (lastSearch !== search) {
      setLastSearch(search);
      setUserCurrentPage(1);
      setCityCurrentPage(1);
      window.location.reload();
    }
  }, [props.location, lastSearch, search]);

  useEffect(() => {
    fetch(
      `https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/cities?q=${search}&_page=${cityCurrentPage}`
    )
      .then((res) => {
        setCityPageNumber(res.headers.get("X-Total-Count"));
        return res.json();
      })
      .then(
        (data) => {
          setCityIsLoaded(true);
          setCities(data);
        },
        (error) => {
          setCityIsLoaded(true);
          setError(error);
        }
      );
  }, [cityCurrentPage, props.location, search]);

  useEffect(() => {
    fetch(
      `https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/53739/users?q=${search}&_page=${userCurrentPage}`
    )
      .then((res) => {
        setUserPageNumber(res.headers.get("X-Total-Count"));
        return res.json();
      })
      .then(
        (data) => {
          setUserIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setUserIsLoaded(true);
          setError(error);
        }
      );
  }, [userCurrentPage, props.location, search]);

  const handleFocus = (event) => event.target.select();
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!userIsLoaded || !cityIsLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <hr></hr>
        <h1>Resultados de la búsqueda: "{search}"</h1>
        <hr></hr>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "100%",
              flex: 1,
              margin: 8,
            }}
          >
            <div style={{ display: "table-row" }}>
              <h3>Usuarios</h3>
              Digite el numero de página a ver (máx.{" "}
              {Math.ceil(userPageNumber / 10)}
              ):{" "}
              <input
                onFocus={handleFocus}
                type="text"
                pattern="[0-9]*"
                onInput={(e) => handleUserEvent(e)}
                value={userCurrentPage}
              />
            </div>
            <br></br>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <img
                      alt={`profile_${user.id}`}
                      src={user.avatar}
                      height="50"
                      style={{ borderRadius: "50%", margin: 8 }}
                    ></img>
                    <Link
                      to={`/user/${user.id}`}
                      style={{ alignSelf: "center" }}
                    >
                      {user.name} {user.lastName} || {user.email}{" "}
                    </Link>
                    <hr></hr>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "100%",
              flex: 1,
              margin: 8,
            }}
          >
            <div style={{ display: "table-row" }}>
              <h3>Ciudades</h3>
              Digite el numero de página a ver (máx.{" "}
              {Math.ceil(cityPageNumber / 10)}
              ):{" "}
              <input
                onFocus={handleFocus}
                type="text"
                pattern="[0-9]*"
                onInput={(e) => handleCityEvent(e)}
                value={cityCurrentPage}
              />
            </div>
            <br></br>
            <ul>
              {cities.map((city) => (
                <li key={city.id}>
                  <div style={{ display: "line", height: "60" }}>
                    <h4>
                      Nombre: {city.name} || País: {city.country}
                    </h4>
                    <Link to={`/city/${city.id}`}>
                      {" "}
                      Mostrar toda la información asociada a la ciudad{" "}
                    </Link>
                    <hr></hr>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Search;
