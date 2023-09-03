import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    IconButton,
    Avatar,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Api from '../../../ultil/Api';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const Cadastro = () => {
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [foto, setFoto] = useState(null);

    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            Api.get("http://localhost:3100/obterempresa/" + id, { id: id }).then((response) => {
                if (response && response.data) {
                    setCnpj(response.data.cnpj)
                    setRazaoSocial(response.data.nome_empresa)
                }

            })
        }

    }, [id])

    const handleCnpjChange = (e) => {
        setCnpj(e.target.value);
    };

    const handleRazaoSocialChange = (e) => {
        setRazaoSocial(e.target.value);
    };

    const handleFotoUpload = (e) => {
        const file = e.target.files[0];
        setFoto(file);
    };
    


    

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Aqui você pode enviar os dados (CNPJ, Razão Social e a foto) para a API ou realizar outra ação desejada


    //     const formData = new FormData();

    //     // Adicione os campos do formulário (CNPJ e Razão Social) ao FormData
    //     formData.append('nome_empresa', razaoSocial);
    //     console.log('razaoSocial: ', razaoSocial);
    //     formData.append('cnpj', cnpj);
    //     console.log('cnpj: ', cnpj);

    //     // Adicione a imagem ao FormData se estiver presente
    //     if (foto) {
    //         formData.append('imagem', foto);
    //     }
    //     console.log('formData: ', formData);


    //     console.log('Razão Social:', formData.get('nome_empresa'));
    //     console.log('CNPJ:', formData.get('cnpj'));
    //     console.log('Imagem:', formData.get('imagem'));


    //     let values = { nome_empresa: razaoSocial, cnpj: cnpj, foto: foto }

    //     Salvar(id ? values : formData)

    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('nome_empresa', razaoSocial);
        formData.append('cnpj', cnpj);

        if (foto) {
            formData.append('imagem', foto);
        }

        let values = { nome_empresa: razaoSocial, cnpj: cnpj, foto: foto };

        if (id) {
            // Modo de Alteração
            Api.put("http://localhost:3100/alterarempresa", {
                id: id,
                ...values
            }).then((response) => {
                Swal.fire({
                    title: 'Operação Realizada!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                navigate('/consulta/empresa');
            });
        } else {
            // Modo de Cadastro
            Api.post("http://localhost:3100/cadastroempresa", formData).then((response) => {
                Swal.fire({
                    title: 'Operação Realizada!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                navigate('/consulta/empresa');
            });
        }
    };


    // const Salvar = (data) => {

    //     if (id) {
    //         Api.put("http://localhost:3100/alterarempresa", {
    //             id: id,
    //             ...data
    //         }).then((response) => {
    //             // swal("Concluído", "Alteracão Realizada", "success");
    //             Swal.fire({
    //                 title: 'Operação Realizada!',
    //                 // text: 'Do you want to continue',
    //                 icon: 'success',
    //                 confirmButtonText: 'Cool'
    //             })
    //             navigate('/consulta/empresa')
    //         })
    //     } else {
    //         Api.post("http://localhost:3100/cadastroempresa", data).then((response) => {
    //             Swal.fire({
    //                 title: 'Operação Realizada!',
    //                 // text: 'Do you want to continue',
    //                 icon: 'success',
    //                 confirmButtonText: 'Cool'
    //             })
    //             navigate('/consulta/empresa')
    //         })
    //     }

    // }

    return (

        <Container maxWidth="sm" style={{ marginTop: '100px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Cadastro
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="CNPJ"
                        variant="outlined"
                        margin="normal"
                        value={cnpj}
                        onChange={handleCnpjChange}
                    />
                    <TextField
                        fullWidth
                        label="Razão Social"
                        variant="outlined"
                        margin="normal"
                        value={razaoSocial}
                        onChange={handleRazaoSocialChange}
                    />
                    <input
                        accept="image/*"
                        id="foto-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFotoUpload}
                    />
                    <label htmlFor="foto-upload">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCamera />
                        </IconButton>
                        <Typography variant="body2">Carregar Foto</Typography>
                    </label>
                    {foto && (
                        <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
                            <Avatar src={URL.createObjectURL(foto)} alt="Foto" />
                        </Grid>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    >
                        Cadastrar
                    </Button>
                </form>
            </Paper>
        </Container>

    );
};

export default Cadastro;
