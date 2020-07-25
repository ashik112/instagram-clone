import React, { Component } from 'react';
import { Container, Spinner } from 'reactstrap';
import axios from '../../utils/axios';
import { apiUrl } from '../../constants';
import UserListItem from '../../shared/components/User/UserListItem';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, () => {
      axios.get(`${apiUrl}/users`).then((res) => {
        this.setState({
          users: [...res.data],
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
    const { users, loading } = this.state;
    return (
      <Container fluid>
        <h5 className="text-muted">Users</h5>
        {
          !loading && users && users.map((user) => (
            <div key={user.id}>
              <UserListItem user={user} />
            </div>
          ))
        }
        {
          loading && (
            <div className="text-center mt-5">
              <Spinner type="grow" color="secondary" />
            </div>
          )
        }
      </Container>
    );
  }
}

export default HomePage;
