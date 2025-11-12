
const express = require('express');
const app = express();
const port = process.env.PORT || 8085;

app.use(express.json());

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

app.post('/sqrt', (req, res) => {
  const body = req.body ?? {};

  const num1 = body.num1;
  const num2 = body.num2;

  if (!Number.isInteger(num2) || num2 <= 0) {
    return res.status(400).json({
      message: 'num2 debe ser un número entero positivo (grado de la raíz).',
    });
  }

  if (num1 < 0 && num2 % 2 === 0) {
    return res.status(400).json({
      message: `No se puede calcular raíz ${num2}-ésima de un número negativo.`,
    });
  }

  const result = Math.sign(num1) * Math.pow(Math.abs(num1), 1 / num2);
  console.log(`Nodo fue utilizado. Resultado ${result}`)
  return res.json(result);

});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
});

app.listen(port, () => {

});
