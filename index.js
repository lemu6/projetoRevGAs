const express = require('express');
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get('/', async function (req, res) {
  try {
    const ListaBancos = await prisma.bancos.findMany();
    res.json(ListaBancos);
  } catch (error) {
    console.error("Erro ao obter lista de bancos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


app.get('/:codigo', async function (req, res) {
  const { codigo } = req.params;
  try {
    const banco = await prisma.bancos.findUnique({
      where: {
        codigo_compensacao: parseInt(codigo)
      }
    });
    if (!banco) {
      return res.status(404).json({ error: "Banco não encontrado" });
    }
    res.json(banco);
  } catch (error) {
    console.error("Erro ao buscar banco:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});



app.listen(8687, () => {
  console.log("Servidor rodando");
});
