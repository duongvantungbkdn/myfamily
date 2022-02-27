import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Logout from '../../assets/icons/LogoutDoor.png'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {

    // load username from authState of AuthCOntext
    const {logoutUser, authState: {user}} = useContext(AuthContext)

    const logout = () => logoutUser()

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Container>
                <Navbar.Brand >
                    <Nav.Link className='font-weight-bolder text-white' to='/' as={Link}>
                        MyFamily
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link className='font-weight-bolder text-white' to='/contact' as={Link}>
                            Contact
                        </Nav.Link>
                        <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
                            About
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        {!user ? 
                            <Nav.Link className='font-weight-bolder text-white' to='/login' as={Link}>
                                Login to enjoy! Click here.
                            </Nav.Link>
                            :
                            <NavDropdown title={`Wellcome ${user.username}`} id="basic-nav-dropdown" className='font-weight-bolder text-white'>
                                <NavDropdown.Item>
                                    <Link to='/myAccount' className='text-decoration-none text-dark'>
                                        My Account
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to='/myVideos' className='text-decoration-none text-dark'>
                                        My Videos
                                    </Link>
                                </NavDropdown.Item>

                                {
                                    (user.role === 'ADM' || user.role === 'ADM1') && 
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link to='/videosList' className='text-decoration-none text-dark'>
                                                Videos List
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to='/usersList' className='text-decoration-none text-dark'>
                                                Users List
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to='/configApp' className='text-decoration-none text-dark'>
                                                Config App
                                            </Link>
                                        </NavDropdown.Item>
                                    </>                                
                                }

                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Button  className='bg-danger font-weight-bolder text-white' onClick={logout} >
                                        <img src={Logout} alt='logout' width='30' heighr='30'/>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        }                         
                    </Nav>
                </Navbar.Collapse>                
            </Container>            
        </Navbar>
    )
}

export default NavbarMenu
