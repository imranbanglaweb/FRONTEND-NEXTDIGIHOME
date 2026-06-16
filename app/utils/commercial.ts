export type PurchaseType = 'one_time' | 'monthly_subscription' | 'yearly_subscription' | string;

export interface CommercialInfo {
  product_kind?: string | null;
  product_kind_label?: string | null;
  purchase_type?: PurchaseType | null;
  purchase_type_label?: string | null;
  validity_days?: number | string | null;
  validity_label?: string | null;
  access_label?: string | null;
  commercial?: {
    product_kind?: string | null;
    product_kind_label?: string | null;
    purchase_type?: PurchaseType | null;
    purchase_type_label?: string | null;
    validity_days?: number | string | null;
    validity_label?: string | null;
    access_label?: string | null;
  } | null;
}

const purchaseTypeLabels: Record<string, string> = {
  one_time: 'One-time purchase',
  monthly_subscription: 'Monthly subscription',
  yearly_subscription: 'Yearly subscription',
  annual_subscription: 'Yearly subscription',
  yearly: 'Yearly subscription',
  monthly: 'Monthly subscription',
};

const productKindLabels: Record<string, string> = {
  digital_download: 'Digital download',
  physical_product: 'Physical product',
  service: 'Service',
};

const toTitleCase = (value: string): string =>
  value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const getPurchaseType = (item: CommercialInfo | null | undefined): string => {
  return item?.commercial?.purchase_type || item?.purchase_type || 'one_time';
};

export const getPurchaseTypeLabel = (item: CommercialInfo | null | undefined): string => {
  const type = getPurchaseType(item);
  return item?.commercial?.purchase_type_label || item?.purchase_type_label || purchaseTypeLabels[type] || toTitleCase(type);
};

export const getProductKindLabel = (item: CommercialInfo | null | undefined, fallback = 'Digital product'): string => {
  const kind = item?.commercial?.product_kind || item?.product_kind || '';
  return item?.commercial?.product_kind_label || item?.product_kind_label || productKindLabels[kind] || fallback;
};

export const getValidityLabel = (item: CommercialInfo | null | undefined): string | null => {
  return item?.commercial?.validity_label || item?.validity_label || null;
};

export const getAccessLabel = (item: CommercialInfo | null | undefined): string => {
  return item?.commercial?.access_label || item?.access_label || getValidityLabel(item) || getPurchaseTypeLabel(item);
};

export const getValidityDays = (item: CommercialInfo | null | undefined): number | null => {
  const value = item?.commercial?.validity_days ?? item?.validity_days ?? null;
  if (value == null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const isSubscriptionPurchase = (item: CommercialInfo | null | undefined): boolean => {
  return getPurchaseType(item).includes('subscription');
};
