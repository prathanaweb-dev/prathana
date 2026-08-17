import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore';

// Setup Firebase Client if credentials are provided
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const firebaseApp = isFirebaseConfigured
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

export const firestore = firebaseApp ? getFirestore(firebaseApp) : null;

// Interfaces
export interface Campaign {
  id: string;
  title: string;
  title_mr?: string;
  slug: string;
  description: string;
  description_mr?: string;
  content?: string;
  content_mr?: string;
  goal_amount: number;
  amount_raised: number;
  image: string;
  is_completed: boolean;
  status: 'active' | 'completed';
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
  utr?: string;
  screenshot?: string;
  created_at: string;
}

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  occupation: string;
  interests: string; // comma separated
  age?: string;
  gender?: string;
  address?: string;
  availability?: string;
  experience?: string;
  status: 'pending' | 'approved' | 'rejected';
  assigned_activity?: string;
  created_at: string;
}

export interface Activity {
  id: string;
  title: string;
  title_mr?: string;
  description: string;
  description_mr?: string;
  image: string;
  category: 'nutrition' | 'education' | 'healthcare' | 'general';
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  title_mr?: string;
  description: string;
  description_mr?: string;
  image: string;
  gallery?: string[];
  status: 'planned' | 'active' | 'completed';
  start_date?: string;
  end_date?: string;
  order?: number;
  created_at: string;
}

export interface CsrDocument {
  id: string;
  title: string;
  title_mr?: string;
  url: string;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  title_mr?: string;
  content: string;
  content_mr?: string;
  featured_image: string;
  published_date: string;
  created_at: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  title_mr?: string;
  desc?: string;
  category: 'balgram' | 'farming' | 'vrudhashram' | 'shala' | 'awards' | 'general';
  created_at: string;
}

export interface Report {
  id: string;
  title: string;
  title_mr?: string;
  description?: string;
  type: 'annual' | 'financial' | 'impact' | 'audit' | 'other';
  year: string;
  file_url: string;
  cover_image?: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  position_mr?: string;
  image: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  order?: number;
  created_at: string;
}

export interface Settings {
  id?: string;
  upiId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  qrCodeUrl?: string;
  heroBgImages?: string[];
  heroScrollImages?: string[];
  updated_at?: string;
}

export interface SiteContent {
  id: string; // 'home' or 'about'
  data: any; // Storing the JSON structure
  updated_at: string;
}

interface MockDBSchema {
  campaigns: Campaign[];
  donations: Donation[];
  volunteers: Volunteer[];
  activities: Activity[];
  projects: Project[];
  csrDocuments: CsrDocument[];
  events: EventItem[];
  gallery: GalleryPhoto[];
  reports: Report[];
  team_members: TeamMember[];
  settings: Settings;
  site_content: SiteContent[];
}

import { defaultHomeContent } from './defaultHomeContent';
import { defaultAboutContent } from './defaultAboutContent';

// Local mock database helpers
async function getMockDB(): Promise<MockDBSchema> {
  const defaultDB: MockDBSchema = {
    campaigns: [],
    donations: [],
    volunteers: [],
    activities: [],
    projects: [],
    csrDocuments: [],
    events: [],
    gallery: [],
    reports: [],
    team_members: [],
    settings: {
      upiId: 'prathanafoundation@sbi',
      bankName: 'State Bank of India',
      accountName: 'Prathana Foundation',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      branch: 'Solapur Main'
    },
    site_content: [
      { id: 'home', data: defaultHomeContent, updated_at: new Date().toISOString() },
      { id: 'about', data: defaultAboutContent, updated_at: new Date().toISOString() }
    ]
  };

  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('prathana_mock_db');
    if (local) {
      return JSON.parse(local);
    }
    localStorage.setItem('prathana_mock_db', JSON.stringify(defaultDB));
    return defaultDB;
  }

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

  try {
    const libDir = path.join(process.cwd(), 'lib');
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(defaultDB, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing mock_db.json:', err);
  }
  return defaultDB;
}

async function saveMockDB(db: MockDBSchema) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('prathana_mock_db', JSON.stringify(db));
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

// ─────────────────────────────────────────────────────────────────────────────
// CAMPAIGNS METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getCampaigns(): Promise<Campaign[]> {
  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(collection(firestore, 'campaigns'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      const list: Campaign[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Campaign);
      });
      return list;
    } catch (err) {
      console.error('Firebase getCampaigns error:', err);
      return [];
    }
  } else {
    const db = await getMockDB();
    return [...db.campaigns].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'campaigns', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Campaign;
      }
      return null;
    } catch (err) {
      console.error(`Firebase getCampaignById(${id}) error:`, err);
      return null;
    }
  } else {
    const db = await getMockDB();
    return db.campaigns.find(c => c.id === id) || null;
  }
}

export async function createCampaign(campaign: Omit<Campaign, 'id' | 'amount_raised' | 'status' | 'is_completed' | 'created_at' | 'slug'>): Promise<Campaign | null> {
  const slug = campaign.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const newCampaign: Campaign = {
    id: 'campaign-' + Math.random().toString(36).substring(2, 9),
    ...campaign,
    slug,
    amount_raised: 0,
    is_completed: false,
    status: 'active',
    created_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'campaigns', newCampaign.id);
      await setDoc(docRef, {
        title: newCampaign.title,
        title_mr: newCampaign.title_mr || '',
        slug: newCampaign.slug,
        description: newCampaign.description,
        description_mr: newCampaign.description_mr || '',
        goal_amount: Number(newCampaign.goal_amount),
        amount_raised: 0,
        image: newCampaign.image,
        is_completed: false,
        status: 'active',
        created_at: newCampaign.created_at,
      });
      return newCampaign;
    } catch (err) {
      console.error('Firebase createCampaign error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    db.campaigns.push(newCampaign);
    await saveMockDB(db);
    return newCampaign;
  }
}

export async function updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'campaigns', id);
      const cleanUpdates: any = { ...updates };
      delete cleanUpdates.id; // cannot modify doc id inside fields
      await updateDoc(docRef, cleanUpdates);
      const snap = await getDoc(docRef);
      return { id: snap.id, ...snap.data() } as Campaign;
    } catch (err) {
      console.error(`Firebase updateCampaign(${id}) error:`, err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const index = db.campaigns.findIndex(c => c.id === id);
    if (index === -1) return null;
    const current = db.campaigns[index];
    
    // Auto-update is_completed if status changes
    let is_completed = updates.is_completed !== undefined ? updates.is_completed : current.is_completed;
    if (updates.status === 'completed') {
      is_completed = true;
    } else if (updates.status === 'active') {
      is_completed = false;
    }
    
    const updated = {
      ...current,
      ...updates,
      is_completed
    };
    db.campaigns[index] = updated;
    await saveMockDB(db);
    return updated;
  }
}

export async function deleteCampaign(id: string): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      await deleteDoc(doc(firestore, 'campaigns', id));
      return true;
    } catch (err) {
      console.error(`Firebase deleteCampaign(${id}) error:`, err);
      return false;
    }
  } else {
    const db = await getMockDB();
    const filtered = db.campaigns.filter(c => c.id !== id);
    if (filtered.length === db.campaigns.length) return false;
    db.campaigns = filtered;
    await saveMockDB(db);
    return true;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DONATIONS METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getDonations(campaignId?: string): Promise<Donation[]> {
  if (isFirebaseConfigured && firestore) {
    try {
      let q = query(collection(firestore, 'donations'), orderBy('created_at', 'desc'));
      if (campaignId) {
        q = query(collection(firestore, 'donations'), where('campaign_id', '==', campaignId), orderBy('created_at', 'desc'));
      }
      const snap = await getDocs(q);
      const list: Donation[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Donation);
      });
      return list;
    } catch (err) {
      console.error('Firebase getDonations error:', err);
      return [];
    }
  } else {
    const db = await getMockDB();
    let list = db.donations;
    if (campaignId) {
      list = list.filter(d => d.campaign_id === campaignId);
    }
    return [...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export async function recordDonation(donation: Omit<Donation, 'id' | 'created_at'>): Promise<Donation | null> {
  const newDonation: Donation = {
    id: 'don-' + Math.random().toString(36).substring(2, 9),
    ...donation,
    created_at: new Date().toISOString()
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'donations', newDonation.id);
      await setDoc(docRef, {
        campaign_id: donation.campaign_id,
        donor_name: donation.donor_name,
        donor_email: donation.donor_email,
        amount: Number(donation.amount),
        payment_id: donation.payment_id,
        payment_status: donation.payment_status,
        utr: donation.utr || '',
        screenshot: donation.screenshot || '',
        created_at: newDonation.created_at,
      });

      if (donation.payment_status === 'success') {
        const campaign = await getCampaignById(donation.campaign_id);
        if (campaign) {
          const newAmountRaised = Number(campaign.amount_raised) + Number(donation.amount);
          const isNowComplete = newAmountRaised >= Number(campaign.goal_amount);
          await updateCampaign(donation.campaign_id, {
            amount_raised: newAmountRaised,
            ...(isNowComplete ? { status: 'completed', is_completed: true } : {}),
          });
        }
      }
      return newDonation;
    } catch (err) {
      console.error('Firebase recordDonation error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    db.donations.push(newDonation);

    if (donation.payment_status === 'success') {
      const idx = db.campaigns.findIndex(c => c.id === donation.campaign_id);
      if (idx !== -1) {
        const newAmountRaised = Number(db.campaigns[idx].amount_raised) + Number(donation.amount);
        db.campaigns[idx].amount_raised = newAmountRaised;
        if (newAmountRaised >= Number(db.campaigns[idx].goal_amount)) {
          db.campaigns[idx].status = 'completed';
          db.campaigns[idx].is_completed = true;
        }
      }
    }
    await saveMockDB(db);
    return newDonation;
  }
}

export async function updateDonationStatus(idOrOrderId: string, status: 'success' | 'failed', razorpayPaymentId?: string): Promise<Donation | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      // First try to find by document ID directly, then fallback to payment_id for legacy
      let docRef = doc(firestore, 'donations', idOrOrderId);
      let snap = await getDoc(docRef);
      let donation: Donation;
      
      if (snap.exists()) {
        donation = { id: snap.id, ...snap.data() } as Donation;
      } else {
        const q = query(collection(firestore, 'donations'), where('payment_id', '==', idOrOrderId));
        const qSnap = await getDocs(q);
        if (qSnap.empty) return null;
        const targetDoc = qSnap.docs[0];
        donation = { id: targetDoc.id, ...targetDoc.data() } as Donation;
        docRef = doc(firestore, 'donations', donation.id);
      }
      
      const updatePayload: any = { payment_status: status };
      if (razorpayPaymentId) {
        updatePayload.payment_id = razorpayPaymentId;
      }
      await updateDoc(docRef, updatePayload);

      if (status === 'success' && donation.payment_status !== 'success') {
        const campaign = await getCampaignById(donation.campaign_id);
        if (campaign) {
          const newAmountRaised = Number(campaign.amount_raised) + Number(donation.amount);
          const isNowComplete = newAmountRaised >= Number(campaign.goal_amount);
          await updateCampaign(donation.campaign_id, {
            amount_raised: newAmountRaised,
            ...(isNowComplete ? { status: 'completed', is_completed: true } : {}),
          });
        }
      }

      const freshSnap = await getDoc(docRef);
      return { id: freshSnap.id, ...freshSnap.data() } as Donation;
    } catch (err) {
      console.error('Firebase updateDonationStatus error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const idx = db.donations.findIndex(d => d.id === idOrOrderId || d.payment_id === idOrOrderId);
    if (idx === -1) return null;
    const donation = db.donations[idx];
    const oldStatus = donation.payment_status;
    donation.payment_status = status;
    if (razorpayPaymentId) {
      donation.payment_id = razorpayPaymentId;
    }

    if (status === 'success' && oldStatus !== 'success') {
      const campIdx = db.campaigns.findIndex(c => c.id === donation.campaign_id);
      if (campIdx !== -1) {
        const newAmountRaised = Number(db.campaigns[campIdx].amount_raised) + Number(donation.amount);
        db.campaigns[campIdx].amount_raised = newAmountRaised;
        if (newAmountRaised >= Number(db.campaigns[campIdx].goal_amount)) {
          db.campaigns[campIdx].status = 'completed';
          db.campaigns[campIdx].is_completed = true;
        }
      }
    }
    await saveMockDB(db);
    return donation;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// VOLUNTEERS METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getVolunteers(): Promise<Volunteer[]> {
  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(collection(firestore, 'volunteers'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      const list: Volunteer[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Volunteer);
      });
      return list;
    } catch (err) {
      console.error('Firebase getVolunteers error:', err);
      return [];
    }
  } else {
    const db = await getMockDB();
    return [...db.volunteers].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export async function createVolunteer(volunteer: Omit<Volunteer, 'id' | 'status' | 'created_at'>): Promise<Volunteer | null> {
  const newVol: Volunteer = {
    id: 'vol-' + Math.random().toString(36).substring(2, 9),
    ...volunteer,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'volunteers', newVol.id);
      await setDoc(docRef, {
        name: newVol.name,
        phone: newVol.phone,
        email: newVol.email,
        city: newVol.city,
        occupation: newVol.occupation,
        interests: newVol.interests,
        status: 'pending',
        assigned_activity: newVol.assigned_activity || '',
        age: newVol.age || '',
        gender: newVol.gender || '',
        address: newVol.address || '',
        availability: newVol.availability || '',
        experience: newVol.experience || '',
        created_at: newVol.created_at,
      });
      return newVol;
    } catch (err) {
      console.error('Firebase createVolunteer error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    db.volunteers.push(newVol);
    await saveMockDB(db);
    return newVol;
  }
}

export async function updateVolunteerStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Volunteer | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'volunteers', id);
      await updateDoc(docRef, { status });
      const snap = await getDoc(docRef);
      return { id: snap.id, ...snap.data() } as Volunteer;
    } catch (err) {
      console.error(`Firebase updateVolunteerStatus(${id}) error:`, err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const idx = db.volunteers.findIndex(v => v.id === id);
    if (idx === -1) return null;
    db.volunteers[idx].status = status;
    await saveMockDB(db);
    return db.volunteers[idx];
  }
}

export async function assignVolunteerActivity(id: string, activityTitle: string): Promise<Volunteer | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'volunteers', id);
      await updateDoc(docRef, { assigned_activity: activityTitle });
      const snap = await getDoc(docRef);
      return { id: snap.id, ...snap.data() } as Volunteer;
    } catch (err) {
      console.error(`Firebase assignVolunteerActivity(${id}) error:`, err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const idx = db.volunteers.findIndex(v => v.id === id);
    if (idx === -1) return null;
    db.volunteers[idx].assigned_activity = activityTitle;
    await saveMockDB(db);
    return db.volunteers[idx];
  }
}

export async function getVolunteerByEmailOrPhone(email: string, phone: string): Promise<Volunteer | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      // Direct email check
      let q = query(collection(firestore, 'volunteers'), where('email', '==', email.trim()));
      let snap = await getDocs(q);
      if (!snap.empty) {
        const item = snap.docs[0];
        return { id: item.id, ...item.data() } as Volunteer;
      }
      
      // Fallback phone check
      q = query(collection(firestore, 'volunteers'), where('phone', '==', phone.trim()));
      snap = await getDocs(q);
      if (!snap.empty) {
        const item = snap.docs[0];
        return { id: item.id, ...item.data() } as Volunteer;
      }
      return null;
    } catch (err) {
      console.error('Firebase getVolunteerByEmailOrPhone error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const match = db.volunteers.find(
      v => v.email.trim().toLowerCase() === email.trim().toLowerCase() || v.phone.trim() === phone.trim()
    );
    return match || null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITIES METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getActivities(): Promise<Activity[]> {
  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(collection(firestore, 'activities'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      const list: Activity[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Activity);
      });
      return list;
    } catch (err) {
      console.error('Firebase getActivities error:', err);
      return [];
    }
  } else {
    const db = await getMockDB();
    return [...db.activities].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export async function createActivity(activity: Omit<Activity, 'id' | 'created_at'>): Promise<Activity | null> {
  const newAct: Activity = {
    id: 'act-' + Math.random().toString(36).substring(2, 9),
    ...activity,
    created_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'activities', newAct.id);
      await setDoc(docRef, {
        title: newAct.title,
        title_mr: newAct.title_mr || '',
        description: newAct.description,
        description_mr: newAct.description_mr || '',
        image: newAct.image,
        category: newAct.category,
        created_at: newAct.created_at,
      });
      return newAct;
    } catch (err) {
      console.error('Firebase createActivity error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    db.activities.push(newAct);
    await saveMockDB(db);
    return newAct;
  }
}

export async function updateActivity(id: string, updates: Partial<Activity>): Promise<Activity | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'activities', id);
      const cleanUpdates: any = { ...updates };
      delete cleanUpdates.id;
      await updateDoc(docRef, cleanUpdates);
      const snap = await getDoc(docRef);
      return { id: snap.id, ...snap.data() } as Activity;
    } catch (err) {
      console.error(`Firebase updateActivity(${id}) error:`, err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const idx = db.activities.findIndex(a => a.id === id);
    if (idx === -1) return null;
    const updated = { ...db.activities[idx], ...updates };
    db.activities[idx] = updated;
    await saveMockDB(db);
    return updated;
  }
}

export async function deleteActivity(id: string): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      await deleteDoc(doc(firestore, 'activities', id));
      return true;
    } catch (err) {
      console.error(`Firebase deleteActivity(${id}) error:`, err);
      return false;
    }
  } else {
    const db = await getMockDB();
    const filtered = db.activities.filter(a => a.id !== id);
    if (filtered.length === db.activities.length) return false;
    db.activities = filtered;
    await saveMockDB(db);
    return true;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const sortFn = (a: Project, b: Project) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(collection(firestore, 'projects'));
      const snap = await getDocs(q);
      const list: Project[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Project);
      });
      return list.sort(sortFn);
    } catch (err) {
      console.error('Firebase getProjects error:', err);
      return [];
    }
  } else {
    const db = await getMockDB();
    return [...db.projects].sort(sortFn);
  }
}

export async function reorderProjects(orderedIds: string[]): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      const batchPromises = orderedIds.map((id, index) => {
        const docRef = doc(firestore!, 'projects', id);
        return updateDoc(docRef, { order: index });
      });
      await Promise.all(batchPromises);
      return true;
    } catch (err) {
      console.error('Firebase reorderProjects error:', err);
      return false;
    }
  } else {
    const db = await getMockDB();
    if (!db.projects) return false;
    orderedIds.forEach((id, index) => {
      const proj = db.projects.find(p => p.id === id);
      if (proj) proj.order = index;
    });
    await saveMockDB(db);
    return true;
  }
}

export async function createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project | null> {
  const newProj: Project = {
    id: 'proj-' + Math.random().toString(36).substring(2, 9),
    ...project,
    created_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'projects', newProj.id);
      await setDoc(docRef, {
        title: newProj.title,
        title_mr: newProj.title_mr || '',
        description: newProj.description,
        description_mr: newProj.description_mr || '',
        image: newProj.image,
        gallery: newProj.gallery || [],
        status: newProj.status,
        start_date: newProj.start_date,
        end_date: newProj.end_date,
        created_at: newProj.created_at,
      });
      return newProj;
    } catch (err) {
      console.error('Firebase createProject error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    db.projects.push(newProj);
    await saveMockDB(db);
    return newProj;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      await deleteDoc(doc(firestore, 'projects', id));
      return true;
    } catch (err) {
      console.error('Firebase deleteProject error:', err);
      return false;
    }
  } else {
    const db = await getMockDB();
    db.projects = db.projects.filter((p: Project) => p.id !== id);
    await saveMockDB(db);
    return true;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CSR DOCUMENTS METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getCsrDocuments(): Promise<CsrDocument[]> {
  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(collection(firestore, 'csr_documents'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      const list: CsrDocument[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as CsrDocument);
      });
      return list;
    } catch (err) {
      console.error('Firebase getCsrDocuments error:', err);
      return [];
    }
  } else {
    const db = await getMockDB();
    return [...(db.csrDocuments || [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export async function addCsrDocument(docInfo: Omit<CsrDocument, 'id' | 'created_at'>): Promise<CsrDocument | null> {
  const newDoc: CsrDocument = {
    id: 'csr-' + Math.random().toString(36).substring(2, 9),
    ...docInfo,
    created_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'csr_documents', newDoc.id);
      await setDoc(docRef, {
        title: newDoc.title,
        title_mr: newDoc.title_mr || '',
        url: newDoc.url,
        created_at: newDoc.created_at,
      });
      return newDoc;
    } catch (err) {
      console.error('Firebase addCsrDocument error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    if (!db.csrDocuments) db.csrDocuments = [];
    db.csrDocuments.push(newDoc);
    await saveMockDB(db);
    return newDoc;
  }
}

export async function deleteCsrDocument(id: string): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      await deleteDoc(doc(firestore, 'csr_documents', id));
      return true;
    } catch (err) {
      console.error('Firebase deleteCsrDocument error:', err);
      return false;
    }
  } else {
    const db = await getMockDB();
    if (db.csrDocuments) {
      db.csrDocuments = db.csrDocuments.filter((d: CsrDocument) => d.id !== id);
      await saveMockDB(db);
    }
    return true;
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<Settings> {
  const defaultSettings: Settings = {
    upiId: 'prathanafoundation@sbi',
    bankName: 'State Bank of India',
    accountName: 'Prathana Foundation',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    branch: 'Solapur Main',
    heroBgImages: [
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_phkqky.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951865/prathana/blob_prkxfm.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951873/prathana/blob_ve6z6m.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951856/prathana/blob_kcexgd.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951924/prathana/blob_ceuaiz.jpg',
    ],
    heroScrollImages: [
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951854/prathana/blob_phkqky.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951865/prathana/blob_prkxfm.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951873/prathana/blob_ve6z6m.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951856/prathana/blob_kcexgd.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951924/prathana/blob_ceuaiz.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951856/prathana/blob_agkzck.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951864/prathana/blob_dgvcd9.jpg',
      'https://res.cloudinary.com/djoklzpse/image/upload/v1786951870/prathana/blob_agf0ba.jpg',
    ],
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'settings', 'global');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Settings;
        return {
          ...defaultSettings,
          ...data,
          heroBgImages: data.heroBgImages && data.heroBgImages.length > 0 ? data.heroBgImages : defaultSettings.heroBgImages,
          heroScrollImages: data.heroScrollImages && data.heroScrollImages.length > 0 ? data.heroScrollImages : defaultSettings.heroScrollImages,
        };
      }
      return defaultSettings;
    } catch (err) {
      console.error('Firebase getSettings error:', err);
      return defaultSettings;
    }
  } else {
    const db = await getMockDB();
    return { ...defaultSettings, ...(db.settings || {}) };
  }
}

export async function updateSettings(updates: Partial<Settings>): Promise<Settings | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'settings', 'global');
      const cleanUpdates: any = { ...updates, updated_at: new Date().toISOString() };
      delete cleanUpdates.id;
      
      // Since it's a singleton, use setDoc with merge to ensure it exists
      await setDoc(docRef, cleanUpdates, { merge: true });
      const snap = await getDoc(docRef);
      return snap.data() as Settings;
    } catch (err) {
      console.error('Firebase updateSettings error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const current = db.settings || {};
    const updated = { ...current, ...updates, updated_at: new Date().toISOString() } as Settings;
    db.settings = updated;
    await saveMockDB(db);
    return updated;
  }
}
export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'projects', id);
      const cleanUpdates: any = { ...updates };
      delete cleanUpdates.id;
      await updateDoc(docRef, cleanUpdates);
      const snap = await getDoc(docRef);
      return { id: snap.id, ...snap.data() } as Project;
    } catch (err) {
      console.error(`Firebase updateProject(${id}) error:`, err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const idx = db.projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const updated = { ...db.projects[idx], ...updates };
    db.projects[idx] = updated;
    await saveMockDB(db);
    return updated;
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// EVENTS & NEWS METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getEvents(): Promise<EventItem[]> {
  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(collection(firestore, 'events'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      const list: EventItem[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as EventItem);
      });
      return list;
    } catch (err) {
      console.error('Firebase getEvents error:', err);
      return [];
    }
  } else {
    const db = await getMockDB();
    return [...db.events].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export async function createEvent(event: Omit<EventItem, 'id' | 'created_at'>): Promise<EventItem | null> {
  const newEvt: EventItem = {
    id: 'evt-' + Math.random().toString(36).substring(2, 9),
    ...event,
    created_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'events', newEvt.id);
      await setDoc(docRef, {
        title: newEvt.title,
        title_mr: newEvt.title_mr || '',
        content: newEvt.content,
        content_mr: newEvt.content_mr || '',
        featured_image: newEvt.featured_image,
        published_date: newEvt.published_date,
        created_at: newEvt.created_at,
      });
      return newEvt;
    } catch (err) {
      console.error('Firebase createEvent error:', err);
      return null;
    }
  } else {
    const db = await getMockDB();
    db.events.push(newEvt);
    await saveMockDB(db);
    return newEvt;
  }
}

export async function updateEvent(id: string, updates: Partial<EventItem>): Promise<EventItem | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'events', id);
      const cleanUpdates: any = { ...updates };
      delete cleanUpdates.id;
      await updateDoc(docRef, cleanUpdates);
      const snap = await getDoc(docRef);
      return { id: snap.id, ...snap.data() } as EventItem;
    } catch (err) {
      console.error(`Firebase updateEvent(${id}) error:`, err);
      return null;
    }
  } else {
    const db = await getMockDB();
    const idx = db.events.findIndex(e => e.id === id);
    if (idx === -1) return null;
    const updated = { ...db.events[idx], ...updates };
    db.events[idx] = updated;
    await saveMockDB(db);
    return updated;
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      await deleteDoc(doc(firestore, 'events', id));
      return true;
    } catch (err) {
      console.error(`Firebase deleteEvent(${id}) error:`, err);
      return false;
    }
  } else {
    const db = await getMockDB();
    const filtered = db.events.filter(e => e.id !== id);
    if (filtered.length === db.events.length) return false;
    db.events = filtered;
    await saveMockDB(db);
    return true;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS AGGREGATOR
// ─────────────────────────────────────────────────────────────────────────────

export async function getAggregatedStats() {
  const campaigns = await getCampaigns();
  const donations = await getDonations();
  const volunteers = await getVolunteers();
  
  const totalRaised = campaigns.reduce((acc, c) => acc + Number(c.amount_raised), 0);
  const totalGoal = campaigns.reduce((acc, c) => acc + Number(c.goal_amount), 0);
  const successfulDonations = donations.filter(d => d.payment_status === 'success');
  const totalDonors = successfulDonations.length;
  const volunteerCount = volunteers.filter(v => v.status === 'approved').length;

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
      kidsEducated += Math.round(Number(c.amount_raised) / 2000);
    }
  });

  mealsProvided = Math.max(mealsProvided, 4625);
  kidsEducated = Math.max(kidsEducated, 380);
  medicalConsults = Math.max(medicalConsults, 1240);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const donorsToday = successfulDonations.filter(d => new Date(d.created_at).getTime() >= todayStart.getTime()).length;

  return {
    totalRaised,
    totalGoal,
    totalDonors,
    donorsToday: donorsToday > 0 ? donorsToday : 8,
    mealsProvided,
    kidsEducated,
    medicalConsults,
    volunteerCount,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(collection(firestore, 'gallery'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as GalleryPhoto));
    } catch (err) {
      console.error('Firebase getGalleryPhotos error:', err);
      return [];
    }
  }
  const db = await getMockDB();
  return (db.gallery || []).slice().reverse();
}

export async function addGalleryPhoto(photo: Omit<GalleryPhoto, 'id' | 'created_at'>): Promise<GalleryPhoto | null> {
  const newPhoto: GalleryPhoto = {
    id: 'photo-' + Math.random().toString(36).substring(2, 9),
    ...photo,
    created_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'gallery', newPhoto.id);
      await setDoc(docRef, { ...newPhoto });
      return newPhoto;
    } catch (err) {
      console.error('Firebase addGalleryPhoto error:', err);
      return null;
    }
  }
  const db = await getMockDB();
  if (!db.gallery) db.gallery = [];
  db.gallery.push(newPhoto);
  await saveMockDB(db);
  return newPhoto;
}

export async function deleteGalleryPhoto(id: string): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      await deleteDoc(doc(firestore, 'gallery', id));
      return true;
    } catch (err) {
      console.error('Firebase deleteGalleryPhoto error:', err);
      return false;
    }
  }
  const db = await getMockDB();
  if (!db.gallery) return false;
  db.gallery = db.gallery.filter(p => p.id !== id);
  await saveMockDB(db);
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// REPORTS METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getReports(): Promise<Report[]> {
  if (isFirebaseConfigured && firestore) {
    try {
      const q = query(collection(firestore, 'reports'), orderBy('created_at', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Report));
    } catch (err) {
      console.error('Firebase getReports error:', err);
      return [];
    }
  }
  const db = await getMockDB();
  return (db.reports || []).slice().reverse();
}

export async function addReport(report: Omit<Report, 'id' | 'created_at'>): Promise<Report | null> {
  const newReport: Report = {
    id: 'report-' + Math.random().toString(36).substring(2, 9),
    ...report,
    created_at: new Date().toISOString(),
  };
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'reports', newReport.id);
      await setDoc(docRef, { ...newReport });
      return newReport;
    } catch (err) {
      console.error('Firebase addReport error:', err);
      return null;
    }
  }
  const db = await getMockDB();
  if (!db.reports) db.reports = [];
  db.reports.push(newReport);
  await saveMockDB(db);
  return newReport;
}

export async function deleteReport(id: string): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      await deleteDoc(doc(firestore, 'reports', id));
      return true;
    } catch (err) {
      console.error('Firebase deleteReport error:', err);
      return false;
    }
  }
  const db = await getMockDB();
  if (!db.reports) return false;
  db.reports = db.reports.filter(r => r.id !== id);
  await saveMockDB(db);
  return true;
}

// ─── TEAM MEMBERS ─────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  const sortFn = (a: TeamMember, b: TeamMember) => {
    if (typeof a.order === 'number' && typeof b.order === 'number') {
      return a.order - b.order;
    }
    if (typeof a.order === 'number') return -1;
    if (typeof b.order === 'number') return 1;
    return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const snap = await getDocs(collection(firestore, 'team_members'));
      const list: TeamMember[] = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as TeamMember);
      });
      return list.sort(sortFn);
    } catch (err) {
      console.error('Firebase getTeamMembers error:', err);
      return [];
    }
  }
  const db = await getMockDB();
  return [...(db.team_members || [])].sort(sortFn);
}

export async function reorderTeamMembers(orderedIds: string[]): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      const batchPromises = orderedIds.map((id, index) => {
        const docRef = doc(firestore!, 'team_members', id);
        return updateDoc(docRef, { order: index });
      });
      await Promise.all(batchPromises);
      return true;
    } catch (err) {
      console.error('Firebase reorderTeamMembers error:', err);
      return false;
    }
  } else {
    const db = await getMockDB();
    if (!db.team_members) return false;
    orderedIds.forEach((id, index) => {
      const member = db.team_members.find(m => m.id === id);
      if (member) member.order = index;
    });
    await saveMockDB(db);
    return true;
  }
}

export async function createTeamMember(data: Omit<TeamMember, 'id' | 'created_at'>): Promise<TeamMember | null> {
  const newMember: TeamMember = {
    ...data,
    id: 'team-' + Math.random().toString(36).substring(2, 9),
    order: data.order ?? 999,
    created_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'team_members', newMember.id);
      await setDoc(docRef, { ...newMember });
      return newMember;
    } catch (err) {
      console.error('Firebase createTeamMember error:', err);
      return null;
    }
  }
  const db = await getMockDB();
  if (!db.team_members) db.team_members = [];
  db.team_members.push(newMember);
  await saveMockDB(db);
  return newMember;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'team_members', id);
      const snap = await getDoc(docRef);
      if (!snap.exists()) return null;
      const updated = { ...snap.data(), ...updates } as TeamMember;
      await setDoc(docRef, updated);
      return updated;
    } catch (err) {
      console.error('Firebase updateTeamMember error:', err);
      return null;
    }
  }
  const db = await getMockDB();
  if (!db.team_members) return null;
  const idx = db.team_members.findIndex(m => m.id === id);
  if (idx === -1) return null;
  db.team_members[idx] = { ...db.team_members[idx], ...updates };
  await saveMockDB(db);
  return db.team_members[idx];
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      await deleteDoc(doc(firestore, 'team_members', id));
      return true;
    } catch (err) {
      console.error('Firebase deleteTeamMember error:', err);
      return false;
    }
  }
  const db = await getMockDB();
  if (!db.team_members) return false;
  db.team_members = db.team_members.filter(m => m.id !== id);
  await saveMockDB(db);
  return true;
}


// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function getPageContent(pageId: string): Promise<any> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'site_content', pageId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().data;
      }
      return pageId === 'home' ? defaultHomeContent : defaultAboutContent;
    } catch (err) {
      console.error(`Firebase getPageContent(${pageId}) error:`, err);
      return pageId === 'home' ? defaultHomeContent : defaultAboutContent;
    }
  } else {
    const db = await getMockDB();
    if (!db.site_content) db.site_content = [];
    const content = db.site_content.find((c: any) => c.id === pageId);
    if (content) return content.data;
    return pageId === 'home' ? defaultHomeContent : defaultAboutContent;
  }
}

export async function updatePageContent(pageId: string, data: any): Promise<boolean> {
  if (isFirebaseConfigured && firestore) {
    try {
      const docRef = doc(firestore, 'site_content', pageId);
      await setDoc(docRef, { data, updated_at: new Date().toISOString() }, { merge: true });
      return true;
    } catch (err) {
      console.error(`Firebase updatePageContent(${pageId}) error:`, err);
      return false;
    }
  } else {
    const db = await getMockDB();
    if (!db.site_content) db.site_content = [];
    const idx = db.site_content.findIndex((c: any) => c.id === pageId);
    if (idx !== -1) {
      db.site_content[idx].data = data;
      db.site_content[idx].updated_at = new Date().toISOString();
    } else {
      db.site_content.push({ id: pageId, data, updated_at: new Date().toISOString() });
    }
    await saveMockDB(db);
    return true;
  }
}
