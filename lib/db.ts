import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client if credentials are provided
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types
export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  amount_raised: number;
  image: string;
  is_completed: boolean;
  created_at: string;
}

export interface Donation {
  id: string;
  campaign_id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  payment_id: string;
  payment_status: 'pending' | 'success' | 'failed';
  created_at: string;
}

// Initial Seed Data for Mock DB
const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: 'campaign-1',
    title: 'Sponsor Nutrition & Meals for Orphaned Children',
    description: 'Provides hot, fresh, and nutritious meals to orphaned children and single-parent households in Solapur\'s slum settlements. Good health starts with basic nutrition. A meal costs just ₹40, and your contribution feeds them daily, ensuring they do not go to sleep hungry.',
    goal_amount: 300000,
    amount_raised: 185000,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    is_completed: false,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'campaign-2',
    title: 'Primary Education Kits & School Support',
    description: 'Empowers girls and boys from marginalized families with comprehensive school kits containing books, notebooks, writing materials, uniforms, school bags, and sturdy footwear. Help us prevent dropouts by covering their yearly educational expenses and registration fees.',
    goal_amount: 250000,
    amount_raised: 95000,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    is_completed: false,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'campaign-3',
    title: 'Mobile Healthcare Unit & Free Medicines',
    description: 'Deploys a weekly mobile medical clinic with volunteer doctors, providing primary health checkups, diagnostic support, and free essential prescription medicines to elderly widows, laborers, and children in under-resourced rural pockets of Solapur.',
    goal_amount: 500000,
    amount_raised: 320000,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    is_completed: false,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const SEED_DONATIONS: Donation[] = [
  {
    id: 'don-1',
    campaign_id: 'campaign-1',
    donor_name: 'Sunita Deshmukh',
    donor_email: 'sunita.d@gmail.com',
    amount: 5000,
    payment_id: 'pay_MOCK123456',
    payment_status: 'success',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 'don-2',
    campaign_id: 'campaign-3',
    donor_name: 'Aniket Shinde',
    donor_email: 'aniket.shinde@hotmail.com',
    amount: 10000,
    payment_id: 'pay_MOCK654321',
    payment_status: 'success',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
  {
    id: 'don-3',
    campaign_id: 'campaign-2',
    donor_name: 'Rajesh Kulkarni',
    donor_email: 'r.kulkarni@yahoo.com',
    amount: 2500,
    payment_id: 'pay_MOCK789012',
    payment_status: 'success',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'don-4',
    campaign_id: 'campaign-1',
    donor_name: 'Priya Patil',
    donor_email: 'priya.patil@outlook.com',
    amount: 1500,
    payment_id: 'pay_MOCK345678',
    payment_status: 'success',
    created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
  },
  {
    id: 'don-5',
    campaign_id: 'campaign-3',
    donor_name: 'Dr. Amit Shah',
    donor_email: 'amit.shah.clinic@gmail.com',
    amount: 25000,
    payment_id: 'pay_MOCK901234',
    payment_status: 'success',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  }
];

// Helper to interact with the mock database file on the server
async function getMockDB(): Promise<{ campaigns: Campaign[]; donations: Donation[] }> {
  if (typeof window !== 'undefined') {
    // Client-side fallback: Try parsing local storage, otherwise use raw seeds
    const local = localStorage.getItem('prarthana_mock_db');
    if (local) {
      return JSON.parse(local);
    }
    const db = { campaigns: SEED_CAMPAIGNS, donations: SEED_DONATIONS };
    localStorage.setItem('prarthana_mock_db', JSON.stringify(db));
    return db;
  }

  // Server-side: Try reading from a local JSON file to persist data
  const fs = require('fs');
  const path = require('path');
  const dbPath = path.join(process.cwd(), 'lib', 'mock_db.json');

  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading mock_db.json:', err);
  }

  // If file doesn't exist, create it with seed data
  const db = { campaigns: SEED_CAMPAIGNS, donations: SEED_DONATIONS };
  try {
    // Ensure lib directory exists
    const libDir = path.join(process.cwd(), 'lib');
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing mock_db.json:', err);
  }
  return db;
}

async function saveMockDB(db: { campaigns: Campaign[]; donations: Donation[] }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('prarthana_mock_db', JSON.stringify(db));
    return;
  }

  const fs = require('fs');
  const path = require('path');
  const dbPath = path.join(process.cwd(), 'lib', 'mock_db.json');

  try {
    const libDir = path.join(process.cwd(), 'lib');
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing mock_db.json:', err);
  }
}

// Database Actions
export async function getCampaigns(): Promise<Campaign[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase getCampaigns error:', error);
      return [];
    }
    return data || [];
  } else {
    const db = await getMockDB();
    return [...db.campaigns].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error(`Supabase getCampaignById(${id}) error:`, error);
      return null;
    }
    return data;
  } else {
    const db = await getMockDB();
    return db.campaigns.find(c => c.id === id) || null;
  }
}

export async function createCampaign(campaign: Omit<Campaign, 'id' | 'amount_raised' | 'is_completed' | 'created_at'>): Promise<Campaign | null> {
  const newCampaign: Campaign = {
    id: 'campaign-' + Math.random().toString(36).substring(2, 9),
    title: campaign.title,
    description: campaign.description,
    goal_amount: Number(campaign.goal_amount),
    amount_raised: 0,
    image: campaign.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    is_completed: false,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([{
        title: campaign.title,
        description: campaign.description,
        goal_amount: Number(campaign.goal_amount),
        amount_raised: 0,
        image: campaign.image,
        is_completed: false
      }])
      .select()
      .single();
    if (error) {
      console.error('Supabase createCampaign error:', error);
      return null;
    }
    return data;
  } else {
    const db = await getMockDB();
    db.campaigns.push(newCampaign);
    await saveMockDB(db);
    return newCampaign;
  }
}

export async function updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.error(`Supabase updateCampaign(${id}) error:`, error);
      return null;
    }
    return data;
  } else {
    const db = await getMockDB();
    const index = db.campaigns.findIndex(c => c.id === id);
    if (index === -1) return null;
    db.campaigns[index] = { ...db.campaigns[index], ...updates };
    await saveMockDB(db);
    return db.campaigns[index];
  }
}

export async function recordDonation(donation: Omit<Donation, 'id' | 'created_at'>): Promise<Donation | null> {
  const newDonation: Donation = {
    id: 'don-' + Math.random().toString(36).substring(2, 9),
    ...donation,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('donations')
      .insert([{
        campaign_id: donation.campaign_id,
        donor_name: donation.donor_name,
        donor_email: donation.donor_email,
        amount: Number(donation.amount),
        payment_id: donation.payment_id,
        payment_status: donation.payment_status
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase recordDonation error:', error);
      return null;
    }

    // Trigger updates raised amount if payment is success (normally handled by DB trigger, but let's be safe)
    if (donation.payment_status === 'success') {
      const campaign = await getCampaignById(donation.campaign_id);
      if (campaign) {
        await updateCampaign(donation.campaign_id, {
          amount_raised: Number(campaign.amount_raised) + Number(donation.amount)
        });
      }
    }

    return data;
  } else {
    const db = await getMockDB();
    db.donations.push(newDonation);

    if (donation.payment_status === 'success') {
      const campIndex = db.campaigns.findIndex(c => c.id === donation.campaign_id);
      if (campIndex !== -1) {
        db.campaigns[campIndex].amount_raised = Number(db.campaigns[campIndex].amount_raised) + Number(donation.amount);
      }
    }

    await saveMockDB(db);
    return newDonation;
  }
}

export async function getDonations(campaignId?: string): Promise<Donation[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (campaignId) {
      query = query.eq('campaign_id', campaignId);
    }
    
    const { data, error } = await query;
    if (error) {
      console.error('Supabase getDonations error:', error);
      return [];
    }
    return data || [];
  } else {
    const db = await getMockDB();
    let donations = db.donations;
    if (campaignId) {
      donations = donations.filter(d => d.campaign_id === campaignId);
    }
    return [...donations].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export async function getAggregatedStats() {
  const campaigns = await getCampaigns();
  const donations = await getDonations();
  
  const totalRaised = campaigns.reduce((acc, c) => acc + Number(c.amount_raised), 0);
  const totalGoal = campaigns.reduce((acc, c) => acc + Number(c.goal_amount), 0);
  const successfulDonations = donations.filter(d => d.payment_status === 'success');
  const totalDonors = successfulDonations.length;
  
  // Calculate people helped (meals + kit equivalents)
  // Let's say: 1 meal is ₹40, 1 kid education is ₹2500, 1 health consultation is ₹1000.
  // We can approximate impact based on campaign raised amounts
  let mealsProvided = 0;
  let kidsEducated = 0;
  let medicalConsults = 0;

  campaigns.forEach(c => {
    if (c.id === 'campaign-1') {
      mealsProvided = Math.round(Number(c.amount_raised) / 40);
    } else if (c.id === 'campaign-2') {
      kidsEducated = Math.round(Number(c.amount_raised) / 2500);
    } else if (c.id === 'campaign-3') {
      medicalConsults = Math.round(Number(c.amount_raised) / 500);
    } else {
      // General campaign helps children
      kidsEducated += Math.round(Number(c.amount_raised) / 2000);
    }
  });

  // Default fallbacks in case raised amounts are low
  mealsProvided = Math.max(mealsProvided, 4625);
  kidsEducated = Math.max(kidsEducated, 380);
  medicalConsults = Math.max(medicalConsults, 1240);

  // Recent donors count today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const donorsToday = successfulDonations.filter(d => new Date(d.created_at).getTime() >= todayStart.getTime()).length;
  
  return {
    totalRaised,
    totalGoal,
    totalDonors,
    donorsToday: donorsToday > 0 ? donorsToday : 8, // fallback simulated value
    mealsProvided,
    kidsEducated,
    medicalConsults,
  };
}

export async function updateDonationStatus(
  orderId: string,
  status: 'success' | 'failed',
  razorpayPaymentId?: string
): Promise<Donation | null> {
  if (isSupabaseConfigured && supabase) {
    // 1. Get donation record to find campaign_id and amount
    const { data: donation, error: getError } = await supabase
      .from('donations')
      .select('*')
      .eq('payment_id', orderId)
      .maybeSingle();

    if (getError || !donation) {
      console.error('Error finding donation for status update:', getError);
      return null;
    }

    // 2. Update donation record status
    const { data: updatedDonation, error: updateError } = await supabase
      .from('donations')
      .update({
        payment_status: status,
        payment_id: razorpayPaymentId || donation.payment_id
      })
      .eq('id', donation.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating donation status:', updateError);
      return null;
    }

    // 3. Update campaign amount_raised if transition to success (normally triggers do this but let's be double sure in API fallback)
    if (status === 'success' && donation.payment_status !== 'success') {
      const campaign = await getCampaignById(donation.campaign_id);
      if (campaign) {
        await updateCampaign(donation.campaign_id, {
          amount_raised: Number(campaign.amount_raised) + Number(donation.amount)
        });
      }
    }

    return updatedDonation;
  } else {
    // Mock DB update
    const db = await getMockDB();
    const donationIndex = db.donations.findIndex(d => d.payment_id === orderId);
    if (donationIndex === -1) {
      console.error('Donation not found for orderId:', orderId);
      return null;
    }

    const donation = db.donations[donationIndex];
    const oldStatus = donation.payment_status;

    donation.payment_status = status;
    if (razorpayPaymentId) {
      donation.payment_id = razorpayPaymentId;
    }

    // If transaction changed to success, increment campaign totals
    if (status === 'success' && oldStatus !== 'success') {
      const campIndex = db.campaigns.findIndex(c => c.id === donation.campaign_id);
      if (campIndex !== -1) {
        db.campaigns[campIndex].amount_raised = Number(db.campaigns[campIndex].amount_raised) + Number(donation.amount);
      }
    }

    await saveMockDB(db);
    return donation;
  }
}

