const { setDefaultResultOrder } = require('dns')
const express = require('express')
const cors = require('cors')
const Client = require('pg').Client
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const upload = multer();

const db = new Client({
    user: "postgres",
    password: "admin123",
    host: "localhost",
    port: 5432,
    database: "studio_bd"
})

db.connect()

const secretKey = crypto.randomBytes(32).toString('hex');

const app = express()
app.use(express.json())
app.use(cors())



app.listen(3100, () => console.log("up!!"))

app.get('/usuario', function (req, res) {
    res.send('hello world')
})


// app.get('/empresas', (req, res) => {

//     try {
//         const sql = `SELECT *, to_char(data_registro, 'DD/MM/YYY') as data_registro FROM EMPRESA order by id`

//         const retorno = db.query(sql, (err, result) => {

//             if (err) {
//                 console.log('err: ', err);

//             } else {
//                 res.status(200).json(result.rows)
//             }
//         })

//         return retorno


//     } catch (error) {
//         console.log('error: ', error);

//     }


// })

app.get('/empresas', (req, res) => {
    try {
        const sql = `SELECT *, to_char(data_registro, 'DD/MM/YYY') as data_registro FROM EMPRESA order by id`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log('err: ', err);
                res.status(500).json({ error: 'Erro ao buscar empresas.' });
            } else {
                // Mapeie os resultados para converter a coluna de imagem em base64
                const empresas = result.rows.map((empresa) => {
                    const base64Image = empresa?.imagem?.toString('base64');
                    return { ...empresa, imagem: base64Image };
                });

                res.status(200).json(empresas);
            }
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: 'Erro ao buscar empresas.' });
    }
});

// app.post('/cadastroEmpresa', (req, res) => {

//     const values = req.body
//     console.log('values: ', values);

//     try {

//         let sql = `
//         INSERT INTO public.empresa(
//             nome_empresa, cnpj)
//             VALUES ('${values.nome_empresa}', '${values.cnpj}');
//         `

//         const retorno = db.query(sql, (err, result) => {

//             if (err) {
//                 console.log('err: ', err);

//             } else {
//                 res.status(200).json(result)
//             }

//         })

//         return retorno


//     } catch (error) {
//         console.log('error: ', error);

//     }


// })


// const upload = multer({ dest: 'uploads/' }); // Diretório onde os arquivos serão temporariamente armazenados

app.post('/cadastroEmpresa', upload.single('imagem'), (req, res) => {
    const values = req.body;
    const imagem = req.file; // O objeto 'file' contém os dados da imagem

    console.log('values: ', values);
    console.log('imagem: ', imagem);

    try {
        let sql = `
            INSERT INTO public.empresa(nome_empresa, cnpj, imagem)
            VALUES ($1, $2, $3)
        `;

        let valuesToInsert = [values.nome_empresa, values.cnpj, null]; // Valor padrão para imagem

        if (imagem) {
            valuesToInsert[2] = imagem.buffer; // Usar a imagem se ela estiver presente
        }

        db.query(sql, valuesToInsert, (err, result) => {
            if (err) {
                console.log('err: ', err);
                res.status(500).json({ error: 'Erro ao inserir empresa.' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
});


// app.put("/alterarempresa", (req, res) => {
//     const obj = req.body

//     let SQL = `
//         UPDATE public.empresa
// 	            SET nome_empresa= '${obj.nome_empresa}', cnpj= '${obj.cnpj} '
// 	            WHERE empresa.id = ${obj.id};
//     `
//     db.query(SQL, (err, result) => {
//         if (err) console.log(err)
//         else res.send(result)
//     })
// })


app.put("/alterarempresa", (req, res) => {
    console.log('reqAAAAAAAAAAAA: ', req);
    const obj = req.body;
    console.log('obj: ', obj);

    // Verifique se há uma imagem no objeto
    if (obj.imagem) {
        let SQL = `
            UPDATE public.empresa
            SET nome_empresa = '${obj.nome_empresa}', cnpj = '${obj.cnpj}', imagem = '${obj.imagem}'
            WHERE empresa.id = ${obj.id};
        `;

        db.query(SQL, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Erro ao atualizar empresa" });
            } else {
                res.status(200).json({ message: "Empresa atualizada com sucesso" });
            }
        });
    } else {
        // Se não houver uma imagem, atualize apenas nome e CNPJ
        let SQL = `
            UPDATE public.empresa
            SET nome_empresa = '${obj.nome_empresa}', cnpj = '${obj.cnpj}'
            WHERE empresa.id = ${obj.id};
        `;

        db.query(SQL, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Erro ao atualizar empresa" });
            } else {
                res.status(200).json({ message: "Empresa atualizada com sucesso" });
            }
        });
    }
});


// app.get("/obterempresa/:id", (req, res) => {
//     const id = req.params.id
//     let SQL = `
//         SELECT * FROM empresa WHERE id = ${id};
//     `
//     db.query(SQL, (err, result) => {
//         if (err) console.log(err)
//         else res.status(200).json(result.rows)
//     })

// })

app.get("/obterempresa/:id", async (req, res) => {
    const id = req.params.id;
    try {
        // Execute uma consulta SQL para obter os dados da empresa e a imagem com base no ID da empresa
        const query = 'SELECT id, nome_empresa, cnpj, imagem FROM empresa WHERE id = $1';
        const result = await db.query(query, [id]);

        if (result.rows.length > 0) {
            const empresa = result.rows[0];

            // Certifique-se de definir o cabeçalho de resposta para indicar que é uma resposta JSON
            res.setHeader('Content-Type', 'application/json');

            // Certifique-se de que a imagem seja convertida em uma string base64
            if (empresa.imagem) {
                const imagemBase64 = empresa.imagem.toString('base64');
                empresa.imagem = imagemBase64;
            }

            res.status(200).json(empresa);
        } else {
            res.status(404).json({ error: 'Empresa não encontrada.' });
        }
    } catch (error) {
        console.error('Erro ao obter empresa:', error);
        res.status(500).json({ error: 'Erro ao obter empresa.' });
    }
});

app.delete("/excluirempresa/:id", (req, res) => {
    const id = req.params.id
    let sql = `
        DELETE from empresa WHERE empresa.id = ${id}
    `

    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else res.send(result)
    })
})



async function obterUsuarios() {
    try {

        const sql = 'SELECT * FROM usuario ORDER BY id';
        const result = await db.query(sql);

        return result.rows;
    } catch (error) {
        console.error('erro: ', error);
        throw error; // Rejogue o erro para que possa ser tratado por quem chama a função.
    }
}





app.post('/api/login', async (req, res) => {

    const users = await obterUsuarios()

    const { usuario, password } = req.body;

    // Simulação de verificação das credenciais no banco de dados
    const user = users && users.filter((u) => u.usuario === usuario && u.senha === password);

    if (user.length > 0) {
        // Gere um token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Autenticação bem-sucedida', token });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});