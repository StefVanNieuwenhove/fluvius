import React, { useState } from "react";

const CatTempByUserContext = React.createContext({});

const CatTempByUserProvider = (props) => {
  const [cats, setCats] = useState([1, 2, 3]);

  const catTempByUserContext = {
    catTempByUserContext: cats,
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
    <CatTempByUserContext.Provider value={catTempByUserContext}>
      {props.children}
    </CatTempByUserContext.Provider>
  );
};

export { CatTempByUserContext, CatTempByUserProvider };
