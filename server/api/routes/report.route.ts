import { Router } from "express";
import { createReport, listReports, actionReport } from "../controllers/report.controller";
import { requireAuth, requireAdmin } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /report/createReport:
 *   post:
 *     summary: Create a report
 *     security:
 *       - bearerAuth: []
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: Report created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/createReport", requireAuth, createReport);

/**
 * @openapi
 * /report/all:
 *   get:
 *     summary: List all reports
 *     security:
 *       - bearerAuth: []
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: List of reports
 *       401:
 *         description: Unauthorized
 */
router.get("/all", requireAdmin, listReports);

/**
 * @openapi
 * /report/{id}/action:
 *   post:
 *     summary: Take action on a report
 *     security:
 *       - bearerAuth: []
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: Action taken successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/:id/action", requireAdmin, actionReport);

export default router;
