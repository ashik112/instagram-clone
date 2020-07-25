import React, { Component } from 'react';
import { Container } from 'reactstrap';
import axios from '../../utils/axios';
import { apiUrl } from '../../constants';
import UserListItem from '../../shared/components/User/UserListItem';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get(`${apiUrl}/users`).then((res) => {
      this.setState({
        users: [...res.data],
      });
    }).catch((e) => e.handleGlobally(e));
  }

  render() {
    const { users } = this.state;
    return (
      <Container fluid>
        <h5 className="text-grey">Users</h5>
        {
          users && users.map((user) => (
            <div key={user.id}>
              <UserListItem user={user} />
            </div>
          ))
        }
      </Container>
    );
  }
}

export default HomePage;
