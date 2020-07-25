import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ProfileHeader from './components/ProfileHeader';
import Posts from './components/Posts';
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
      }).catch((e) => {
        console.log(e);
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
