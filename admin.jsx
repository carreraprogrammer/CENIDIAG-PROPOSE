// Admin web panel mockup + presentation shell
import React, { useState as aUseState } from 'react';
import { AIOrb } from './ai-orb.jsx';

const T = {
  cream: '#FAF6F2', paper: '#fff', ink: '#1A1715', text: '#2A2522',
  muted: '#7A6E68', hairline: '#EDE7E2', coral: '#F65275',
};

function Mark({ size = 24, color = '#F65275' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <circle cx="18" cy="18" r="13" stroke={color} strokeWidth="3"/>
      <line x1="27" y1="27" x2="38" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="15" cy="18" rx="2" ry="2.6" fill={color}/>
      <ellipse cx="21" cy="18" rx="2" ry="2.6" fill={color}/>
    </svg>
  );
}

function Pill({ color, fg, mono, children }) {
  return (
    <span style={{
      background: color, color: fg, padding: '3px 10px', borderRadius: 99,
      fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center',
      fontFamily: mono ? '"JetBrains Mono", monospace' : '"Manrope", system-ui',
      letterSpacing: mono ? 0.5 : 0,
    }}>{children}</span>
  );
}

export function AdminPanel() {
  const [tab, setTab] = aUseState('matrix');
  const [assistantOpen, setAssistantOpen] = aUseState(false);
  return (
    <div style={{
      width: '100%', height: '100%', background: T.cream,
      fontFamily: '"Manrope", system-ui', display: 'flex', overflow: 'hidden',
      borderRadius: 14, position: 'relative',
    }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: T.ink, color: '#fff',
        padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '0 8px' }}>
          <Mark size={22} color={T.coral}/>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 16 }}>
            CENI<span style={{ color: T.coral }}>DIAG</span> <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1 }}>ADMIN</span>
          </div>
        </div>
        {[
          { id: 'dash', l: 'Dashboard' },
          { id: 'matrix', l: 'Matriz clínica' },
          { id: 'users', l: 'Usuarios' },
          { id: 'farms', l: 'Granjas' },
          { id: 'reports', l: 'Reportes' },
          { id: 'settings', l: 'Configuración' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id ? 'rgba(246,82,117,0.15)' : 'transparent',
            color: tab === t.id ? T.coral : 'rgba(255,255,255,0.7)',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            fontFamily: '"Manrope", system-ui',
          }}>{t.l}</button>
        ))}
        <div style={{ marginTop: 'auto', padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: '"JetBrains Mono", monospace' }}>EQUIPO AUTORIZADO</div>
          <div style={{ fontSize: 12, marginTop: 2 }}>Porkcolombia</div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 28, overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontSize: 28, fontWeight: 700,
            color: T.ink, letterSpacing: -0.6 }}>Matriz clínica</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Pill color={T.cream} fg={T.muted} mono>v2.4 · 15 mar 2026</Pill>
            <button style={{ background: T.coral, color: '#fff', border: 'none', borderRadius: 10,
              padding: '8px 14px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              fontFamily: '"Manrope", system-ui' }}>+ Subir Excel</button>
          </div>
        </div>
        <div style={{ color: T.muted, fontSize: 13, marginBottom: 20 }}>
          Versionado de la matriz que la app descarga al estar en línea
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { n: '23', l: 'Enfermedades' },
            { n: '234', l: 'Síntomas' },
            { n: '5', l: 'Categorías animal' },
            { n: '7', l: 'Sistemas' },
          ].map((s, i) => (
            <div key={i} style={{ background: T.paper, borderRadius: 14, padding: 14 }}>
              <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
                fontSize: 28, fontWeight: 700, letterSpacing: -1, color: T.ink, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: T.paper, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${T.hairline}`,
            display: 'grid', gridTemplateColumns: '40px 1fr 1fr 100px 100px 60px',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            letterSpacing: 1, color: T.muted, fontWeight: 600 }}>
            <div>#</div><div>ENFERMEDAD</div><div>AGENTE</div><div>SISTEMA</div><div>CATEGORÍA</div><div style={{ textAlign: 'right' }}>SX</div>
          </div>
          {[
            ['01', 'Pleuroneumonía (APP)', 'A. pleuropneumoniae', 'Resp', 'PRE/CEBA', 8],
            ['02', 'Mycoplasma hyopneumoniae', 'M. hyopneumoniae', 'Resp', 'CEBA', 6],
            ['03', 'PRRS', 'PRRSv', 'Resp/Rep', 'TODOS', 12],
            ['04', 'Influenza porcina', 'IAV-S', 'Resp', 'TODOS', 7],
            ['05', 'Pasteurelosis', 'P. multocida', 'Resp', 'PRE/CEBA', 5],
            ['06', 'Diarrea neonatal', 'E. coli K88', 'Dig', 'LACT', 4],
            ['07', 'Disentería porcina', 'B. hyodysenteriae', 'Dig', 'CEBA', 6],
            ['08', 'Erisipela', 'E. rhusiopathiae', 'Sis', 'TODOS', 9],
          ].map((r, i) => (
            <div key={i} style={{ padding: '12px 16px', borderBottom: `1px solid ${T.hairline}`,
              display: 'grid', gridTemplateColumns: '40px 1fr 1fr 100px 100px 60px',
              fontSize: 13, color: T.text, alignItems: 'center' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', color: T.muted }}>{r[0]}</div>
              <div style={{ fontWeight: 600, color: T.ink }}>{r[1]}</div>
              <div style={{ fontStyle: 'italic', color: T.muted }}>{r[2]}</div>
              <div><Pill color={T.cream} fg={T.muted}>{r[3]}</Pill></div>
              <div><Pill color={T.cream} fg={T.muted}>{r[4]}</Pill></div>
              <div style={{ textAlign: 'right', fontWeight: 700 }}>{r[5]}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', right: 24, bottom: 24, zIndex: 20 }}>
        <AIOrb label="Insights IA" dark onClick={() => setAssistantOpen(true)} />
      </div>
      {assistantOpen && (
        <div style={{ position: 'absolute', right: 24, bottom: 96, zIndex: 30,
          width: 340, background: T.paper, border: `1px solid ${T.hairline}`,
          borderRadius: 16, boxShadow: '0 24px 70px rgba(26,23,21,0.22)',
          padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
                fontSize: 20, fontWeight: 700, color: T.ink, letterSpacing: -0.4 }}>Insights IA</div>
              <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>Reporte operativo automático</div>
            </div>
            <button type="button" onClick={() => setAssistantOpen(false)} style={{
              width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.hairline}`,
              background: T.paper, color: T.ink, cursor: 'pointer', fontWeight: 700,
            }}>×</button>
          </div>
          <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: T.cream,
            color: T.text, fontSize: 13, lineHeight: 1.45 }}>
            Este mes subieron las consultas respiratorias en Cundinamarca. Hay 3 granjas con diagnósticos repetidos y 12 consultas pendientes de sincronización.
          </div>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {['Generar resumen', 'Ver alertas', 'Exportar reporte', 'Programar envío'].map((action) => (
              <button key={action} type="button" style={{
                minHeight: 38, borderRadius: 10, border: `1px solid ${T.hairline}`,
                background: T.paper, color: T.ink, fontSize: 12, fontWeight: 700,
                cursor: 'pointer',
              }}>{action}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
