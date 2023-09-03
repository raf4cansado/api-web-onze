import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
} from '@mui/material';

import Api from '../../ultil/Api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const navigate = useNavigate()


    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
        setError(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await Api.post('/api/login', { usuario, password });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token)
                navigate('/consulta/empresa');
            } else {
                console.error('Erro de autenticação:', response.data.message);
                setError('Usuário ou senha incorretos');
            }
        } catch (error) {
            setError('Usuário ou senha incorretos');

            console.error('Erro ao fazer login:', error);
        }
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container maxWidth="sm">
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Usuario"
                            variant="outlined"
                            margin="normal"
                            value={usuario}
                            onChange={handleUsuarioChange}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {error && ( // Renderize a mensagem de erro se houver um erro
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '20px' }}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default Login;