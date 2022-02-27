import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState,useContext,useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from './AlertMessage';
import { ConfigAppContext } from "../../contexts/ConfigAppContext"

const LoginForm = () => {
    //context
    const {loginUser} = useContext(AuthContext)
    const {
        configAppState: {lockRegister},
        getConfigApp
    } = useContext(ConfigAppContext)

    useEffect(() => getConfigApp(),[])
    
    // login user state
    const [loginForm,setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm

    const onchangeLoginForm = event => 
        setLoginForm({...loginForm,[event.target.name]: event.target.value})

    // submit Form
    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success) {
            } else {
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null),5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={login}>
                <AlertMessage info={alert}/>
                <Form.Group className='mb-2'>
                    <Form.Control 
                        type='text' 
                        placeholder='username' 
                        name='username' 
                        value={username}
                        onChange={onchangeLoginForm}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Control 
                        type='password' 
                        placeholder='password' 
                        name='password' 
                        value={password}
                        onChange={onchangeLoginForm}
                        required 
                    />
                </Form.Group>
                <Button variant='success' type='submit' className='mb-2'>Login</Button>
            </Form>
            {!lockRegister &&
                <p>Don't have an account?
                    <Link to='/register' >
                        <Button variant='info' size='sm' className='ml-2'>Register</Button>
                    </Link>
                </p>            
            }
        </>  

    )
}

export default LoginForm

