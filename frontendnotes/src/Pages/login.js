import React,{useState} from 'react';
import {Form,Button,Container} from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar';
import Cookies from 'universal-cookie';

const cookies=new Cookies();

const styles={
    heading1:{
        color:"blue"
    }
}

function Login() {
    
    const [enteredPassword,setPassword]= useState('');
    const [enteredMobile,setMobile]=useState('');

    const passwordChangeHandler =(event)=>{
        setPassword(event.target.value);
    }
    const mobileChangeHandler = (event) =>{
        setMobile(event.target.value);
    }

    const loginHandler= (event) => {
        event.preventDefault();

        //reset values
        setPassword('');
        setMobile('');
console.log(enteredMobile,enteredPassword);
        fetch('http://127.0.0.1:2000/verifylogin?'+'username='+enteredMobile+'&password='+enteredPassword)
        .then(
            (response) => (response.json())
        ).then((response)=>{
            if(response.status==='success'){
                cookies.set('username',enteredMobile);
                document.getElementById('res').innerHTML='credntials are correct';
                document.getElementById('err').innerHTML='';
                window.location.replace('/dashboard');
            } else if(response.status==='failure'){
                document.getElementById('err').innerHTML='Credentials are incorrect';
                document.getElementById('res').innerHTML='';
            }

        });
    }
    return(
        <div>
            <Navbar/>
           <Container className='col-sm-3'>
             <h1 style={styles.heading1}>Login Form </h1> <br />

             <Form onSubmit={loginHandler}>
                <Form.Group>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text"  value={enteredMobile} onChange={mobileChangeHandler} placeholder='enter Mobile' required/>
                </Form.Group><br/>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  value={enteredPassword} onChange={passwordChangeHandler} placeholder='enter password' required/>
                </Form.Group><br/>

                <Button type='submit'>Login</Button>
            </Form>

                <span style={{color:"red"}} id="err" ></span>
                <span style={{color:"green"}}id="res"></span>  

            </Container>
           

        </div>
    );
}

export default Login;