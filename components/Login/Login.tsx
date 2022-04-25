import React, { useState, FC, Dispatch, SetStateAction } from 'react';
import styles from '../../styles/Home.module.css';
import axios from 'axios';

interface ILogin {
  setToken: Dispatch<SetStateAction<string>>;
  localUsername: string;
  setLocalUsername: Dispatch<SetStateAction<string>>;
  localPassword: string;
  setLocalPassword: Dispatch<SetStateAction<string>>;
  setSendGet: Dispatch<SetStateAction<boolean>>;
}

const Login: FC<ILogin> = ({
  setToken,
  localUsername,
  setLocalUsername,
  localPassword,
  setLocalPassword,
  setSendGet,
}) => {
  const userLogin = async () => {
    const response = await axios
      .post(
        'https://dnbnjsi71l.execute-api.us-east-1.amazonaws.com/challenge-prod/users/login',
        {
          username: localUsername,
          password: localPassword,
        }
      )
      .then((res) => {
        setToken(res.data.body.token);
        console.log('userLogin', res);
        setSendGet(true);
      })
      .catch((res) => console.error(res));
    // const data = await response?.data;
  };

  const handleClick = () => {
    userLogin();
  };

  return (
    <div className={styles.card}>
      <text>Login</text>

      <div className={styles.login_input}>
        <label>Usuario:</label>
        <input
          type='text'
          value={String(localUsername)}
          onChange={(value) => {
            setLocalUsername(String(value.target.value));
          }}
        ></input>
      </div>

      <div className={styles.login_input}>
        <label>Contraseña</label>
        <input
          type='text'
          value={String(localPassword)}
          onChange={(value) => setLocalPassword(String(value.target.value))}
        ></input>
      </div>

      <button className={styles.login_button} onClick={handleClick}>
        Iniciar sesión
      </button>
    </div>
  );
};

export default Login;
