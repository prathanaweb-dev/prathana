-- SQL Database Schema for Prarthana Foundation Solapur
-- Execute this in your Supabase SQL Editor to set up the campaigns and donations tables

-- 1. Create Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    goal_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    amount_raised DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    image TEXT NOT NULL, -- URL or base64 encoded image
    is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    payment_id VARCHAR(255) NOT NULL UNIQUE,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, success, failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
-- Campaigns
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Allow public read access to campaigns
CREATE POLICY "Allow public read access to campaigns" 
ON campaigns FOR SELECT 
USING (true);

-- Allow authenticated (admin) write access to campaigns
CREATE POLICY "Allow admin write access to campaigns" 
ON campaigns FOR ALL 
TO authenticated 
USING (true);

-- Donations
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to donations (for ticker and recent donor feeds)
CREATE POLICY "Allow public read access to donations" 
ON donations FOR SELECT 
USING (payment_status = 'success');

-- Allow service role or public insert access for checkout verification
CREATE POLICY "Allow public insert access to donations" 
ON donations FOR INSERT 
WITH CHECK (true);

-- Create a helper function to update campaigns when a donation is successful
CREATE OR REPLACE FUNCTION update_campaign_raised_amount()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payment_status = 'success' AND (OLD.payment_status IS NULL OR OLD.payment_status <> 'success') THEN
        UPDATE campaigns
        SET amount_raised = amount_raised + NEW.amount
        WHERE id = NEW.campaign_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update campaign amount_raised when payment_status changes to 'success'
CREATE TRIGGER on_donation_success
AFTER UPDATE ON donations
FOR EACH ROW
WHEN (NEW.payment_status = 'success' AND OLD.payment_status <> 'success')
EXECUTE FUNCTION update_campaign_raised_amount();

-- Trigger for direct insertions of successful payments
CREATE OR REPLACE FUNCTION update_campaign_raised_amount_on_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payment_status = 'success' THEN
        UPDATE campaigns
        SET amount_raised = amount_raised + NEW.amount
        WHERE id = NEW.campaign_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_donation_insert_success
AFTER INSERT ON donations
FOR EACH ROW
EXECUTE FUNCTION update_campaign_raised_amount_on_insert();
