import api from "../../../ultil/Api";
import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    IconButton
} from '@mui/material';
import { Link } from "react-router-dom";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2'
import ImageModal from "../../../components/Modal";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; 
import EditIcon from '@mui/icons-material/Edit'; 
import PhotoIcon from '@mui/icons-material/Photo';

const Consulta = () => {
    const [data, setData] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompanyImage, setSelectedCompanyImage] = useState(null);

    useEffect(() => {

        setTimeout(() => {
            obterDados()
        }, 500);

    }, [])

    const obterDados = () => {

        api.get('/empresas').then(data => {
            if (data.data) {
                setData(data.data)
            }
        })

    }

    const excluir = (item) => {

        api.delete('/excluirempresa/' + item.id).then(data => {
            Swal.fire({
                title: 'Operação Realizada!',
                // text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            obterDados()
            setSelectedCompanyImage(null);
        })

    }

    const mostrarImagem = (item) => {
        console.log('item: ', item);


        setSelectedCompanyImage(item.imagem); // Carregue a imagem da empresa selecionada
        setIsModalOpen(true);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '100px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Consulta Empresa
                    </Typography>
                    <Link to={'/cadastro/empresa'}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleOutline />}

                        >
                            Cadastrar
                        </Button>
                    </Link>

                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>CNPJ</TableCell>
                                <TableCell>Raza Social</TableCell>
                                <TableCell>Data Registro</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data ? data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.cnpj}</TableCell>
                                    <TableCell>{item.nome_empresa}</TableCell>
                                    <TableCell>{item.data_registro}</TableCell>
                                    <TableCell align="left">
                                        <Link to={"/alteracao/empresa/" + item.id}>
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                style={{ marginRight: '10px' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Link>

                                        <IconButton
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => excluir(item)}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>

                                        {item.imagem ? <IconButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => mostrarImagem(item)}
                                        >
                                            <PhotoIcon />
                                        </IconButton> : <></>}
                                        <ImageModal open={isModalOpen} onClose={() => setIsModalOpen(false)} image={selectedCompanyImage} />

                                    </TableCell>
                                </TableRow>
                            )) : <></>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default Consulta;