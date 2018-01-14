import React from 'react';

const LoginForm = (props) => {
  return (
    <div className="container">

            <div ClassName="row">

                <div className="col-md-4">
                </div>

                <div className="col-md-4">
                <form id="changeState" onSubmit={props.loginSubmit}>
                {/* <label>Username</label> */}
                <input type="text" onChange={props.userNameChange} className="form-control" placeholder="Username" value={props.username}/>
                {/* <label>Password</label> */}
                <input type="password" onChange={props.passwordChange} className="form-control" placeholder="Password" value={props.password}/>
                <button className="btn btn-success" style={{marginTop:16}} type="submit">Login!!</button>
                </form>
                </div>

                <div className="col-md-4">
                </div>
            </div>
    </div>
  );
};

export default LoginForm;