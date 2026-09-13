import { pgTable, serial, varchar, integer, boolean, numeric, text, date, time, timestamp } from "drizzle-orm/pg-core";


export const barbearias = pgTable("barbearias", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 150 }).notNull(),
  endereco: varchar("endereco", { length: 255 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  criadoEm: timestamp("criado_em").defaultNow(),
  atualizadoEm: timestamp("atualizado_em").defaultNow()
});


export const barbeiros = pgTable("barbeiros", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 120 }).notNull(),
  especialidade: varchar("especialidade", { length: 120 }),
  notaMedia: numeric("nota_media", { precision: 3, scale: 2 }).default("0.00"),
  faturamentoTotal: numeric("faturamento_total", { precision: 10, scale: 2 }).default("0.00"),
  atendimentos: integer("atendimentos").default(0),
  ativo: boolean("ativo").default(true),
  barbeariaId: integer("barbearia_id").notNull(),
  criadoEm: timestamp("criado_em").defaultNow(),
  atualizadoEm: timestamp("atualizado_em").defaultNow()
});

export const clientes = pgTable("clientes", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 120 }).notNull(),
  telefone: varchar("telefone", { length: 20 }),
  email: varchar("email", { length: 150 }),
  visitas: integer("visitas").default(0),
  gastoTotal: numeric("gasto_total", { precision: 10, scale: 2 }).default("0.00"),
  barbeiroFavoritoId: integer("barbeiro_favorito_id"),
  observacoes: text("observacoes"),
  ultimaVisita: date("ultima_visita"),
  barbeariaId: integer("barbearia_id").notNull(),
  criadoEm: timestamp("criado_em").defaultNow(),
  atualizadoEm: timestamp("atualizado_em").defaultNow()
});

export const agendamentos = pgTable("agendamentos", {
  id: serial("id").primaryKey(),
  clienteId: integer("cliente_id").notNull(),
  barbeiroId: integer("barbeiro_id").notNull(),
  servicoId: integer("servico_id").notNull(),
  data: date("data").notNull(),
  horario: time("horario").notNull(),
  status: varchar("status", { length: 20 }).default("pendente"),
  observacoes: text("observacoes"),
  barbeariaId: integer("barbearia_id").notNull(),
  criadoEm: timestamp("criado_em").defaultNow()
});

export const servicos = pgTable("servicos", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 120 }).notNull(),
  categoria: varchar("categoria", { length: 80 }),
  preco: numeric("preco", { precision: 10, scale: 2 }).notNull(),
  duracaoMinutos: integer("duracao_minutos").notNull(),
  ativo: boolean("ativo").default(true),
  barbeariaId: integer("barbearia_id").notNull()
});


export const financeiro = pgTable("financeiro", {
  id: serial("id").primaryKey(),
  agendamentoId: integer("agendamento_id"),
  tipo: varchar("tipo", { length: 20 }).notNull(), // ex: 'receita' ou 'despesa'
  categoria: varchar("categoria", { length: 50 }).notNull(),
  valor: numeric("valor", { precision: 10, scale: 2 }).notNull(),
  data: date("data").notNull(),
  barbeariaId: integer("barbearia_id").notNull(),
  criadoEm: timestamp("criado_em").defaultNow()
});


export const usuarios = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 120 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  senhaHash: varchar("senha_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 30 }).default("usuario"),
  barbeariaId: integer("barbearia_id").notNull(),
  criadoEm: timestamp("criado_em").defaultNow()
});