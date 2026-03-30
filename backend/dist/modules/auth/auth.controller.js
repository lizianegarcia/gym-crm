"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const authService = new auth_service_1.AuthService();
            const result = await authService.login({ email, senha });
            return res.json(result);
        }
        catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }
    async refresh(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({
                    error: "refreshToken é obrigatório",
                });
            }
            const authService = new auth_service_1.AuthService();
            const result = await authService.refresh(refreshToken);
            return res.json(result);
        }
        catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }
    async logout(req, res) {
        try {
            const userId = req.user.id;
            const authService = new auth_service_1.AuthService();
            const result = await authService.logout(userId);
            return res.json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.AuthController = AuthController;
