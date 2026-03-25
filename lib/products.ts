export type ProductCategory = 'Curtains' | 'Blinds' | 'Hardware' | 'Fabrics';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  sku: string;
  basePrice: number;
  unit: string;
  description: string;
  status: 'Active' | 'Discontinued' | 'Draft';
  attributes?: Record<string, any>;
  image?: string;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Classic Roller Blind",
    category: "Blinds",
    sku: "BL-RL-001",
    basePrice: 120.00,
    unit: "sqm",
    description: "High-quality roller blind with durable fabric options.",
    status: "Active",
    attributes: {
      mechanism: "Chain Drive",
      material: "Polyester",
    }
  },
  {
    id: "p2",
    name: "S-Fold Sheer Curtain",
    category: "Curtains",
    sku: "CU-SH-002",
    basePrice: 85.00,
    unit: "m",
    description: "Elegant S-fold sheers for a modern look.",
    status: "Active",
    attributes: {
      fabric: "Linen Look",
      fullness: "2.5x",
    }
  },
  {
    id: "p3",
    name: "Aluminum Bottom Bar",
    category: "Hardware",
    sku: "HD-BAR-003",
    basePrice: 15.50,
    unit: "m",
    description: "Sleek aluminum bottom bar for roller blinds.",
    status: "Active",
    attributes: {
      finish: "Anodized Silver",
      weight: "Heavy",
    }
  },
  {
    id: "p4",
    name: "Dawn Blockout Fabric",
    category: "Fabrics",
    sku: "FB-DW-004",
    basePrice: 45.00,
    unit: "m",
    description: "Premium blockout fabric with thermal properties.",
    status: "Active",
    attributes: {
      width: "3000mm",
      pattern: "Plain",
    }
  },
  {
    id: "p5",
    name: "Timber Venetian 50mm",
    category: "Blinds",
    sku: "BL-VN-005",
    basePrice: 180.00,
    unit: "sqm",
    description: "Real wood venetian blinds for a classic touch.",
    status: "Active",
    attributes: {
      slatSize: "50mm",
      woodType: "Basswood",
    }
  }
];

export const getProducts = () => mockProducts;

export const getProduct = (id: string) => mockProducts.find(p => p.id === id);
