import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Fade from '../src/Fade';

describe('Fade', () => {

  let Component, instance;

  beforeEach(() => {

    Component = React.createClass({
      render() {
        let { children, ...props } = this.props;

        return (
          <Fade ref={r => this.fade = r}
            {...props} {...this.state}
          >
            <div>
              {children}
            </div>
          </Fade>
        );
      }
    });
  });

  it('Should default to hidden', () => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    assert.ok(
      instance.fade.props.in === false);
  });

  it('Should always have the "fade" class', () => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    assert.ok(
      instance.fade.props.in === false);

    assert.equal(
      ReactDOM.findDOMNode(instance).className, 'fade');

  });

  it('Should add "show" class when entering', done => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    function onEntering() {
      assert.equal(ReactDOM.findDOMNode(instance).className, 'fade show');
      done();
    }

    assert.ok(
      instance.fade.props.in === false);

    instance.setState({ in: true, onEntering });
  });

  it('Should remove "show" class when exiting', done => {
    instance = ReactTestUtils.renderIntoDocument(
      <Component in>Panel content</Component>
    );

    function onExiting() {
      assert.equal(ReactDOM.findDOMNode(instance).className, 'fade');
      done();
    }

    assert.equal(
      ReactDOM.findDOMNode(instance).className, 'fade show');

    instance.setState({ in: false, onExiting });
  });
});
