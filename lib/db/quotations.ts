export const getQuotations = async () => [];
export const getQuotationsByCustomerId = async (customerId: string) => [];
export const getQuotationById = async (id: string) => ({ id, customer: {} });
export const createQuotation = async (quotation: any, items: any) => quotation;
export const updateQuotation = async (id: string, updates: any) => updates;
export const deleteQuotation = async (id: string) => true;
