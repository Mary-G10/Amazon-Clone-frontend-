import React, { useEffect, useContext } from "react";
import Routing from "./Router.jsx";
import { DataContext } from "./components/dataProvider/DataProvider.jsx";
import { Type } from "./utility/Action.type.jsx";
import { auth } from "./utility/firebase.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;

// import React, { useEffect } from "react";
// import Routing from "./Router.jsx";
// import { DataContext } from "./components/dataProvider/DataProvider.jsx";
// import { Type } from "./utility/Action.type.jsx";
// import { auth } from "./utility/firebase.js";
// function App() {
//   const[{user},dispatch]=useEffect(DataContext)
//   useEffect(()=>{
//     auth.onAuthStateChanged((authUser)=>{
//       if(authUser){
//         dispatch({
//           Type:Type.SET_USER,
//           user:authUser
//         })
//       }else{ dispatch({
//           Type:Type.SET_USER,
//           user:null,

//     })
//   }
// })
//   },[])
//   return (
//     <>
//       <Routing />
//     </>
//   );
// }

// export default App;
