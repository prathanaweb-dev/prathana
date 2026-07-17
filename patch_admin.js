const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/admin/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Add 'team' to Tab
content = content.replace(
  "type Tab = 'dashboard'|'campaigns'|'donations'|'volunteers'|'content'|'messages'|'gallery';",
  "type Tab = 'dashboard'|'campaigns'|'donations'|'volunteers'|'team'|'content'|'messages'|'gallery';"
);

// 2. Add TeamMember state
content = content.replace(
  "  const [reports, setReports]       = useState<Report[]>([]);",
  `  const [reports, setReports]       = useState<Report[]>([]);\n  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);\n\n  // Team form\n  const [tDrawer, setTDrawer]     = useState(false);\n  const [editTeam, setEditTeam]   = useState<TeamMember|null>(null);\n  const [tName, setTName]         = useState('');\n  const [tPos, setTPos]           = useState('');\n  const [tPosMr, setTPosMr]       = useState('');\n  const [tImage, setTImage]       = useState('');`
);

// 3. Update fetchAll Promise.all
content = content.replace(
  "const [c, d, v, a, p, e, co, g, rp] = await Promise.all([",
  "const [c, d, v, a, p, e, co, g, rp, tm] = await Promise.all(["
);
content = content.replace(
  "fetch('/api/reports').then(r => r.json()),\n      ]);",
  "fetch('/api/reports').then(r => r.json()),\n        fetch('/api/team').then(r => r.json()),\n      ]);"
);

// 4. Update fetchAll set states
content = content.replace(
  "setReports(rp.reports || []);",
  "setReports(rp.reports || []);\n      setTeamMembers(tm.team_members || []);"
);

// 5. Add Team CRUD functions
const crudTarget = "  const navItems:";
const teamCrud = `  // ── Team CRUD ──
  const openTeamDrawer = (member?: TeamMember) => {
    setEditTeam(member || null);
    setTName(member?.name || '');
    setTPos(member?.position || ''); setTPosMr(member?.position_mr || '');
    setTImage(member?.image || '');
    setTDrawer(true);
  };
  const saveTeamMember = async () => {
    if (!tName || !tPos || !tImage) return notify('Name, position and photo required', 'error');
    setFormBusy(true);
    try {
      const body = { name: tName, position: tPos, position_mr: tPosMr, image: tImage };
      const method = editTeam ? 'PUT' : 'POST';
      const payload = editTeam ? { id: editTeam.id, ...body } : body;
      const res = await fetch('/api/team', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      notify(editTeam ? 'Team Member updated!' : 'Team Member added!');
      setTDrawer(false); fetchAll();
    } catch (e: any) { notify(e.message, 'error'); }
    finally { setFormBusy(false); }
  };
  const deleteTeamMember = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    const res = await fetch(\`/api/team?id=\${id}\`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { notify('Member deleted'); fetchAll(); } else notify('Delete failed', 'error');
  };

`;
content = content.replace(crudTarget, teamCrud + crudTarget);

// 6. Add to navItems
content = content.replace(
  "{ id: 'volunteers', icon: <Users size={18} />,           label: 'Volunteers', badge: volunteers.filter(v => v.status === 'pending').length || undefined },",
  "{ id: 'volunteers', icon: <Users size={18} />,           label: 'Volunteers', badge: volunteers.filter(v => v.status === 'pending').length || undefined },\n    { id: 'team',       icon: <UserCheck size={18} />,       label: 'Team Management' },"
);

// 7. Add Team rendering UI
// Find the end of volunteers tab: `{tab === 'volunteers' && (...)}`
// We'll append it before `{/* ════ CONTENT ════ */}`
const teamUI = `              {/* ════ TEAM ════ */}
              {tab === 'team' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-bold">Team Members ({teamMembers.length})</h2>
                    <button onClick={() => openTeamDrawer()} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500 text-amber-950 font-semibold text-xs hover:bg-amber-400 transition-colors">
                      <Plus size={14} /> Add Member
                    </button>
                  </div>
                  <div className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Photo & Name</th>
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Position</th>
                            <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {teamMembers.map(m => (
                            <tr key={m.id} className="hover:bg-white/2 transition-colors">
                              <td className="px-5 py-3.5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10">
                                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="font-medium text-white">{m.name}</div>
                              </td>
                              <td className="px-5 py-3.5 text-white/50">
                                <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-semibold">{m.position}</span>
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center justify-center gap-2">
                                  <button onClick={() => openTeamDrawer(m)} className="p-1.5 text-white/30 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors"><Edit2 size={14} /></button>
                                  <button onClick={() => deleteTeamMember(m.id)} className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={14} /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {teamMembers.length === 0 && <tr><td colSpan={3} className="text-center py-12 text-white/20">No team members yet</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

`;
content = content.replace("{/* ════ CONTENT ════ */}", teamUI + "              {/* ════ CONTENT ════ */}");

// 8. Add Team Drawer
const teamDrawer = `
      {/* ── Team Drawer ── */}
      <Drawer open={tDrawer} onClose={() => setTDrawer(false)} title={editTeam ? 'Edit Member' : 'Add Team Member'}>
        <div className="space-y-4">
          <ImageUpload value={tImage} onChange={setTImage} label="Member Photo (Square)" />
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Name</label>
            <input type="text" value={tName} onChange={e => setTName(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" placeholder="e.g. John Doe" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Position</label>
            <input type="text" value={tPos} onChange={e => setTPos(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" placeholder="e.g. Founder" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Position (Marathi) [Optional]</label>
            <input type="text" value={tPosMr} onChange={e => setTPosMr(e.target.value)} className="w-full bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" placeholder="e.g. संस्थापक" />
          </div>
          <button disabled={formBusy} onClick={saveTeamMember} className="w-full py-2.5 bg-amber-500 text-amber-950 font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 mt-4">
            {formBusy ? 'Saving...' : 'Save Member'}
          </button>
        </div>
      </Drawer>
`;

content = content.replace("{/* ── Gallery Drawer ── */}", teamDrawer + "      {/* ── Gallery Drawer ── */}");

fs.writeFileSync(pagePath, content);
console.log('Admin page updated successfully.');
