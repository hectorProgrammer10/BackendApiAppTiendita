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
  quantityPending?: number;
  pendingAmount?: number;
  pendingTransactionCount?: number;
}

export interface TargetProductMetrics {
  name: string;
  totalUnitsSold: number;
  totalMoneySold: number;
  totalUnitsPending: number;
  totalMoneyPending: number;
  unit: string;
  avgPrice: number;
  transactionCount: number;
  pendingTransactionCount: number;
}

export interface SalesMetricsContext {
  totalRevenue: number;
  totalSalesCount: number;
  totalContado: number;
  totalPendiente: number;
  totalPendingSalesCount?: number;
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
