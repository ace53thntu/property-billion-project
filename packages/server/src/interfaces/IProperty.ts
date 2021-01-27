export interface IProperty {
  title: string;
  description?: string;
  area: number;
  price: number;
  status: string;
  feeElectric: number;
  feeWater: number;
  feeOther?: string;
  expiredAt?: string;
  address: string;
  long?: string;
  lat?: string;
  slug?: string;
  wardId: number;
  userId: number;
  propertyAudienceId: number;
  propertyTypeId: number;
}
