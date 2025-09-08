import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // stub: in real setup, decode JWT and attach req.user
  const userId = req.header("x-user-id");
  if (!userId) return res.status(401).json({ error: "unauthorized" });
  (req as any).user = { id: userId, role: "user" };
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // stub: check role
  const role = (req as any).user?.role;
  if (role !== "admin") return res.status(403).json({ error: "forbidden" });
  next();
}
