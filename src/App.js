import React, {Fragment,useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios' 
import './App.css';


const App = () => {
    const [users,setUsers] =    useState([]);
    const [user,setUser] =      useState({});
    const [repos,setRepos] =    useState([]);
    const [loading,setLoading] =useState(false);
    const [alert,setAlert] =    useState(null);

    const searchUsers = async text => {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&
        client_id=${process.env.REACT_APP_GH_CLID}&client_secret=${process.env.REACT_APP_GH_CLSEC}`
      );
      setUsers(res.data.items)
      setLoading(false)
    }

    const getUser = async userame => {
      setLoading(true)
      const res = await axios.get(
        `https://api.github.com/users/${userame}?
        client_id=${process.env.REACT_APP_GH_CLID}&client_secret=${process.env.REACT_APP_GH_CLSEC}`
      );
      setUser(res.data)
      setLoading(false)
    }

    const getUserRepos = async userame => {
      setLoading(true)
      const res = await axios.get(
        `https://api.github.com/users/${userame}/repos?per_page=5&sort=created:asc&
        client_id=${process.env.REACT_APP_GH_CLID}&client_secret=${process.env.REACT_APP_GH_CLSEC}`
      );
      setRepos(res.data)
      setLoading(false)
    }
    const clearUsers = () => {
      setUsers([])
      setLoading(false)
    }
    const putAlert = (msg, type) => {
      setAlert({msg,type});
      setTimeout(() => setAlert(null),3000)
    }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    putAlert={putAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )}
          />
          <Route exact path= '/about' component={About} />
          <Route exact path='/user/:login' render={props => (
            <User 
              {...props}
              getUser={getUser}
              getUserRepos={getUserRepos}
              user={user}
              repos={repos}
              loading={loading}
            />
            )}
          />
          </Switch>
        </div>
        
      </div>

    </Router>
  );
}

export default App;
