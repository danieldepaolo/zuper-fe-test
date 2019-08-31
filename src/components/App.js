import React, { Component } from 'react';
import axios from 'axios';

import UserForm from './UserForm';
import Results from './Results';

import 'react-table/react-table.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import '../styles/index.css';

class App extends Component {
  state = {
    userData: {},
    fetching: false,
    error: null
  };

  fetchUserData = async formData => {
    this.setState({ fetching: true });
    try {
      const response = await axios.post('/start', formData);
      await this.pollJob(response.data);
    } catch(err) {
      this.setState({ error: err, fetching: false });
    }
  }

  pollJob = async jobId => {
    const response = await axios.get(`/results/${jobId}`);
    if (response.status !== 202) {
      this.setState({
        userData: response.data,
        fetching: false
      });
    } else {
      setTimeout(() => this.pollJob(jobId), 1500);
    }
  }

  render() {
    const { userData, fetching, error } = this.state;
    return (
      <div className='app'>
        <UserForm onSubmit={this.fetchUserData} isFetching={fetching} />
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        <Results userData={userData} isFetching={fetching} />
      </div>
    );
  }
}

export default App;
