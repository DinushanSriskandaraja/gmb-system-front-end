export const initialCustomers = [
  { id: "1", name: "Alice Smith",   initials: "AS", phone: "+61 412 345 678", email: "alice@example.com", address: "123 Ocean Dr, Bondi NSW", enquiry: "Roller Blinds – Living Room", requested: "Oct 10, 2026", measurementDate: "Oct 15, 2026", status: "Lead"       },
  { id: "2", name: "Bob Johnson",   initials: "BJ", phone: "+61 498 765 432", email: "bob@example.com",   address: "45 River St, Parramatta NSW", enquiry: "Venetian Blinds – Whole House",  requested: "Oct 13, 2026", measurementDate: "Pending", status: "Enquired"   },
  { id: "3", name: "Charlie Davis", initials: "CD", phone: "+61 444 555 666", email: "charlie@email.com", address: "88 Forest Rd, Hurstville NSW", enquiry: "Curtains – Master Bedroom",       requested: "Oct 14, 2026", measurementDate: "Oct 18, 2026", status: "Quote Sent" },
];

export const customersDb: Record<string, any> = {
  "1": { id: "1", name: "Alice Smith", initials: "AS", phone: "+61 412 345 678", email: "alice@example.com", address: "123 Ocean Dr, Bondi NSW", status: "Lead", hasJob: false, requested: "Oct 10, 2026" },
  "2": { id: "2", name: "Bob Johnson", initials: "BJ", phone: "+61 498 765 432", email: "bob@example.com", address: "45 River St, Parramatta NSW", status: "Job Created", hasJob: true, requested: "Oct 13, 2026", jobId: "J-002", jobStatus: "Job Created", jobType: "Venetian Blinds", jobLocation: "Whole House" },
  "3": { id: "3", name: "Charlie Davis", initials: "CD", phone: "+61 444 555 666", email: "charlie@email.com", address: "88 Forest Rd, Hurstville NSW", status: "Job Completed", hasJob: true, requested: "Oct 14, 2026", jobId: "J-004", jobStatus: "Job Completed", jobType: "Curtains", jobLocation: "Master Bedroom" },
  "4": { id: "4", name: "Diana Prince", initials: "DP", phone: "+61 400 111 222", email: "diana@example.com", address: "99 Front St, Melbourne VIC", status: "Job Rework", hasJob: true, requested: "Oct 05, 2026", jobId: "J-003", jobStatus: "Job Rework", jobType: "Plantation Shutters", jobLocation: "Front Windows" }
};

export const jobsDb = [
  { id: "J-001", customerId: "1", customer: "Alice Smith",   initials: "AS", type: "Roller Blinds",       location: "Living Room",   status: "Job Created",   date: "Oct 12, 2026" },
  { id: "J-002", customerId: "2", customer: "Bob Johnson",   initials: "BJ", type: "Venetian Blinds",     location: "Whole House",   status: "Job Created",   date: "Oct 15, 2026" },
  { id: "J-003", customerId: "4", customer: "Diana Prince",  initials: "DP", type: "Plantation Shutters", location: "Front Windows", status: "Job Rework",    date: "Oct 09, 2026" },
  { id: "J-004", customerId: "3", customer: "Charlie Davis", initials: "CD", type: "Curtains",            location: "Master Bedroom",status: "Job Completed", date: "Oct 18, 2026" },
];

export const initialSuppliers = [
  { id: "S-001", name: "Alpha Blinds Co", initials: "AB", phone: "+61 411 111 111", email: "sales@alphablinds.com", address: "10 Industrial Way, Sydney", category: "Blinds", status: "Active" },
  { id: "S-002", name: "Beta Fabrics", initials: "BF", phone: "+61 422 222 222", email: "info@betafabrics.com", address: "20 Textile Rd, Melbourne", category: "Curtains", status: "Active" },
  { id: "S-003", name: "Gamma Hardware", initials: "GH", phone: "+61 433 333 333", email: "supply@gammahardware.com", address: "30 Parts Ave, Brisbane", category: "Hardware", status: "Inactive" },
];

export const initialOrders = [
  { id: "PO-001", supplierId: "S-001", supplier: "Alpha Blinds Co", item: "Roller Blind Components", initials: "AB", amount: "$1,250", status: "Order Placed", date: "Oct 20, 2026", expected: "Oct 25, 2026" },
  { id: "PO-002", supplierId: "S-002", supplier: "Beta Fabrics", item: "Linen Curtain Fabric 50m", initials: "BF", amount: "$890", status: "Pending Order", date: "Oct 21, 2026", expected: "Oct 28, 2026" },
  { id: "PO-003", supplierId: "S-001", supplier: "Alpha Blinds Co", item: "Venetian Slats", initials: "AB", amount: "$450", status: "Order Completed", date: "Oct 15, 2026", expected: "Oct 18, 2026" },
  { id: "PO-004", supplierId: "S-003", supplier: "Gamma Hardware", item: "Curtain Tracks & Brackets", initials: "GH", amount: "$320", status: "Stock Received", date: "Oct 10, 2026", expected: "Oct 12, 2026" },
];

export const initialEmployees = [
  { id: "EMP-001", name: "Super Admin", initials: "SA", email: "admin@gmb.com", position: "IT Director", role: "Admin", status: "Active", lastLogin: "Today, 09:00 AM" },
  { id: "EMP-002", name: "John Sales", initials: "JS", email: "john@gmb.com", position: "Senior Outbound Sales", role: "Sales", status: "Active", lastLogin: "Today, 10:15 AM" },
  { id: "EMP-003", name: "Mike Installer", initials: "MI", email: "mike@gmb.com", position: "Field Technician", role: "Installer", status: "On Leave", lastLogin: "Oct 24, 2026" },
  { id: "EMP-004", name: "Sarah Manager", initials: "SM", email: "sarah@gmb.com", position: "Front Desk Coordinator", role: "Receptionist", status: "Active", lastLogin: "Yesterday" },
  { id: "EMP-005", name: "Lisa Finance", initials: "LF", email: "lisa@gmb.com", position: "Senior Bookkeeper", role: "Accountant", status: "Active", lastLogin: "Oct 23, 2026" },
];

export const suppliersDb: Record<string, any> = {
  "S-001": { id: "S-001", name: "Alpha Blinds Co", initials: "AB", phone: "+61 411 111 111", email: "sales@alphablinds.com", address: "10 Industrial Way, Sydney", category: "Blinds", status: "Active" },
  "S-002": { id: "S-002", name: "Beta Fabrics", initials: "BF", phone: "+61 422 222 222", email: "info@betafabrics.com", address: "20 Textile Rd, Melbourne", category: "Curtains", status: "Active" },
  "S-003": { id: "S-003", name: "Gamma Hardware", initials: "GH", phone: "+61 433 333 333", email: "supply@gammahardware.com", address: "30 Parts Ave, Brisbane", category: "Hardware", status: "Inactive" },
};

export const getCustomers = () => initialCustomers;
export const getJobs = () => jobsDb;
export const getSuppliers = () => initialSuppliers;
export const getOrders = () => initialOrders;
export const getEmployees = () => initialEmployees;
export const getCustomer = (id: string) => customersDb[id] || {
  id: id || "NEW",
  name: "New Customer",
  initials: "NC",
  phone: "+61 400 000 000",
  email: "customer@example.com",
  address: "Unknown Address",
  status: "Lead",
  hasJob: false,
  requested: "Oct 24, 2026"
};

export const getSupplier = (id: string) => suppliersDb[id] || {
  id: id || "NEW",
  name: "New Supplier",
  initials: "NS",
  phone: "+61 400 000 000",
  email: "supplier@example.com",
  address: "Unknown Address",
  category: "General",
  status: "Active",
};

export const getOrder = (id: string) => initialOrders.find(o => o.id === id) || {
  id: id || "PO-NEW",
  supplierId: "S-000",
  supplier: "Unknown Supplier",
  item: "Unknown Item",
  initials: "UN",
  amount: "$0",
  status: "Order Placed",
  date: "Today",
  expected: "TBD",
};
