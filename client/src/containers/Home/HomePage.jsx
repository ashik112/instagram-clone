import React, { Component } from 'react';
import { Container, Spinner } from 'reactstrap';
import axios from '../../utils/axios';
import UserListItem from '../User/UserListItem';
import { apiRoutes } from '../../routing/apiRoutes';

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
      axios.get(apiRoutes.user.getAll).then((res) => {
        this.setState({
          users: [...res.data],
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
