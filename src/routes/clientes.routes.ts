import { Router } from "express";
import { db } from "../db";
import { clientes } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Listar clientes
router.get("/", async (_req, res) => {
  const result = await db.select().from(clientes);
  res.json(result);
});

// Buscar cliente por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db
    .select()
    .from(clientes)
    .where(eq(clientes.id, Number(id)));

  res.json(result[0] ?? {});
});

// Criar cliente
router.post("/", async (req, res) => {
  const {
    nome,
    telefone,
    email,
    barbeiroFavoritoId,
    observacoes,
    barbeariaId
  } = req.body;

  await db.insert(clientes).values({
    nome,
    telefone,
    email,
    barbeiroFavoritoId,
    observacoes,
    barbeariaId,
    ultimaVisita: new Date().toISOString().split("T")[0] // Define a data da última visita como a data atual
  });

  res.json({ message: "Cliente cadastrado com sucesso" });
});

// Atualizar cliente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    telefone,
    email,
    barbeiroFavoritoId,
    observacoes
  } = req.body;

  await db
    .update(clientes)
    .set({
      nome,
      telefone,
      email,
      barbeiroFavoritoId,
      observacoes,
      atualizadoEm: new Date()
    })
    .where(eq(clientes.id, Number(id)));

  res.json({ message: "Cliente atualizado com sucesso" });
});

// Deletar cliente
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await db.delete(clientes).where(eq(clientes.id, Number(id)));

  res.json({ message: "Cliente removido com sucesso" });
});

export default router;
