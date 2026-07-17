import { getTeamMembers, getVolunteers } from '@/lib/db';
import TeamClient from './TeamClient';

export default async function TeamPage({ params }: { params: { lang: string } }) {
  const [team, allVolunteers] = await Promise.all([
    getTeamMembers(),
    getVolunteers()
  ]);
  const volunteers = allVolunteers.filter(v => v.status === 'approved');

  return <TeamClient lang={params.lang} teamMembers={team} volunteers={volunteers} />;
}
