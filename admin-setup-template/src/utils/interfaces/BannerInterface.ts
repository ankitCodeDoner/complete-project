export interface Banner {
  id: number;
  title: string;
  description: string;
  redirectURL: string | null;
  orderNumber: number | null;
  position: boolean;
  bannerTypeId: number;
  type: {
    id: number;
    name: string;
  };
  document: {
    id: number;
    name: string | null;
    url: string;
    remark: string | null;
    documentType: string | null;
  };
}
