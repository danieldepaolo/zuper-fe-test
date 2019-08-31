import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Results from './Results';
import UserForm from './UserForm';

configure({ adapter: new Adapter() });

// Normally I'd put the tests into different files but I'm already at a bit over 3 hours

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it ('renders Results properly given its props', () => {
  const userData = {
    0: {
      output: {
        "Average engagement (per post as % of followers)": "6.3",
        "Average engagement (per post)": "125279.4",
        "Average number of Followers": "7214148.0",
        "Number of Accounts": 2,
        "Total number of Followers (Reach)": "14428296"
      }
    }
  };

  let wrapper = shallow(
    <Results
      userData={userData}
      isFetching={false}
    />
  );

  // Should render a list of the key value pairs (aggregate values)
  expect(wrapper.find('.list-group').length).toEqual(1);
  expect(wrapper.find('.list-group-item').length).toEqual(5);

  wrapper = shallow(
    <Results 
      userData={userData}
      isFetching={true}
    />
  );

  // Should just render a loader since we passed in isFetching=true
  expect(wrapper.find('Loader').length).toEqual(1);

  userData['0'].output.username = 'scottshafer';

  wrapper = shallow(
    <Results 
      userData={userData}
      isFetching={false}
    />
  );

  // Should be a table since we have a username in userdata now
  expect(wrapper.find('ReactTable').length).toEqual(1);

  wrapper = shallow(
    <Results
      userData={null}
      isFetching={false}
    />
  );

  expect(wrapper).toEqual({});
});

it('renders UserForm without issue', () => {
  let clickedSubmit = false;
  const wrapper = mount(
    <UserForm isFetching={true} onSubmit={() => clickedSubmit = true} />
  );

  expect(clickedSubmit).toBe(false);

  wrapper.find('.submit-btn').simulate('click');

  // Wait a bit before checking this
  setTimeout(() => expect(clickedSubmit).toBe(true), 30);
});
