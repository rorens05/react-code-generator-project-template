import React, {Component} from 'react';
import Auth from '../api/Auth';
export const UserContext = React.createContext();

export class UserContextProvider extends Component {
  state = {
    user: null,
    loading: true
  };

  refreshUser = async () => {
    await this.setState({loading: true})

    let response = await new Auth().profile()
    if(response.ok) {
      let user = response.data
      user.role = user.role.roleName
      switch (user.role) {
        case "Student":
          user.name = `${user.student?.fname} ${user.student?.lname}`
          user.isStudent = true
          break;
        case "Teacher":
          user.name = `${user.teacher?.fname} ${user.teacher?.lname}`
          user.isTeacher = true
          break;
        default:
          break;
      }
       
      await this.setState({loading: false, user })
    } else {
      await this.setState({loading: false, user: null})
    }    
  };

  setLoading = (loading) => {
    this.setState({loading});
  };

  render() {
    const {children} = this.props;
    const {
      user,
      loading
    } = this.state;
    return (
      <UserContext.Provider
        value={{
          data: {
            user,
            loading,
            refreshUser: this.refreshUser
          },
        }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
