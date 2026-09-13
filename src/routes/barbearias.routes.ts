import { Request, Response } from "express";
import { Router } from "express";
import { db } from "../db";
import { barbearias } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Listar todas as barbearias
router.get("/", async (_req: Request, res: Response) => {
  const result = await db.select().from(barbearias);
  res.json(result);
});

// Buscar barbearia por ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await db
    .select()
    .from(barbearias)
    .where(eq(barbearias.id, Number(id)));

  res.json(result[0] ?? {});
});

// Criar barbearia
router.post("/", async (req: Request, res: Response) => {
  const { nome, endereco, telefone, email } = req.body;

  await db.insert(barbearias).values({
    nome,
    endereco,
    telefone,
    email
  });

  res.json({ message: "Barbearia cadastrada com sucesso" });
});

// Atualizar barbearia
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, endereco, telefone, email } = req.body;

  await db
    .update(barbearias)
    .set({
      nome,
      endereco,
      telefone,
      email,
      atualizadoEm: new Date()
    })
    .where(eq(barbearias.id, Number(id)));

  res.json({ message: "Barbearia atualizada com sucesso" });
});

// Deletar barbearia
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  await db.delete(barbearias).where(eq(barbearias.id, Number(id)));

  res.json({ message: "Barbearia removida com sucesso" });
});

export default router;
