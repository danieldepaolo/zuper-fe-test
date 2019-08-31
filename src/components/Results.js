import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import Loader from 'react-loader-spinner'

import { userColumnns } from '../constants';
import { tableSortMethod } from '../helpers';

const Results = ({ userData, isFetching }) => {
  if (!userData) {
    return null;
  }

  const isEmpty = Object.keys(userData).length === 0;
  const firstRecord = !isEmpty && userData['0'].output;
  const isIndividual = firstRecord && !!firstRecord.username;

  return (
    <div className="results-area">
      <h4>Results</h4>
      {isFetching ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      ) : (
        <div>
          {!isEmpty && isIndividual ? (
            <ReactTable
              columns={userColumnns}
              defaultPageSize={10}
              defaultSortMethod={tableSortMethod}
              data={Object.values(userData).map(record => record.output)}
            />
          ) : (
            <ul className='list-group'>
              {Object.keys(firstRecord).map(key => (
                <li className='list-group-item' key={key}>
                  <span>
                    <label>{key}</label>
                    <strong>{` ${firstRecord[key]}`}</strong>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

Results.propTypes = {
  userData: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};
export default Results;
