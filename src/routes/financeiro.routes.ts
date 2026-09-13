import { Router } from "express";
import { db } from "../db";
import { financeiro } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Listar todas as transações
router.get("/", async (_req, res) => {
  const result = await db.select().from(financeiro);
  res.json(result);
});

// Buscar transação por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db
    .select()
    .from(financeiro)
    .where(eq(financeiro.id, Number(id)));

  res.json(result[0] ?? {});
});

// Criar transação
router.post("/", async (req, res) => {
  const {
    agendamentoId,
    tipo,
    categoria,
    valor,
    data,
    barbeariaId
  } = req.body;

  await db.insert(financeiro).values({
    agendamentoId,
    tipo,
    categoria,
    valor,
    data,
    barbeariaId
  });

  res.json({ message: "Transação registrada com sucesso" });
});

// Atualizar transação
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    tipo,
    categoria,
    valor,
    data
  } = req.body;

  await db
    .update(financeiro)
    .set({
      tipo,
      categoria,
      valor,
      data
    })
    .where(eq(financeiro.id, Number(id)));

  res.json({ message: "Transação atualizada com sucesso" });
});

// Deletar transação
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await db.delete(financeiro).where(eq(financeiro.id, Number(id)));

  res.json({ message: "Transação removida com sucesso" });
});

export default router;
