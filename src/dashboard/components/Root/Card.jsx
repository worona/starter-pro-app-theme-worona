import React from 'react';

const Card = ({type}) => (
  <div className="box">
    <article className="media">
      <div className="media-content">
        <div className="columns">
          <div className="column is-one-third">
            <label className="label">Type</label>
              <p className="control">
                <span className="select">
                  <select>
                    <option>Category</option>
                    <option>Page</option>
                    <option>Other</option>
                  </select>
                </span>
              </p>
          </div>
          <div className="column is-two-thirds">
            <label className="label">Label</label>
            <p className="control">
              <input className="input" type="text" value="Category 1" />
            </p>
            <label className="label">Category</label>
            <p className="control">
              <p className="control">
                <span className="select">
                  <select>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                  </select>
                </span>
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className="media-right">
        <button className="delete" />
      </div>
    </article>
  </div>
);

Card.propTypes = {
  type: React.PropTypes.string,
};

export default Card;
