-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "contato" TEXT NOT NULL,
    "mensagem" TEXT,
    "status" TEXT NOT NULL DEFAULT 'novo',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clienteId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dataEnvio" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    CONSTRAINT "FollowUp_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_contato_key" ON "Cliente"("contato");
