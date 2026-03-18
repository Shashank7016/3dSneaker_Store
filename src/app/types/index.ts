export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isNew?: boolean;
  url?: string;
  type?: string;
}

export interface MaterialProperties {
  color: string;
  roughness: number;
  metalness: number;
}

export interface MaterialPropertiesDict {
  laces: MaterialProperties;
  mesh: MaterialProperties;
  caps: MaterialProperties;
  inner: MaterialProperties;
  sole: MaterialProperties;
  stripes: MaterialProperties;
  band: MaterialProperties;
  patch: MaterialProperties;
  [key: string]: MaterialProperties;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedMaterials: MaterialPropertiesDict;
  cartItemId: string;
  isCustomized: boolean;
  quantity: number;
}

export type ShoePart = keyof MaterialPropertiesDict; 