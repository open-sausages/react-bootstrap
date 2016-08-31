import classNames from 'classnames';
import React from 'react';
import { splitBsProps } from './utils/bootstrapUtils';
import elementType from 'react-prop-types/lib/elementType';

const propTypes = {
  href: React.PropTypes.string,
  onClick: React.PropTypes.func,
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  role: React.PropTypes.string,
  tabIndex: React.PropTypes.oneOfType([
    React.PropTypes.number, React.PropTypes.string,
  ]),
  /**
   * this is sort of silly but needed for Button
   */
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'a',
};

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
 */
class SafeAnchor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { disabled, href, onClick } = this.props;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  }

  render() {
    const { componentClass: Component, active, disabled, className, ...props } = this.props;
    const [, elementProps] = splitBsProps(props);

    if (isTrivialHref(elementProps.href)) {
      elementProps.role = elementProps.role || 'button';
      // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')
      elementProps.href = elementProps.href || '';
    }

    if (disabled) {
      elementProps.tabIndex = -1;
      elementProps.style = { pointerEvents: 'none', ...elementProps.style };
    }

    return (
      <Component
        {...elementProps}
        className={classNames(className, { active, disabled })}
        onClick={this.handleClick}
      />
    );
  }
}

SafeAnchor.propTypes = propTypes;
SafeAnchor.defaultProps = defaultProps;

export default SafeAnchor;
