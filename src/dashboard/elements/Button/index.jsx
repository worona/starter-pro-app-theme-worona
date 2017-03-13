import React from 'react';
import cx from 'classnames';

const Button = ({
  children, onClick, color, size, outlined, center, loading, disabled, animate, className, inverted,
  type = 'button', style }) => {
  const buttonClass = cx(
    'button',
    className,
    color && `is-${color}`,
    size && `is-${size}`,
    loading && 'is-loading',
    outlined && 'is-outlined',
    inverted && 'is-inverted',
    disabled && 'is-disabled',
    animate && `animated ${animate}`
  );
  return (
    <span className={cx(center && 'is-text-centered')}>
      <button type={type} className={buttonClass} onClick={onClick} style={style}>
        {children}
      </button>
    </span>
  );
};

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func,
  color: React.PropTypes.string,
  size: React.PropTypes.string,
  outlined: React.PropTypes.bool,
  inverted: React.PropTypes.bool,
  center: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  animate: React.PropTypes.string,
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  style: React.PropTypes.object,
};

export default Button;
