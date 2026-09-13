import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import barbeariasRoutes from "./routes/barbearias.routes";
import barbeirosRoutes from "./routes/barbeiros.routes";
import clientesRoutes from "./routes/clientes.routes";
import servicosRoutes from "./routes/servicos.routes";
import agendamentosRoutes from "./routes/agendamentos.routes";
import financeiroRoutes from "./routes/financeiro.routes";
import usuariosRoutes from "./routes/usuarios.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/barbearias", barbeariasRoutes);
app.use("/barbeiros", barbeirosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/servicos", servicosRoutes);
app.use("/agendamentos", agendamentosRoutes);
app.use("/financeiro", financeiroRoutes);
app.use("/usuarios", usuariosRoutes);

// Porta
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
