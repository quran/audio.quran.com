import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import Link from 'react-router/lib/Link';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

@connect(
  state => ({qaris: state.qaris.entities})
)
export default class Qaris extends Component {
  static propTypes = {
    qaris: PropTypes.object.isRequired
  };

  render() {
    const { qaris } = this.props;

    return (
      <Grid>
        <Row>
          {
            Object.values(qaris).map(qari => {
              return (
                <Col md={12} key={qari.id}>
                  {qari.name}
                </Col>
              );
            })
          }
        </Row>
      </Grid>
    );
  }
}
