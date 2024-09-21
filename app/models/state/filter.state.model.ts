export interface FilterStateModel {
  providers: Array<string>;
  price?: {
    min: number;
    max: number;
  }
}