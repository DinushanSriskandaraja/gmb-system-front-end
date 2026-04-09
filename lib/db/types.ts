export type Employee = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  designation: string | null;
  phone: string | null;
  status: 'Active' | 'Inactive';
  last_login: string | null;
  created_at: string;
};

export type Customer = {
  customer_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: 'Lead' | 'Enquired' | 'Quote Sent' | 'order Completed';
  created_at: string;
  updated_at: string;
};

export type Enquiry = {
  id: string;
  customer_id: string;
  enquiry_date: string;
  measurement_date: string | null;
  status: 'Lead' | 'Enquired' | 'Quote Sent' | 'Job Created' | 'In Progress' | 'Completed' | 'Installed';
  is_job: boolean;
  notes: string | null;
  created_at: string;
};

export type CustomerActivity = {
  id: string;
  customer_id: string;
  description: string;
  created_at: string;
};

export type FileRecord = {
  id: string;
  customer_id: string;
  job_id: string | null;
  file_name: string;
  file_type: 'PDF' | 'Image';
  file_category: 'Measurement' | 'Quote' | 'Fabric';
  file_path: string;
  version: number;
  generated_date: string | null;
  created_at: string;
};

export type Category = {
  id: string;
  name: 'Curtains' | 'Blinds' | 'Hardware' | 'Fabrics';
  parent: string | null;
};

export type ProductCatalog = {
  products_catalog_id: string;
  item_name: string;
  category_id: string;
  description: string | null;
  base_price: number;
  unit: 'm' | 'mm' | 'cm' | 'count';
  status: 'Active' | 'Inactive';
  created_at: string;
};

export type Inventory = {
  id: string;
  product_id: string;
  quantity_on_hand: number;
  reorder_level: number;
  location: string | null;
  updated_at: string;
};

export type Supplier = {
  supplier_id: string;
  name: string;
  contact_name: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  status: 'Active' | 'Inactive';
  created_at: string;
};

export type ProductSupplier = {
  products_catalog_id: string;
  supplier_id: string;
};

export type Order = {
  order_id: string;
  supplier_id: string | null;
  products_catalog_id: string;
  job_id: string;
  quantity: number;
  unit: 'm' | 'mm' | 'cm' | 'count';
  status: 'Order Placed' | 'Pending' | 'Completed' | 'Stock Received';
  total_amount: number;
  order_date: string;
  expected_delivery_date: string | null;
  created_at: string;
};

export type Quotation = {
  id: string;
  customer_id: string;
  enquiry_id: string | null;
  total_amount: number;
  discount: number;
  tax: number;
  grand_total: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  valid_until: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type QuotationItem = {
  id: string;
  quotation_id: string;
  products_catalog_id: string | null;
  description: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
};
