/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ProfileHeader from './components/ProfileHeader';
import Posts from '../Gallery/Posts';
import axios from '../../utils/axios';
import { apiUrl } from '../../constants';
import NoMatch from '../../shared/components/NoMatch';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { match: { params: { username } } } = this.props;
    const { match: { params: { username: nextUsername } } } = nextProps;
    if (nextUsername !== username) {
      this.fetchData();
    }
    return true;
  }

  componentWillUnmount() {
    this.setState({
      loading: false,
      user: null,
    });
  }

  fetchData() {
    this.setState({
      loading: true,
    }, () => {
      // eslint-disable-next-line react/prop-types
      const { match: { params: { username } } } = this.props;
      axios.get(`${apiUrl}/users/username/${username}`).then((res) => {
        this.setState({
          user: res.data,
          loading: false,
        });
      }).catch(() => {
        this.setState({
          loading: false,
        });
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <>
        {
          (user && (
            <>
              <Row>
                <Col>
                  <ProfileHeader user={user} />
                </Col>
              </Row>
              <Row className="pt-2">
                <Col>
                  <Posts user={user} />
                </Col>
              </Row>
            </>
          )) || (!loading && <NoMatch />)
        }
      </>
    );
  }
}

export default ProfilePage;
