import React, { useState } from "react";

const CatTempByRolContext = React.createContext({});

const CatTempByRolProvider = (props) => {
  const [cats, setCats] = useState([1, 2, 3]);

  const catTempByRolContext = {
    catTempByRolContext: cats,
    addCat: (id) => {
      setCats([...cats, id]);
    },
    removeCat: (id) => {
      const index = cats.indexOf(id);
      setCats([...cats.slice(0, index), ...cats.slice(index + 1, cats.length)]);
    },
    getSelectedCats: () => {
      return cats;
    },
  };

  return (
    <CatTempByRolContext.Provider value={catTempByRolContext}>
      {props.children}
    </CatTempByRolContext.Provider>
  );
};

export { CatTempByRolContext, CatTempByRolProvider };
