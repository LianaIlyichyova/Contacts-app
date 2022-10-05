import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  loginVariables,
  popupVariables,
} from "../../assets/variables/variables";
import Popup from "../popup/popup";
import Button from "../button/button";
import { useDispatch } from "react-redux";
import { IDataType } from "../../assets/interfaces/intefaces";
import "./login.scss";

const LoginPanel = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const [isAuth, setIsAuth] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3000/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    if (users.length) {
      user.username &&
        user.password &&
        users.forEach((el: IDataType) => {
          if (el.username === user.username && el.password === user.password) {
            dispatch({
              type: "CURRENT_USER_DATA",
              payload: {
                data: { id: el.id, name: el.name },
              },
            });
            setIsAuth(true);
            return false;
          }
          setShowPopup(true);
        });
    }
  }, [users, user, dispatch]);

  useEffect(() => {
    isAuth && history.push("/contacts");
  }, [isAuth, history]);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const formData = { username: userName, password: password } as IDataType;
    ((!formData.username || !formData.password) && setShowPopup(true)) ||
      (formData.username &&
        formData.password &&
        setUser({ username: userName, password: password }));
  };

  return (
    <div className="login-container">
      <div className="circle circle-lime"></div>
      <form action="" method="get" onSubmit={handleSubmit}>
        <h1>{loginVariables.title}</h1>
        <div>
          <input
            type="text"
            name="username"
            placeholder={loginVariables.userNamePlaceHolder}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder={loginVariables.passwordPlaceHolder}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <Button value={loginVariables.login} />
      </form>
      <div className="circle circle-aqua"></div>
      <div></div>
      {showPopup && (
        <Popup
          show={showPopup}
          data={
            !userName
              ? popupVariables.addUsername
              : !password
              ? popupVariables.addPassword
              : popupVariables.unavailableUser
          }
          onHide={(): void => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default LoginPanel;
