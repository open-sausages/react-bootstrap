import classNames from 'classnames';
import React from 'react';
import { prefix, splitBsProps } from './utils/bootstrapUtils';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  role: React.PropTypes.string,
  href: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  eventKey: React.PropTypes.any,
};

const defaultProps = {
  active: false,
  disabled: false
};

class NavItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }

  render() {
    const { active, onClick, className, style, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    delete elementProps.onSelect;
    delete elementProps.eventKey;

    // These are injected down by `<Nav>` for building `<SubNav>`s.
    delete elementProps.activeKey;
    delete elementProps.activeHref;

    if (!elementProps.role) {
      if (elementProps.href === '#') {
        elementProps.role = 'button';
      }
    } else if (elementProps.role === 'tab') {
      elementProps['aria-selected'] = active;
    }

    return (
      <li
        role="presentation"
        className={classNames(className, prefix(bsProps, 'item'))}
        style={style}
      >
        <SafeAnchor
          {...elementProps}
          active={active}
          className={prefix(bsProps, 'link')}
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  }
}

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

export default NavItem;
