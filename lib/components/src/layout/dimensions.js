import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styled from 'react-emotion';

import { baseFonts } from '../';

const DISPLAY_TIMEOUT = 1000;

const Container = styled('div')({
  position: 'absolute',
  padding: 5,
  bottom: 10,
  right: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
});

const Section = styled('span')(baseFonts, { fontSize: 12 });

const Delimiter = styled('span')(baseFonts, {
  margin: '0px 5px',
  fontSize: 12,
});

class Dimensions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      isVisible: false,
    };

    this.hideTimeout = null;
  }

  componentDidUpdate() {
    if (this.state.isVisible) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = setTimeout(() => {
        this.setState({ isVisible: false });
      }, DISPLAY_TIMEOUT);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hideTimeout);
  }

  render() {
    if (!this.state.isVisible) {
      return null;
    }

    const { width, height } = this.props;

    return (
      <Container>
        <Section>{`${width}px`}</Section>
        <Delimiter>x</Delimiter>
        <Section>{`${height}px`}</Section>
      </Container>
    );
  }
}

Dimensions.getDerivedStateFromProps = (nextProps, prevState) => {
  if (nextProps.width !== prevState.width || nextProps.height !== prevState.height) {
    return { ...nextProps, isVisible: true };
  }
  return null;
};

Dimensions.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Dimensions;
