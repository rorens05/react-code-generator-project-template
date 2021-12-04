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
      await this.setState({loading: false, user: response.data})
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
