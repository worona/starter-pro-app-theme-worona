import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import styles from './style.css';

const FetchInfo = ({ status, refresh }) => {
  if (status === 'fetching')
    return (
      <div className="notification is-warning">
        <div className="level is-mobile">
          <div className="level-left">
            Please wait, we are fetching your pages and categories.
          </div>
          <div className="level-right is-marginless">
            <button
              className={`button is-loading is-warning ${styles.removeButtonBackground}`}
              onClick={refresh}
            />
          </div>
        </div>
      </div>
    );
  else if (status === 'succeed')
    return (
      <div className="notification">
        <div className="level is-mobile">
          <div className="level-left">
            Succeed! We have successfully fetched your pages and categories.
          </div>
          <div className="level-right is-marginless">
            <button
              className={`button is-light ${styles.removeButtonBackground}`}
              onClick={refresh}
            >
              <span className="icon"><i className="fa fa-refresh" /></span>
            </button>
          </div>
        </div>
      </div>
    );
  else if (status === 'error')
    return (
      <div className="notification is-danger">
        <div className="level">
          <div className="level-left">
            <span>
              Something went wrong while fetching your pages and categories. Please contact with
              {' '}
              <a
                href="https://www.worona.org/get-help"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white', fontWeight: 'bold' }}
              >
                Worona support.
              </a>
            </span>
          </div>
          <div className="level-right is-marginless">
            <button
              className={`button is-danger ${styles.removeButtonBackground}`}
              onClick={refresh}
            >
              <span className="icon"><i className="fa fa-refresh" /></span>
            </button>
          </div>
        </div>
      </div>
    );
  return null;
};
FetchInfo.propTypes = {
  status: React.PropTypes.string.isRequired,
  refresh: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: selectors.getStatus(state),
});

const mapDispatchToProps = dispatch => ({
  refresh() {
    dispatch(actions.categoriesListRequested());
    dispatch(actions.pagesListRequested());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FetchInfo);
