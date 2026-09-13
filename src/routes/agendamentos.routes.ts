import { Router } from "express";
import { db } from "../db";
import { agendamentos, clientes, barbeiros } from "../db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";

const router = Router();

// Listar agendamentos
router.get("/", async (_req, res) => {
  const result = await db.select().from(agendamentos);
  res.json(result);
});

// Buscar agendamento por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db
    .select()
    .from(agendamentos)
    .where(eq(agendamentos.id, Number(id)));

  res.json(result[0] ?? {});
});

// Criar agendamento
router.post("/", async (req, res) => {
  const {
    clienteId,
    barbeiroId,
    servicoId,
    data,
    horario,
    status,
    observacoes,
    barbeariaId
  } = req.body;

  await db.insert(agendamentos).values({
    clienteId,
    barbeiroId,
    servicoId,
    data,
    horario,
    status,
    observacoes,
    barbeariaId
  });

  // Atualizar métricas do cliente
  await db
    .update(clientes)
    .set({
      visitas: sql`${clientes.visitas} + 1`,
      ultimaVisita: data,
      atualizadoEm: new Date()
    })
    .where(eq(clientes.id, clienteId));

  // Atualizar métricas do barbeiro
  await db
    .update(barbeiros)
    .set({
      atendimentos: sql`${barbeiros.atendimentos} + 1`,
      atualizadoEm: new Date()
    })
    .where(eq(barbeiros.id, barbeiroId));

  res.json({ message: "Agendamento criado com sucesso" });
});

// Atualizar agendamento
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, observacoes, data, horario } = req.body;

  await db
    .update(agendamentos)
    .set({
      status,
      observacoes,
      data,
      horario
    })
    .where(eq(agendamentos.id, Number(id)));

  res.json({ message: "Agendamento atualizado com sucesso" });
});

// Deletar agendamento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await db.delete(agendamentos).where(eq(agendamentos.id, Number(id)));

  res.json({ message: "Agendamento removido com sucesso" });
});

export default router;
