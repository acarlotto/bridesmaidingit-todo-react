import React from 'react';

const LoginForm = (props) => {
  return (
    <form id="changeState" onSubmit={props.loginSubmit}>
      <label>Username</label>
      <input type="text" onChange={props.userNameChange} value={props.username}/>
      <label>Password</label>
      <input type="password" onChange={props.passwordChange} value={props.password}/>
      <button type="submit">This is my submit button!!</button>
    </form>
  );
};

export default LoginForm;