import React, { useContext } from 'react'
import { Container, Form, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { postData } from '../helpers/postData';
import { useForm } from '../hooks/useForm';

export const LoginScreen = () => {
  
    const {setUser, user} = useContext(AppContext);

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login Sirve")
        console.log(email, password)

        let body = {
          email: email, 
          contrasena: password
          }
        
        postData('/users/login', body).then( r => {
            console.log('me respondio' + r);
            if (r.status === 'success') {
              const {email, id_usuario, nombre, apellido, fecha_nacimiento, username } = r.data;
              setUser({
                  ...user,
                  email: email,
                  id: id_usuario,
                  nombre: `${nombre} ${apellido}`,
                  username: username,
                  fechaNacimiento: fecha_nacimiento,
                  isLogged: true,
                });
            } else {
              console.log('error');
            }
        });
        
    }


    return (
        <div className="login_main">

            <Container className="login_container">

                <h1 className="auth_title">¡BIENVENIDO DE VUELTA!</h1>
                <Row className="justify-content-start">
                    <Form className="login_form" onSubmit={handleLogin}>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control className="input"
                                type="text"
                                placeholder="example@gmail.com"
                                name="email"
                                autoComplete="off"
                                value={email}
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control className="input"
                                type="password"
                                placeholder="**********"
                                name="password"
                                value={password}
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Container className="justify-content-center">

                            <Form.Group>
                                <div className="auth_link">
                                    <Link
                                        to="/auth/register"
                                        className="link" >
                                        ¿Todavía no tienes cuenta? ¡Registrate!
                                </Link>
                                </div>

                            </Form.Group>


                            <Button
                                className="auth_button"
                                variant="primary"
                                type="submit"
                            >
                                INGRESAR
                            </Button>


                            <Form.Group>
                                <div className="auth_link"> ¿Olvidaste tu contraseña?</div>
                            </Form.Group>

                        </Container>

                    </Form>
                </Row>
            </Container>

        </div>
    )
}
