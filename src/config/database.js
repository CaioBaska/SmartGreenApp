const oracledb = require('oracledb');

async function connect() {
  const config = {
    user: 'SYSTEM',
    password: 'baska458',
    connectString: 'localhost' // ex: localhost:1521/XE
  };

  try {
    const connection = await oracledb.getConnection(config);
    console.log('Conexão bem-sucedida com o banco de dados!');
    return connection;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  }
}

async function getUsers() {
  let conn;

  try {
    conn = await connect();

    const result = await conn.execute('SELECT * FROM C##TCC.USUARIOS');
    console.log('Consulta bem-sucedida!');

    return result.rows;
  } catch (err) {
    console.error('Erro ao executar consulta:', err.message);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Erro ao fechar conexão:', err.message);
      }
    }
  }
}

module.exports = { getUsers };
