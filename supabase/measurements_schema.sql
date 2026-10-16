-- supabase/measurements_schema.sql
CREATE TABLE IF NOT EXISTS measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(customer_id) ON DELETE CASCADE,
  job_id UUID REFERENCES enquiries(id) ON DELETE SET NULL,
  enquiry_id UUID REFERENCES enquiries(id) ON DELETE SET NULL,
  job_no TEXT,
  date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT CHECK (status IN ('Draft', 'For Quotation', 'Final')) DEFAULT 'Draft',
  fabric_confirmed BOOLEAN DEFAULT FALSE,
  locations_count INT DEFAULT 0,
  coverings_count INT DEFAULT 0,
  client_info JSONB DEFAULT '{}'::jsonb,
  locations_data JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
