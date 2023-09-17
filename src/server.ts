import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { type } from "os";
import { z } from "zod";

//criando uma instância do fastify
const app = fastify();

//iniciando o banco de dados com prisma
const prisma = new PrismaClient();

//criando minhas rotas
//retorna todos os usuários
app.get("/users", async (request, reply) => {
  const users = await prisma.user.findMany();
  return users;
});
//retorna um usuário específico por id
app.get("/users/:id", async (request, reply) => {
  return "teste";
});

//cria um novo usuário
app.post("/users", async (request, reply) => {
  //validação dos dados com zod
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const { name, email } = createUserSchema.parse(request.body);
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  //return user;
  return reply.status(201).send(user);
});

//iniciando o servidor
app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.port) : 3000,
  })
  .then(() => {
    console.log("Servidor iniciado com sucesso!");
  });
