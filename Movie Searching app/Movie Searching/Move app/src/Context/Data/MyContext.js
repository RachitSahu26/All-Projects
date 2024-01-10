// MyContext.js
import { createContext } from "react";

const MyContext = createContext({
  basename: '', // Provide a default value for basename
});

export default MyContext;
