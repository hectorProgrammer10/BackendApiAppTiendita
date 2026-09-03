export interface HistoryItem {
  role: "user" | "model";
  text: string;
}

export interface ProductStat {
  name: string;
  quantitySold: number;
  unit: string;
  totalAmount: number;
  transactionCount: number;
}

export interface TargetProductMetrics {
  name: string;
  totalUnits: number;
  unit: string;
  totalMoney: number;
  avgPrice: number;
  transactionCount: number;
}

export interface SalesMetricsContext {
  totalRevenue: number;
  totalSalesCount: number;
  totalContado: number;
  totalPendiente: number;
  averageTicket: number;
  topProducts: ProductStat[];
  targetProductMetrics?: TargetProductMetrics | null;
}

export interface ChatRequest {
  message: string;
  workspaceId: string;
  history?: HistoryItem[];
  salesContext?: SalesMetricsContext | null;
}

export interface NewInsightPayload {
  title: string;
  content: string;
  type: "alert" | "opportunity" | "summary";
}

export interface ChatResponse {
  reply: string;
  dataMissing?: string | null;
  isApproximate: boolean;
  suggestedActions?: string[];
  newInsight?: NewInsightPayload | null;
}
