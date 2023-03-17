// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal";
// import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && (
//         <Switch>
//           <Route path="/signup">
//             <SignupFormPage />
//           </Route>
//         </Switch>
//       )}
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import Spots from "./components/Spots/Spots";
import SpotDetails from "./components/SpotDetails/SpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const isLoggedIn = useSelector(state => state.session.user != null);

  useEffect(() => {
    if (!isLoggedIn)  {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots/>
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
