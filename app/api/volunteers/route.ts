import { NextResponse } from 'next/server';
import { getVolunteers, createVolunteer, updateVolunteerStatus, assignVolunteerActivity, getVolunteerByEmailOrPhone } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');

  try {
    if (email && phone) {
      const vol = await getVolunteerByEmailOrPhone(email, phone);
      if (!vol) {
        return NextResponse.json({ success: false, error: 'Volunteer not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, volunteer: vol });
    }

    const list = await getVolunteers();
    return NextResponse.json({ success: true, volunteers: list });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, occupation, interests, interest, message, age, gender, address, availability, experience } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ success: false, error: 'Name, phone and email are required' }, { status: 400 });
    }

    // Check if volunteer is already registered
    const existing = await getVolunteerByEmailOrPhone(email, phone);
    if (existing) {
      return NextResponse.json({ success: false, error: 'Volunteer already registered with this email or phone' }, { status: 409 });
    }

    const newVol = await createVolunteer({
      name,
      phone,
      email,
      city: city || 'Solapur',
      occupation: occupation || 'Volunteer',
      interests: interests || interest || 'Education',
      age: age || '',
      gender: gender || '',
      address: address || '',
      availability: availability || 'Weekends',
      experience: experience || message || '',
      assigned_activity: body.assigned_activity || '',
    });

    if (!newVol) throw new Error('Creation failed');

    return NextResponse.json({ success: true, volunteer: newVol });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, assigned_activity } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Id is required' }, { status: 400 });
    }

    let updated = null;
    if (status !== undefined) {
      updated = await updateVolunteerStatus(id, status);
    }
    if (assigned_activity !== undefined) {
      updated = await assignVolunteerActivity(id, assigned_activity);
    }

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Volunteer not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, volunteer: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
