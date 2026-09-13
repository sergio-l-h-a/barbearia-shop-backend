CREATE TABLE "barbearias" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(150) NOT NULL,
	"endereco" varchar(255) NOT NULL,
	"telefone" varchar(20) NOT NULL,
	"email" varchar(150) NOT NULL,
	"criado_em" timestamp DEFAULT now(),
	"atualizado_em" timestamp DEFAULT now()
);
