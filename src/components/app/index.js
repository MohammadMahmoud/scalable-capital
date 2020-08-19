import React, { useState, useEffect } from 'react';
import { Result } from 'antd';
import Header from '../header';
import Widget from '../widget';
import './style.css';

const App = () => {
  //State to set calculation after fetching it from the API
  const [cones, setCones] = useState();
  //State to control showing the server error message to the user in case of if the server down
  const [serverError, setServerError] = useState(false);
  //To Fetch the data once the component initialized
  useEffect(() => {
    fetch('http://localhost:3000/api/cones')
      .then((response) => response.json().then((data) => setCones(data)))
      .catch((e) => {
        setServerError(true);
        console.error(e);
      });
  }, []);

  return (
    <div className='container'>
      <Header />
      {serverError ? (
        <Result
          status='500'
          title='500'
          subTitle='Sorry, something went wrong , please try again later'
        />
      ) : (
        <Widget cones={cones} />
      )}
    </div>
  );
};


export default App;
