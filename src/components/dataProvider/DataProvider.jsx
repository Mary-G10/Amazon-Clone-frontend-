import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "../../utility/Reducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
// export const DataContext = createContext();
// Creates a new React Context called DataContext. This will be used to share state across components without prop drilling. The context is created without a default value.
// export const DataProvider = ({ children }) => {
// Defines and exports a functional component called DataProvider that accepts children as a prop (representing any child components wrapped by this provider)