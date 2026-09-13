import { Router } from "express";
import { db } from "../db";
import { barbeiros } from "../db/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

const router = Router();

// Listar barbeiros
router.get("/", async (_req: Request, res: Response) => {
  const result = await db.select().from(barbeiros);
  res.json(result);
});

// Criar barbeiro
router.post("/", async (req, res) => {
  const { nome, especialidade, barbeariaId } = req.body;

  await db.insert(barbeiros).values({
    nome,
    especialidade,
    barbeariaId
  });

  res.json({ message: "Barbeiro cadastrado com sucesso" });
});

// Atualizar barbeiro
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, especialidade, ativo } = req.body;

  await db
    .update(barbeiros)
    .set({
      nome,
      especialidade,
      ativo,
      atualizadoEm: new Date()
    })
    .where(eq(barbeiros.id, Number(id)));

  res.json({ message: "Barbeiro atualizado" });
});

// Deletar barbeiro
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await db.delete(barbeiros).where(eq(barbeiros.id,Number(id)));

  res.json({ message: "Barbeiro removido" });
});

export default router;
