import React, { createContext, useState } from "react";
import "./App.css";
import RoutingModule from "./components/routingModule";

 export const SearchQuery = createContext()
export const UpdateSearchQuery = createContext()

function App() {
  const [searchQuery,setSearchQuery] = useState("");
  return  (

    <SearchQuery.Provider value={searchQuery}>
      <UpdateSearchQuery.Provider value={setSearchQuery}>
        <RoutingModule/>
      </UpdateSearchQuery.Provider>
   </SearchQuery.Provider>)

}

export default App;
