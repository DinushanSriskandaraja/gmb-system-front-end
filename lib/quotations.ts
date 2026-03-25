export interface Measurement {
  label: string;
  width: number;
  height: number;
  drop?: number;
  unit: 'mm' | 'cm' | 'in';
}

export interface Fabric {
  name: string;
  color: string;
  supplier?: string;
  code?: string;
}

export interface QuotationItem {
  id: string;
  name: string;
  location: string;
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
  measurements?: Measurement;
  fabric?: Fabric;
  options?: Record<string, string>;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  expiryDate: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  installationFee: number;
  discount?: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  notes?: string;
  terms?: string;
}

export const mockQuotations: Record<string, Quotation> = {
  "Q-0042": {
    id: "Q-0042",
    quoteNumber: "Q-0042",
    customerId: "3",
    customerName: "Charlie Davis",
    customerAddress: "88 Forest Rd, Hurstville NSW",
    customerEmail: "charlie@email.com",
    customerPhone: "+61 444 555 666",
    date: "Oct 15, 2026",
    expiryDate: "Nov 15, 2026",
    items: [
      {
        id: "i1",
        name: "Custom Roller Blind",
        location: "Master Bedroom - Window 1",
        description: "Premium blockout roller blind with aluminum bottom bar.",
        qty: 1,
        unitPrice: 350.00,
        total: 350.00,
        measurements: {
          label: "Window 1",
          width: 1800,
          height: 2100,
          unit: 'mm'
        },
        fabric: {
          name: "Dawn Blockout",
          color: "Slate Grey",
          code: "DB-SG-01"
        },
        options: {
          "Control": "Right Side Chain",
          "Bracket Color": "White",
          "Roll Type": "Standard Roll"
        }
      },
      {
        id: "i2",
        name: "Sheer Curtain",
        location: "Living Room - Large Window",
        description: "S-Fold sheer curtain with wall mount track.",
        qty: 1,
        unitPrice: 520.00,
        total: 520.00,
        measurements: {
          label: "Large Window",
          width: 3200,
          height: 2700,
          drop: 2680,
          unit: 'mm'
        },
        fabric: {
          name: "Linara Sheer",
          color: "Pearl",
          code: "LS-PL-05"
        },
        options: {
          "Track Type": "S-Fold Wall Mount",
          "Track Color": "Silver",
          "Hem": "Weighted"
        }
      }
    ],
    subtotal: 870.00,
    tax: 87.00,
    installationFee: 150.00,
    total: 1107.00,
    status: 'Sent',
    notes: "Please confirm measurements before proceeding with order production.",
    terms: "Quotation valid for 30 days. 50% deposit required to commence manufacturing."
  }
};

export const getQuotation = (id: string): Quotation | undefined => {
  return mockQuotations[id] || mockQuotations["Q-0042"]; // Fallback for demo
};
