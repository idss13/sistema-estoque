const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - CDE",
      version: "1.0.0",
      description:
        "Esta API foi desenvolvida para permitir o controle de estoque",
    },
    tags: [
      {
        name: "Auth",
        description: "Operações relacionadas a autenticação",
      },
      {
        name: "User",
        description: "Operações relacionadas a manipulação de usuários",
      },
      {
        name: "Category",
        description: "Operações relacionadas a manipulação de categorias",
      },
    ],
    paths: {
      "api/auth/register": {
        post: {
          summary: "Registra um novo usuário",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome do usuário",
                      example: "João Silva",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      description: "E-mail do usuário",
                      example: "joao.silva@example.com",
                    },
                    password: {
                      type: "string",
                      description: "Senha do usuário",
                      example: "senha123",
                    },
                    fone: {
                      type: "string",
                      description: "Telefone do usuário",
                      example: "+5511999999999",
                    },
                    roles: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      description: "Papéis do usuário",
                      example: ["admin", "user"],
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Usuário criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Usuário criado com sucesso",
                      },
                      data: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "123456",
                          },
                          name: {
                            type: "string",
                            example: "João Silva",
                          },
                          email: {
                            type: "string",
                            example: "joao.silva@example.com",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Falha ao criar o usuário ou dados inválidos",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Falha ao criar o usuário",
                      },
                      errors: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        example: [
                          "O nome deve conter pelo menos 3 caracteres",
                          "E-mail inválido",
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "api/auth/login": {
        post: {
          summary: "Autentica um usuário e retorna um token JWT.",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      description: "O e-mail do usuário.",
                      example: "usuario@exemplo.com",
                    },
                    password: {
                      type: "string",
                      description: "A senha do usuário.",
                      example: "senha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Usuário autenticado com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      data: {
                        type: "object",
                        properties: {
                          token: {
                            type: "string",
                            description: "Token JWT para autenticação.",
                          },
                          user: {
                            type: "object",
                            properties: {
                              email: {
                                type: "string",
                                example: "usuario@exemplo.com",
                              },
                              name: {
                                type: "string",
                                example: "Nome do Usuário",
                              },
                              roles: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Credenciais inválidas, autenticação falhou.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Acesso inválido!",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "api/auth/refresh-token": {
        post: {
          summary: "Gera um novo token JWT para o usuário autenticado.",
          tags: ["Auth"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            201: {
              description: "Token gerado com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      data: {
                        type: "object",
                        properties: {
                          token: {
                            type: "string",
                            description: "O novo token JWT.",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          },
                          user: {
                            type: "object",
                            properties: {
                              email: {
                                type: "string",
                                format: "email",
                                description: "O e-mail do usuário.",
                                example: "usuario@exemplo.com",
                              },
                              name: {
                                type: "string",
                                description: "Nome do usuário.",
                                example: "Nome do Usuário",
                              },
                              roles: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                                description: "Lista de papéis do usuário.",
                                example: ["admin", "user"],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Usuário não encontrado.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Usuário não encontrado",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "api/auth/request-password-reset": {
        post: {
          summary: "Solicita a redefinição de senha para um usuário.",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      description:
                        "O e-mail do usuário para o qual a redefinição de senha será solicitada.",
                      example: "usuario@exemplo.com",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description:
                "E-mail de recuperação de senha enviado com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "E-mail de recuperação de senha enviado",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Usuário não encontrado com o e-mail fornecido.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Usuário não encontrado",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description:
                "Erro interno do servidor ao tentar processar a solicitação.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                        example: "Detalhes do erro",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "api/auth//reset-password": {
        post: {
          summary:
            "Redefine a senha do usuário utilizando um token de recuperação.",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "Token de recuperação de senha.",
                      example: "abc123xyz456",
                    },
                    newPassword: {
                      type: "string",
                      description: "A nova senha do usuário.",
                      example: "novaSenha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Senha redefinida com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Senha redefinida com sucesso",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Token inválido/expirado ou falha na requisição.",
              content: {
                "application/json": {
                  schema: {
                    oneOf: [
                      {
                        type: "object",
                        properties: {
                          success: {
                            type: "boolean",
                            example: false,
                          },
                          message: {
                            type: "string",
                            example: "Token inválido ou expirado",
                          },
                        },
                      },
                      {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            field: {
                              type: "string",
                              example: "newPassword",
                            },
                            message: {
                              type: "string",
                              example:
                                "A senha deve conter pelo menos 6 caracteres",
                            },
                          },
                        },
                      },
                      {
                        type: "object",
                        properties: {
                          success: {
                            type: "boolean",
                            example: false,
                          },
                          message: {
                            type: "string",
                            example: "Houve falha na requisição",
                          },
                          error: {
                            type: "string",
                            example: "Detalhes do erro",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "api/user": {
        get: {
          summary: "Retorna uma lista de usuários",
          tags: ["User"],
          parameters: [
            {
              name: "page",
              in: "query",
              required: false,
              schema: {
                type: "integer",
              },
              description: "Número da página para paginação",
            },
            {
              name: "limit",
              in: "query",
              required: false,
              schema: {
                type: "integer",
              },
              description: "Número de usuários por página",
            },
            {
              name: "name",
              in: "query",
              required: false,
              schema: {
                type: "string",
              },
              description: "Nome do usuário para filtro",
            },
            {
              name: "email",
              in: "query",
              required: false,
              schema: {
                type: "string",
                format: "email",
              },
              description: "E-mail do usuário para filtro",
            },
          ],
          responses: {
            200: {
              description: "Usuário(s) retornado(s) com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Usuário(s) retornado(s) com sucesso",
                      },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Houve falha na requisição",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "api/user/{id}": {
        get: {
          summary: "Retorna um usuário pelo ID",
          tags: ["User"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "ID do usuário",
            },
          ],
          responses: {
            200: {
              description: "Usuário retornado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Usuário retornado com sucesso",
                      },
                      data: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Houve falha na requisição",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          summary: "Atualiza um usuário pelo ID",
          tags: ["User"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "ID do usuário",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome do usuário",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      description: "E-mail do usuário",
                    },
                    fone: {
                      type: "string",
                      description: "Telefone do usuário",
                    },
                    roles: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      description: "Papéis do usuário",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário atualizado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Usuário atualizado com sucesso",
                      },
                      data: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Houve falha na requisição",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: "Remove um usuário pelo ID",
          tags: ["User"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "ID do usuário",
            },
          ],
          responses: {
            200: {
              description: "Usuário removido com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Usuário removido com sucesso",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Houve falha na requisição",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "api/category": {
        post: {
          summary: "Cria uma nova categoria",
          tags: ["Category"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome da categoria",
                    },
                    description: {
                      type: "string",
                      description: "Descrição da categoria",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Categoria criada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Categoria criada com sucesso",
                      },
                      data: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Houve falha na requisição",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        get: {
          summary: "Retorna uma lista de categorias",
          tags: ["Category"],
          parameters: [
            {
              name: "page",
              in: "query",
              required: false,
              schema: {
                type: "integer",
              },
              description: "Número da página para paginação",
            },
            {
              name: "limit",
              in: "query",
              required: false,
              schema: {
                type: "integer",
              },
              description: "Número de categorias por página",
            },
          ],
          responses: {
            200: {
              description: "Categoria(s) retornada(s) com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Categoria(s) retornada(s) com sucesso",
                      },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Houve falha na requisição",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "api/category/update/{id}": {
        put: {
          summary: "Atualiza uma categoria pelo ID",
          tags: ["Category"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "ID da categoria",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome da categoria",
                    },
                    description: {
                      type: "string",
                      description: "Descrição da categoria",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Categoria atualizada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Categoria atualizada com sucesso",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Houve falha na requisição",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "api/category/{id}": {
        delete: {
          summary: "Remove uma categoria pelo ID",
          tags: ["Category"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "ID da categoria",
            },
          ],
          responses: {
            200: {
              description: "Categoria removida com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Categoria removida com sucesso",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Houve falha na requisição",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Houve falha na requisição",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    // components: {
    //   schemas: {
    //     Board: {
    //       type: "object",
    //       properties: {
    //         name: {
    //           type: "string",
    //           required: true,
    //         },
    //         username: {
    //           type: "string",
    //         },
    //         salt: {
    //           type: "string",
    //         },
    //         hash: {
    //           type: "string",
    //         },
    //         deleted_in: {
    //           type: "string",
    //         },
    //         status: {
    //           type: "number",
    //         },
    //         created_in: {
    //           type: "string",
    //         },
    //         updated_in: {
    //           type: "string",
    //         },
    //         type: {
    //           type: "number",
    //         },
    //       },
    //     },
    //   },
    // },
  },
  apis: ["*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpecs;
