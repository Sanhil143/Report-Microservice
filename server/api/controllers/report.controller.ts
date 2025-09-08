import { Request, Response } from "express";
import reportService from "../services/report.service";

// Create report
export async function createReport(req: Request, res: Response) {
  try {
    const { targetType, targetId, reason, details } = req.body;
    const reporterId = (req as any).user?.id; // assume auth middleware sets req.user

    if (!reporterId) return res.status(401).json({ error: "unauthorized" });
    if (!targetType || !targetId || !reason) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const report = await reportService.createReport({
      reporterId,
      targetType,
      targetId,
      reason,
      details
    });

    res.status(201).json({ reportId: report.id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// List reports
export async function listReports(req: Request, res: Response) {
  try {
    const status = req.query.status as string | undefined;
    const reports = await reportService.listReports(status);
    res.json({ reports });
  } catch (err: any) {
    res.status(500).json({ error: "server error" });
  }
}

// Action report
export async function actionReport(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { action, notes } = req.body;
    const actedBy = (req as any).user?.id;

    if (!actedBy) return res.status(401).json({ error: "unauthorized" });
    if (!action || !["close", "ban", "warn"].includes(action)) {
      return res.status(400).json({ error: "Invalid action" });
    }

    const updated = await reportService.actionReport(id, action, actedBy, notes);
    res.json({ report: updated });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
