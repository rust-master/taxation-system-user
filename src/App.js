import React from 'react'
import Footer from './Components/Footer/Footer'
import UserHeader from './Components/UserHeader/UserHeader'
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home'
import Main from './Components/tabs/Main'
import Tax from './Components/Tex_Collection/Tax_Col'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AdminHeader from './Components/AdminHeader/AdminHeader'
import Header from './Components/Header/Header'
import UsersList from './Components/pages/UsersList/UsersList'
import UserRequests from './Components/pages/UserRequests/Requests'

import Cookies from "universal-cookie";
import Requested from './Components/Requested/Requested'

const cookiesAdmin = new Cookies(); // store cookies for admins 
const cookiesUser = new Cookies(); // store cookies for users

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: cookiesAdmin.get("IsAdmin"),
      isUser: cookiesUser.get("IsUser"),
    };
  }

  render() {
    console.log("Admin Auth: " + this.state.isAdmin);
    console.log("User Auth: " + this.state.isUser);
    return (
      <BrowserRouter>
        <div className="App">
          {this.state.isUser ? (
            <UserHeader />
          ) : this.state.isAdmin ? (
            <AdminHeader />
          ) : (
            <Header />
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-list" element={<UsersList />} />
            <Route path="/user-requests" element={<UserRequests />} />

            <Route path="/befiler" element={<Main />} />
            <Route path="/requested" element={<Requested />} />

            <Route path="/tax" element={<Tax />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contectus" element={<Home />} />
            <Route path="/oonnectwithmetamask" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
