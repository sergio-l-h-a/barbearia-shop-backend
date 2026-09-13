CREATE TABLE "agendamentos" (
	"id" serial PRIMARY KEY NOT NULL,
	"cliente_id" integer NOT NULL,
	"barbeiro_id" integer NOT NULL,
	"servico_id" integer NOT NULL,
	"data" date NOT NULL,
	"horario" time NOT NULL,
	"status" varchar(20) DEFAULT 'pendente',
	"observacoes" text,
	"barbearia_id" integer NOT NULL,
	"criado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "barbeiros" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(120) NOT NULL,
	"especialidade" varchar(120),
	"nota_media" numeric(3, 2) DEFAULT '0.00',
	"faturamento_total" numeric(10, 2) DEFAULT '0.00',
	"atendimentos" integer DEFAULT 0,
	"ativo" boolean DEFAULT true,
	"barbearia_id" integer NOT NULL,
	"criado_em" timestamp DEFAULT now(),
	"atualizado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(120) NOT NULL,
	"telefone" varchar(20),
	"email" varchar(150),
	"visitas" integer DEFAULT 0,
	"gasto_total" numeric(10, 2) DEFAULT '0.00',
	"barbeiro_favorito_id" integer,
	"observacoes" text,
	"ultima_visita" date,
	"barbearia_id" integer NOT NULL,
	"criado_em" timestamp DEFAULT now(),
	"atualizado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "financeiro" (
	"id" serial PRIMARY KEY NOT NULL,
	"agendamento_id" integer,
	"tipo" varchar(20) NOT NULL,
	"categoria" varchar(50) NOT NULL,
	"valor" numeric(10, 2) NOT NULL,
	"data" date NOT NULL,
	"barbearia_id" integer NOT NULL,
	"criado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "servicos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(120) NOT NULL,
	"categoria" varchar(80),
	"preco" numeric(10, 2) NOT NULL,
	"duracao_minutos" integer NOT NULL,
	"ativo" boolean DEFAULT true,
	"barbearia_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(120) NOT NULL,
	"email" varchar(150) NOT NULL,
	"senha_hash" varchar(255) NOT NULL,
	"role" varchar(30) DEFAULT 'usuario',
	"barbearia_id" integer NOT NULL,
	"criado_em" timestamp DEFAULT now()
);
