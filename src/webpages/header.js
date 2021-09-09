import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  return (
    <div
      style={{
        textAlign: "right",
        alignSelf: "flex-end",
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
        marginRight: 8,
      }}
    >
      Use el buscador para buscar ciudades y personas :
      <input type="text" onInput={(e) => setSearch(e.target.value)} />
      <button onClick={(e) => history.push(`/search_results/${search}`)}>
        Buscar...
      </button>
    </div>
  );
};

export default Header;
