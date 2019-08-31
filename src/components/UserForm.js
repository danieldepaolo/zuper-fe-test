import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserForm extends Component {
  state = {
    users: new Array(3).fill(''),
    listIndividually: false
  }

  handleChangeUser = (value, index) => {
    this.setState(prev => {
      prev.users[index] = value;
      return prev;
    });
  }

  clearUsers = () => {
    this.setState(prev => {
      prev.users = new Array(prev.users.length).fill('');
      return prev;
    });
  }

  handleSubmit = () => {
    const { users, listIndividually } = this.state;
    const reqData = {
      username: users.filter(user => user !== '').join(', ')
    };
    if (listIndividually) {
      reqData.individual = true;
    }
    this.props.onSubmit(reqData);
    this.clearUsers();
  }

  addMoreUsers = () => {
    this.setState(prev => {
      prev.users = [...prev.users, ...new Array(3).fill('')];
      return prev;
    });
  }

  render() {
    const { users, listIndividually } = this.state;
    return (
      <div className='centered-form'>
        <h4>Enter instagram users</h4>
        <div className='vertical-flex'>
          {users.map((user, i) => (
            <input
              type="text"
              key={i}
              value={user}
              placeholder={i === 0
                ? 'Enter single usernames or comma-separated list...'
                : 'Optional'
              }
              onChange={e => this.handleChangeUser(e.target.value, i)}
            />
          ))}
          <button className='btn btn-sm btn-secondary add-users' onClick={this.addMoreUsers}>
            Add more users
          </button>
          <div>
            <input
              id="listOption"
              type="checkbox"
              checked={listIndividually}
              onChange={e => this.setState({ listIndividually: e.target.checked })}
            />
            <label htmlFor="listOption">List items individually</label>
          </div>
          <button
            disabled={this.props.isFetching}
            onClick={this.handleSubmit}
            className='btn btn-primary submit-btn'
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

UserForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};
export default UserForm;
