import {prisma} from "../../configs/db.config";

export class ReportService {
  async createReport(data: {
    reporterId: string;
    targetType: "post" | "user";
    targetId: string;
    reason: string;
    details?: string;
  }) {
    return prisma.report.create({
      data: {
        reporterId: data.reporterId,
        targetType: data.targetType,
        targetId: data.targetId,
        reason: data.reason,
        details: data.details ?? null,
        status: "open"
      }
    });
  }

  async listReports(status?: string) {
    return prisma.report.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" }
    });
  }

  async actionReport(reportId: string, action: "close" | "ban" | "warn", actedBy: string, notes?: string) {
    const status = action === "close" ? "closed" : "actioned";

    const report = await prisma.report.update({
      where: { id: reportId },
      data: {
        status,
        processedAt: new Date(),
      }
    });

    return report;
  }
}

export default new ReportService();
