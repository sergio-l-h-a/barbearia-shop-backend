import { Router } from "express";
import { db } from "../db";
import { servicos } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Listar serviços
router.get("/", async (_req, res) => {
  const result = await db.select().from(servicos);
  res.json(result);
});

// Buscar serviço por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db
    .select()
    .from(servicos)
    .where(eq(servicos.id, Number(id)));

  res.json(result[0] ?? {});
});

// Criar serviço
router.post("/", async (req, res) => {
  const {
    nome,
    categoria,
    preco,
    duracaoMinutos,
    ativo,
    barbeariaId
  } = req.body;

  await db.insert(servicos).values({
    nome,
    categoria,
    preco,
    duracaoMinutos,
    ativo,
    barbeariaId
  });

  res.json({ message: "Serviço cadastrado com sucesso" });
});

// Atualizar serviço
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    categoria,
    preco,
    duracaoMinutos,
    ativo
  } = req.body;

  await db
    .update(servicos)
    .set({
      nome,
      categoria,
      preco,
      duracaoMinutos,
      ativo
    })
    .where(eq(servicos.id, Number(id)));

  res.json({ message: "Serviço atualizado com sucesso" });
});

// Deletar serviço
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await db.delete(servicos).where(eq(servicos.id, Number(id)));

  res.json({ message: "Serviço removido com sucesso" });
});

export default router;
