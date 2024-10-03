/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operações relacionadas a autenticação
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *                 example: joao.silva@example.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *               fone:
 *                 type: string
 *                 description: Telefone do usuário
 *                 example: '+5511999999999'
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Papéis do usuário
 *                 example: ['admin', 'user']
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuário criado com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: '123456'
 *                     name:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: joao.silva@example.com
 *       400:
 *         description: Falha ao criar o usuário ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Falha ao criar o usuário
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ['O nome deve conter pelo menos 3 caracteres', 'E-mail inválido']
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: O e-mail do usuário.
 *                 example: usuario@exemplo.com
 *               password:
 *                 type: string
 *                 description: A senha do usuário.
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário autenticado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token JWT para autenticação.
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: usuario@exemplo.com
 *                         name:
 *                           type: string
 *                           example: Nome do Usuário
 *                         roles:
 *                           type: array
 *                           items:
 *                             type: string
 *       401:
 *         description: Credenciais inválidas, autenticação falhou.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Acesso inválido!
 */

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Gera um novo token JWT para o usuário autenticado.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Token gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: O novo token JWT.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           format: email
 *                           description: O e-mail do usuário.
 *                           example: usuario@exemplo.com
 *                         name:
 *                           type: string
 *                           description: Nome do usuário.
 *                           example: Nome do Usuário
 *                         roles:
 *                           type: array
 *                           items:
 *                             type: string
 *                           description: Lista de papéis do usuário.
 *                           example: ["admin", "user"]
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
 */

/**
 * @swagger
 * /request-password-reset:
 *   post:
 *     summary: Solicita a redefinição de senha para um usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: O e-mail do usuário para o qual a redefinição de senha será solicitada.
 *                 example: usuario@exemplo.com
 *     responses:
 *       200:
 *         description: E-mail de recuperação de senha enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "E-mail de recuperação de senha enviado"
 *       400:
 *         description: Usuário não encontrado com o e-mail fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
 *       500:
 *         description: Erro interno do servidor ao tentar processar a solicitação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Houve falha na requisição"
 *                 error:
 *                   type: string
 *                   example: "Detalhes do erro"
 */

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Redefine a senha do usuário utilizando um token de recuperação.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperação de senha.
 *                 example: "abc123xyz456"
 *               newPassword:
 *                 type: string
 *                 description: A nova senha do usuário.
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Senha redefinida com sucesso"
 *       400:
 *         description: Token inválido/expirado ou falha na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Token inválido ou expirado"
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: "newPassword"
 *                       message:
 *                         type: string
 *                         example: "A senha deve conter pelo menos 6 caracteres"
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Houve falha na requisição"
 *                     error:
 *                       type: string
 *                       example: "Detalhes do erro"
 */
