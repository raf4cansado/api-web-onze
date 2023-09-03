import React from 'react';
import { Modal, Paper, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';

const ImageModal = ({ open, onClose, image }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="custom-modal">
                <Paper
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        maxWidth: '80%',
                        background: 'rgba(255, 255, 255, 0.7)', // Cor de fundo com transparência
                    }}
                >
                    <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" align="center" gutterBottom>
                        Visualização Imagem
                    </Typography>
                    <img
                        src={`data:image/jpeg;base64,${image}`}
                        alt="Imagem"
                        style={{
                            display: 'block',
                            margin: '0 auto',
                            maxWidth: '50%', // Ajuste o tamanho da imagem para 50% da tela
                        }}
                    />
                </Paper>
            </div>
        </Modal>
    );
};

export default ImageModal;


