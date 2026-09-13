import { Router } from "express";
import { db } from "../db";
import { usuarios } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// Listar usuários
router.get("/", async (_req, res) => {
  const result = await db.select().from(usuarios);
  res.json(result);
});

// Criar usuário
router.post("/", async (req, res) => {
  const { nome, email, senha, role, barbeariaId } = req.body;

  const senhaHash = await bcrypt.hash(senha, 10);

  await db.insert(usuarios).values({
    nome,
    email,
    senhaHash,
    role,
    barbeariaId
  });

  res.json({ message: "Usuário criado com sucesso" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const result = await db
    .select()
    .from(usuarios)
    .where(eq(usuarios.email, email));

  const user = result[0];

  if (!user) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  const senhaValida = await bcrypt.compare(senha, user.senhaHash);

  if (!senhaValida) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      barbeariaId: user.barbeariaId
    },
    process.env.JWT_SECRET || "segredo",
    { expiresIn: "1d" }
  );

  res.json({ token });
});

// Atualizar usuário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, role } = req.body;

  await db
    .update(usuarios)
    .set({
      nome,
      email,
      role
    })
    .where(eq(usuarios.id, Number(id)));

  res.json({ message: "Usuário atualizado com sucesso" });
});

// Deletar usuário
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await db.delete(usuarios).where(eq(usuarios.id, Number(id)));

  res.json({ message: "Usuário removido com sucesso" });
});

export default router;
