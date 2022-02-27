import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useContext,useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from './AlertMessage';


const RegisterForm = () => {
    const {registerUser} = useContext(AuthContext)

    // register user state
    const [registerForm,setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password, confirmPassword} = registerForm

    const onchangeRegisterForm = event => 
        setRegisterForm({...registerForm,[event.target.name]: event.target.value})

    //submit from
    const register = async event => {
        event.preventDefault()

        if(password !== confirmPassword) {
            setAlert({type: 'danger', message: 'Password do not match'})
            setTimeout(() => setAlert(null),5000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if(!registerData.success) {
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(() => setAlert(null),5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className='mb-2'>
                    <Form.Control 
                        type='text' 
                        placeholder='username' 
                        name='username' 
                        required 
                        value={username}
                        onChange={onchangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Control 
                        type='password' 
                        placeholder='password' 
                        name='password' 
                        required 
                        value={password}
                        onChange={onchangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm password' 
                        name='confirmPassword' 
                        required 
                        value={confirmPassword}
                        onChange={onchangeRegisterForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit' className='mb-2'>Register</Button>
            </Form>
            <p>Already have an account?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-4'>Login</Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm

