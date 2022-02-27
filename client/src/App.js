import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Elements/Layouts/Home'
import About from './Elements/Layouts/About'
import Contact from './Elements/Layouts/Contact'
import Auth from './Elements/Layouts/Auth'
import ShowData from './Elements/Layouts/ShowData'
import MyAccount from './Elements/Layouts/MyAccount'
import MyVideos from './Elements/Layouts/MyVideos'
import VideosList from './Elements/Layouts/VideosList'
import VideosTrash from './Elements/Layouts/VideosTrash';
import UsersList from './Elements/Layouts/UsersList'
import ConfigApp from './Elements/Layouts/ConfigApp'

import NavbarMenu from './Elements/Components/NavbarMenu'
import Container from 'react-bootstrap/Container';
import AuthContextProvider from './contexts/AuthContext';
import DataContextProvider from './contexts/DataContext';
import ConfigAppContextProvider from './contexts/ConfigAppContext';
import AuthPreventRoute from './routings/AuthPreventRoute'
import ConfigAppPreventRoute from './routings/ConfigAppPreventRoute'
import UserPrivateRoute from './routings/UserPrivateRoute'
import AdminPrivateRoute from './routings/AdminPrivateRoute'

function App() {
    return (
        <ConfigAppContextProvider>
            <AuthContextProvider>
                <DataContextProvider>
                    <BrowserRouter>
                        <NavbarMenu/>
                        <Container>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="about" element={<About/>} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="video/:id" element={<ShowData />} />
                                
                                <Route element={<AuthPreventRoute/>} >
                                    <Route path="login" element={<Auth auth='login'/>} />
                                    <Route element={<ConfigAppPreventRoute/>} >
                                        <Route path="register" element={<Auth auth='register'/>} />
                                    </Route>
                                </Route>

                                <Route element={<UserPrivateRoute/>} >
                                    <Route path="myAccount" element={<MyAccount />} />
                                    <Route path="myVideos" element={<MyVideos />} />
                                </Route>

                                <Route element={<AdminPrivateRoute/>} >
                                    <Route path="videosList" element={<VideosList />} />
                                    <Route path="usersList" element={<UsersList />} />
                                    <Route path="trash/data" element={<VideosTrash />} />                                
                                    <Route path="configApp" element={<ConfigApp />} />                                
                                </Route>
                            </Routes>
                        </Container>            
                    </BrowserRouter> 
                </DataContextProvider>
            </AuthContextProvider>
        </ConfigAppContextProvider>
               
    )
}

export default App;
