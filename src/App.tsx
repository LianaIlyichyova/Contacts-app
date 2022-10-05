import "./index.scss";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPanel from "./components/login-page/login-page";
import ContactsPage from "./components/contacts-page/contacts-page";
import { IDataType } from "./assets/interfaces/intefaces";
import { useSelector } from "react-redux";

export const browserHistory = createBrowserHistory();

function App() {
  const currentUser = useSelector(function (state: {
    currentUserData: { data: IDataType };
  }) {
    return state.currentUserData.data;
  });
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={LoginPanel} />
        {currentUser.id && (
          <Route exact path={"/contacts"} component={ContactsPage} />
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
