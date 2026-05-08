// CENIDIAG - Pork Colombia mobile app prototype
import React, { useState } from 'react';
import { AIOrb } from './ai-orb.jsx';

const T = {
  coral: '#F65275', coralDeep: '#D93E60', coralSoft: '#FFE4EA',
  ink: '#1A1715', text: '#2A2522', muted: '#7A6E68',
  hairline: '#EDE7E2', cream: '#FAF6F2', paper: '#FFFFFF',
  gray: '#666666', ok: '#2F8F5C', warn: '#C77A1C',
};

function Mark({ size = 28, color = T.coral }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="13" cy="13" r="9" stroke={color} strokeWidth="2.6"/>
      <line x1="20" y1="20" x2="28" y2="28" stroke={color} strokeWidth="2.6" strokeLinecap="round"/>
      <ellipse cx="10.5" cy="13.5" rx="1.4" ry="1.9" fill={color}/>
      <ellipse cx="15.5" cy="13.5" rx="1.4" ry="1.9" fill={color}/>
    </svg>
  );
}

function Wordmark({ color = T.ink, accent = T.coral }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: '"Bricolage Grotesque", system-ui',
      fontWeight: 700, fontSize: 22, letterSpacing: -0.5, color }}>
      <Mark size={26} color={accent}/>
      <span>CENI<span style={{ color: accent }}>DIAG</span></span>
    </div>
  );
}

function Pill({ children, color = T.coralSoft, fg = T.coralDeep, mono }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
      background: color, color: fg, padding: '4px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.2,
      textTransform: mono ? 'none' : 'uppercase',
      fontFamily: mono ? '"JetBrains Mono", monospace' : 'inherit' }}>{children}</span>
  );
}

function Btn({ children, onClick, variant = 'primary', full, disabled }) {
  const base = { height: 56, padding: '0 20px', borderRadius: 16,
    fontFamily: '"Manrope", system-ui', fontWeight: 700, fontSize: 16,
    letterSpacing: -0.2, cursor: 'pointer', border: 'none',
    width: full ? '100%' : 'auto',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    opacity: disabled ? 0.4 : 1 };
  const styles = {
    primary: { background: T.ink, color: '#fff' },
    coral: { background: T.coral, color: '#fff' },
    ghost: { background: 'transparent', color: T.ink, border: `1.5px solid ${T.hairline}` },
  };
  return <button onClick={disabled ? null : onClick} style={{ ...base, ...styles[variant] }}>{children}</button>;
}

function Field({ label, value, focused }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: T.muted,
        textTransform: 'uppercase', letterSpacing: 0.4,
        fontFamily: '"JetBrains Mono", monospace' }}>{label}</label>
      <div style={{ height: 50, padding: '0 16px',
        border: `1.5px solid ${focused ? T.coral : T.hairline}`,
        borderRadius: 14, background: T.paper,
        display: 'flex', alignItems: 'center',
        fontFamily: '"Manrope", system-ui', fontSize: 15, color: T.text }}>{value}</div>
    </div>
  );
}

function PageHeader({ title, sub, back, onBack }) {
  return (
    <div style={{ padding: '62px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
      {back && (
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 12,
          border: `1.5px solid ${T.hairline}`, background: T.paper, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke={T.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700,
          fontSize: 24, letterSpacing: -0.5, color: T.ink, lineHeight: 1.1 }}>{title}</div>
        {sub && <div style={{ color: T.muted, fontSize: 13, marginTop: 4, fontFamily: '"Manrope", system-ui' }}>{sub}</div>}
      </div>
    </div>
  );
}

function StepDots({ current, total }) {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '0 20px 8px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2,
          background: i <= current ? T.coral : T.hairline }} />
      ))}
    </div>
  );
}

const CATEGORIES = [
  { id: 'lact', label: 'Lechón lactante', range: '0 – 21 días', icon: '◐' },
  { id: 'pre', label: 'Precebo', range: '22 – 70 días', icon: '◑' },
  { id: 'ceba', label: 'Ceba / engorde', range: '71 – 180 días', icon: '●' },
  { id: 'hem', label: 'Hembra reproductora', range: 'Adulto', icon: '♀' },
  { id: 'mac', label: 'Macho reproductor', range: 'Adulto', icon: '♂' },
];

const SYSTEMS = [
  { id: 'resp', label: 'Respiratorio', count: 24, hue: '#5BA8E8' },
  { id: 'dig', label: 'Digestivo', count: 31, hue: '#E8945B' },
  { id: 'rep', label: 'Reproductivo', count: 18, hue: '#C95B8E' },
  { id: 'ner', label: 'Nervioso', count: 12, hue: '#8E5BC9' },
  { id: 'loc', label: 'Locomotor', count: 14, hue: '#5BC9A0' },
  { id: 'piel', label: 'Piel', count: 16, hue: '#C9B05B' },
];

const SYMPTOMS_RESP = [
  { id: 'tos', label: 'Tos seca persistente' },
  { id: 'estornudos', label: 'Estornudos frecuentes' },
  { id: 'disnea', label: 'Dificultad respiratoria' },
  { id: 'secrecion', label: 'Secreción nasal' },
  { id: 'fiebre', label: 'Fiebre (>40 °C)' },
  { id: 'apatia', label: 'Decaimiento general' },
  { id: 'cianosis', label: 'Cianosis en orejas' },
];

const RESULTS = [
  { id: 'app', name: 'Pleuroneumonía (APP)', match: 87,
    agent: 'Actinobacillus pleuropneumoniae', risk: 'Alto', riskColor: T.coral,
    blurb: 'Compatible con cuadro respiratorio agudo en precebo. Mortalidad rápida sin tratamiento.',
    actions: ['Aislar lote afectado', 'Notificar al MVZ a cargo', 'Toma de muestras BAL'] },
  { id: 'mh', name: 'Mycoplasma hyopneumoniae', match: 64,
    agent: 'M. hyopneumoniae', risk: 'Medio', riskColor: T.warn,
    blurb: 'Tos crónica seca, baja conversión.',
    actions: ['Revisar ventilación', 'Verificar plan vacunal', 'Confirmar por PCR'] },
  { id: 'prrs', name: 'PRRS', match: 41,
    agent: 'Virus PRRSv', risk: 'Medio', riskColor: T.warn,
    blurb: 'Sintomatología compatible pero requiere correlación reproductiva.',
    actions: ['Revisar registros reproductivos', 'Serología', 'Bioseguridad'] },
];

function Splash({ go }) {
  return (
    <div style={{ height: '100%', background: T.cream,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
      padding: '120px 24px 48px', textAlign: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Mark size={88} color={T.coral} />
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
          fontSize: 48, fontWeight: 700, letterSpacing: -1.5,
          color: T.ink, marginTop: 28, lineHeight: 1 }}>
          CENI<span style={{ color: T.coral }}>DIAG</span>
        </div>
        <div style={{ fontFamily: '"Manrope", system-ui',
          fontSize: 17, color: T.muted, marginTop: 16, lineHeight: 1.4, maxWidth: 280 }}>
          Apoyo al diagnóstico clínico para porcicultores en campo
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn variant="coral" full onClick={() => go('onboard')}>Comenzar</Btn>
        <button onClick={() => go('login')} style={{ background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: '"Manrope", system-ui', fontSize: 15, color: T.ink, fontWeight: 600, padding: 12 }}>Ya tengo cuenta</button>
        <div style={{ marginTop: 8, fontSize: 11, color: T.muted, fontFamily: '"JetBrains Mono", monospace' }}>
          v1.0 · MATRIZ CLÍNICA v2.4 · 234 SÍNTOMAS
        </div>
      </div>
    </div>
  );
}

function Onboard({ go }) {
  const [i, setI] = useState(0);
  const slides = [
    { title: 'Funciona sin internet', body: 'Diseñada para zonas rurales. Toda la matriz clínica está descargada en tu dispositivo.' },
    { title: 'Basado en evidencia', body: 'Matriz clínica validada por el equipo técnico. Lógica determinística, sin IA.' },
    { title: 'Resultado orientativo', body: 'Te sugiere posibles enfermedades para que consultes con tu MVZ.' },
  ];
  const s = slides[i];
  return (
    <div style={{ height: '100%', background: T.paper,
      display: 'flex', flexDirection: 'column', padding: '80px 24px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 60 }}>
        <Wordmark/>
        <button onClick={() => go('signup')} style={{ background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: '"Manrope", system-ui', fontSize: 14, color: T.muted, fontWeight: 600 }}>Saltar</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, borderRadius: 32, background: T.cream,
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          <Mark size={64} color={T.coral}/>
        </div>
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
          fontSize: 32, fontWeight: 700, letterSpacing: -0.8,
          color: T.ink, marginBottom: 16, lineHeight: 1.1 }}>{s.title}</div>
        <div style={{ fontFamily: '"Manrope", system-ui',
          fontSize: 16, color: T.muted, lineHeight: 1.5, maxWidth: 300 }}>{s.body}</div>
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 24 }}>
        {slides.map((_, j) => (
          <div key={j} style={{ width: i === j ? 24 : 6, height: 6, borderRadius: 4,
            background: i === j ? T.coral : T.hairline, transition: 'all .25s' }}/>
        ))}
      </div>
      <Btn variant="coral" full onClick={() => i < 2 ? setI(i + 1) : go('signup')}>
        {i < 2 ? 'Siguiente' : 'Crear cuenta'}
      </Btn>
    </div>
  );
}

function Signup({ go }) {
  const fields = [
    { label: 'NOMBRE COMPLETO', value: 'Daniel Carrera Vargas' },
    { label: 'CÉDULA', value: '1.020.785.412' },
    { label: 'CELULAR', value: '+57 320 420 9061' },
    { label: 'NOMBRE DE LA GRANJA', value: 'Granja Porcícola Los Andes' },
    { label: 'DEPARTAMENTO / MUNICIPIO', value: 'Cundinamarca · Funza' },
    { label: 'TAMAÑO (CABEZAS)', value: '1 200 animales' },
  ];
  return (
    <div style={{ height: '100%', background: T.paper, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Registra tu granja" sub="Estos datos alimentan la base nacional de consultas" back onBack={() => go('onboard')}/>
      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto' }}>
        {fields.map((f, i) => <Field key={i} {...f} focused={i === 4}/>)}
        <div style={{ marginTop: 4, padding: 14, borderRadius: 14, background: T.cream,
          display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: T.coral, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
            <svg width="11" height="9" viewBox="0 0 11 9"><path d="M1 4l3 3 6-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          </div>
          <div style={{ fontSize: 12, color: T.text, lineHeight: 1.4, fontFamily: '"Manrope", system-ui' }}>
            Acepto el tratamiento de datos según Ley 1581/2012.
          </div>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <Btn variant="coral" full onClick={() => go('home')}>Crear cuenta</Btn>
      </div>
    </div>
  );
}

function TabBar({ active, go }) {
  const tabs = [
    { id: 'home', label: 'Inicio', target: 'home' },
    { id: 'history', label: 'Historial', target: 'history' },
    { id: 'diag', label: 'Nuevo', target: 'diag1', main: true },
    { id: 'matrix', label: 'Matriz', target: 'matrix' },
    { id: 'profile', label: 'Perfil', target: 'profile' },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '8px 12px 32px', background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)', borderTop: `1px solid ${T.hairline}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {tabs.map(t => {
        if (t.main) {
          return (
            <button key={t.id} onClick={() => go(t.target)} style={{
              width: 56, height: 56, borderRadius: 99, background: T.coral, color: '#fff',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(246,82,117,0.35)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 4v14M4 11h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </button>
          );
        }
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => go(t.target)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: on ? T.ink : T.muted, padding: 8,
            fontFamily: '"Manrope", system-ui', fontSize: 11, fontWeight: on ? 700 : 500 }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: on ? T.coral : 'transparent' }}/>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function Stat({ n, l, badge }) {
  return (
    <div style={{ background: T.paper, borderRadius: 18, padding: 16,
      display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
        fontSize: 32, fontWeight: 700, color: T.ink, lineHeight: 1, letterSpacing: -1 }}>{n}</div>
      <div style={{ fontSize: 12, color: T.muted, marginTop: 6, fontFamily: '"Manrope", system-ui' }}>{l}</div>
      {badge && <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: 99, background: T.coral }}/>}
    </div>
  );
}

function Home({ go }) {
  return (
    <div style={{ height: '100%', background: T.cream, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Wordmark/>
        <div onClick={() => go('profile')} style={{ width: 38, height: 38, borderRadius: 99,
          background: T.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>DC</div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 20px 100px' }}>
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700,
          fontSize: 28, lineHeight: 1.15, letterSpacing: -0.6, color: T.ink }}>
          Buenas tardes, Daniel.
        </div>
        <div style={{ color: T.muted, fontSize: 14, marginTop: 4, fontFamily: '"Manrope", system-ui' }}>
          Granja Los Andes · Funza, Cundinamarca
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <Pill color="#E7F4EC" fg={T.ok}>● SIN CONEXIÓN</Pill>
          <Pill color={T.cream} fg={T.muted} mono>MATRIZ v2.4</Pill>
        </div>
        <button onClick={() => go('diag1')} style={{
          marginTop: 20, width: '100%', textAlign: 'left',
          background: T.ink, color: '#fff', border: 'none', cursor: 'pointer',
          padding: 24, borderRadius: 24, position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'absolute', right: -30, top: -30, opacity: 0.12 }}>
            <Mark size={180} color="#fff"/>
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            letterSpacing: 1, color: T.coral, fontWeight: 600 }}>NUEVO DIAGNÓSTICO</div>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontSize: 26,
            fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.1, maxWidth: 240 }}>¿Qué le pasa a tu animal?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4,
            fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: '"Manrope", system-ui' }}>
            Toma 2 minutos. Funciona sin señal.
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginLeft: 'auto' }}><path d="M2 7h10m0 0L7 2m5 5l-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
          </div>
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          <Stat n="14" l="Consultas este mes" />
          <Stat n="3" l="Pendientes de envío" badge/>
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          letterSpacing: 0.8, color: T.muted, marginTop: 24, marginBottom: 8, fontWeight: 600 }}>CONSULTAS RECIENTES</div>
        <div style={{ background: T.paper, borderRadius: 18, overflow: 'hidden' }}>
          {[
            { d: 'Hoy · 14:32', t: 'Lote 14 — Precebo', dx: 'Sospecha APP', risk: 'Alto', riskC: T.coral, sync: false },
            { d: 'Ayer · 09:15', t: 'Lote 09 — Ceba', dx: 'Mycoplasma hyo.', risk: 'Medio', riskC: T.warn, sync: false },
            { d: '03 May · 16:40', t: 'Galpón 3 — Lechones', dx: 'Diarrea neonatal', risk: 'Medio', riskC: T.warn, sync: true },
          ].map((r, i, arr) => (
            <div key={i} onClick={() => go('result')} style={{
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              borderBottom: i < arr.length - 1 ? `1px solid ${T.hairline}` : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: T.muted, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 0.3 }}>{r.d}</div>
                <div style={{ fontFamily: '"Manrope", system-ui', fontSize: 15, fontWeight: 600, color: T.ink, marginTop: 2 }}>{r.t}</div>
                <div style={{ fontSize: 13, color: T.muted, fontFamily: '"Manrope", system-ui', marginTop: 2 }}>{r.dx}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <Pill color={`${r.riskC}1A`} fg={r.riskC}>{r.risk}</Pill>
                {!r.sync && <span style={{ fontSize: 10, color: T.muted, fontFamily: '"JetBrains Mono", monospace' }}>↑ pend.</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="home" go={go}/>
    </div>
  );
}

function Diag1({ go, state, set }) {
  return (
    <div style={{ height: '100%', background: T.paper, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Categoría animal" sub="Paso 1 de 3" back onBack={() => go('home')}/>
      <StepDots current={0} total={3}/>
      <div style={{ flex: 1, padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'auto' }}>
        {CATEGORIES.map(c => {
          const sel = state.cat === c.id;
          return (
            <button key={c.id} onClick={() => set({ cat: c.id })} style={{
              padding: 18, borderRadius: 18, cursor: 'pointer',
              border: `2px solid ${sel ? T.coral : T.hairline}`,
              background: sel ? T.coralSoft : T.paper,
              display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12,
                background: sel ? T.coral : T.cream, color: sel ? '#fff' : T.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontFamily: '"Bricolage Grotesque", system-ui' }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Manrope", system-ui', fontWeight: 700, fontSize: 16, color: T.ink }}>{c.label}</div>
                <div style={{ fontSize: 12, color: T.muted, fontFamily: '"JetBrains Mono", monospace', marginTop: 2 }}>{c.range}</div>
              </div>
              {sel && (
                <div style={{ width: 24, height: 24, borderRadius: 99, background: T.coral, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="10" viewBox="0 0 12 10"><path d="M1 5l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ padding: 20 }}>
        <Btn variant="coral" full disabled={!state.cat} onClick={() => go('diag2')}>Continuar</Btn>
      </div>
    </div>
  );
}

function Diag2({ go, state, set }) {
  const toggle = (id) => {
    const next = state.systems.includes(id)
      ? state.systems.filter(x => x !== id) : [...state.systems, id];
    set({ systems: next });
  };
  return (
    <div style={{ height: '100%', background: T.paper, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Sistema afectado" sub="Selecciona uno o varios" back onBack={() => go('diag1')}/>
      <StepDots current={1} total={3}/>
      <div style={{ flex: 1, padding: '12px 20px', overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {SYSTEMS.map(s => {
            const sel = state.systems.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggle(s.id)} style={{
                padding: 16, borderRadius: 18, cursor: 'pointer',
                border: `2px solid ${sel ? T.coral : T.hairline}`,
                background: sel ? T.coralSoft : T.paper,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
                aspectRatio: '1 / 0.95', textAlign: 'left' }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: s.hue }}/>
                <div style={{ fontFamily: '"Manrope", system-ui', fontWeight: 700, fontSize: 15, color: T.ink, lineHeight: 1.1 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: T.muted, fontFamily: '"JetBrains Mono", monospace', marginTop: 'auto' }}>{s.count} síntomas</div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <Btn variant="coral" full disabled={!state.systems.length} onClick={() => go('diag3')}>
          Continuar {state.systems.length > 0 && `(${state.systems.length})`}
        </Btn>
      </div>
    </div>
  );
}

function Diag3({ go, state, set }) {
  const list = SYMPTOMS_RESP;
  const toggle = (id) => {
    const next = state.symptoms.includes(id)
      ? state.symptoms.filter(x => x !== id) : [...state.symptoms, id];
    set({ symptoms: next });
  };
  return (
    <div style={{ height: '100%', background: T.paper, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Síntomas observados" sub="Marca todo lo que aplique" back onBack={() => go('diag2')}/>
      <StepDots current={2} total={3}/>
      <div style={{ flex: 1, padding: '8px 20px', overflow: 'auto' }}>
        <div style={{ background: T.cream, borderRadius: 14, padding: 12, marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#5BA8E8' }}/>
          <div style={{ fontFamily: '"Manrope", system-ui', fontSize: 13, color: T.text, lineHeight: 1.3 }}>
            <strong>Sistema respiratorio</strong> · {list.length} síntomas disponibles
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map(s => {
            const sel = state.symptoms.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggle(s.id)} style={{
                padding: '14px 16px', borderRadius: 14, cursor: 'pointer',
                border: `1.5px solid ${sel ? T.coral : T.hairline}`,
                background: sel ? T.coralSoft : T.paper,
                display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6,
                  border: `2px solid ${sel ? T.coral : T.hairline}`,
                  background: sel ? T.coral : T.paper,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {sel && <svg width="11" height="9" viewBox="0 0 11 9"><path d="M1 4l3 3 6-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
                </div>
                <div style={{ flex: 1, fontFamily: '"Manrope", system-ui', fontSize: 15, color: T.ink, fontWeight: sel ? 600 : 500 }}>{s.label}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <Btn variant="coral" full disabled={!state.symptoms.length} onClick={() => go('result')}>
          Analizar matriz {state.symptoms.length > 0 && `· ${state.symptoms.length}`}
        </Btn>
      </div>
    </div>
  );
}

function ResultCard({ r, primary }) {
  return (
    <div style={{ background: primary ? T.ink : T.paper, color: primary ? '#fff' : T.ink,
      borderRadius: 22, padding: primary ? 22 : 18, marginBottom: 10,
      border: primary ? 'none' : `1px solid ${T.hairline}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Pill color={primary ? 'rgba(255,255,255,0.12)' : `${r.riskColor}1A`} fg={primary ? '#fff' : r.riskColor}>
            RIESGO {r.risk.toUpperCase()}
          </Pill>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
            fontSize: primary ? 24 : 18, fontWeight: 700, letterSpacing: -0.5,
            marginTop: 10, lineHeight: 1.1 }}>{r.name}</div>
          <div style={{ fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
            color: primary ? 'rgba(255,255,255,0.6)' : T.muted, marginTop: 4, fontStyle: 'italic' }}>{r.agent}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
            fontSize: primary ? 44 : 32, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1,
            color: primary ? T.coral : T.ink }}>{r.match}<span style={{ fontSize: 16, fontWeight: 500, color: primary ? 'rgba(255,255,255,0.5)' : T.muted }}>%</span></div>
          <div style={{ fontSize: 10, color: primary ? 'rgba(255,255,255,0.5)' : T.muted, fontFamily: '"JetBrains Mono", monospace', marginTop: 2 }}>match</div>
        </div>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: primary ? 'rgba(255,255,255,0.1)' : T.hairline,
        marginTop: 14, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${r.match}%`, background: T.coral, borderRadius: 99 }}/>
      </div>
      {primary && (
        <>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 14, lineHeight: 1.5, fontFamily: '"Manrope", system-ui' }}>{r.blurb}</div>
          <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1, color: T.coral, fontWeight: 600 }}>ACCIONES SUGERIDAS</div>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {r.actions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, fontFamily: '"Manrope", system-ui' }}>
                  <span style={{ color: T.coral, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ color: 'rgba(255,255,255,0.92)' }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Result({ go }) {
  return (
    <div style={{ height: '100%', background: T.cream, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Resultado orientativo" sub="Matriz clínica v2.4" back onBack={() => go('home')}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 110px' }}>
        <div style={{ padding: 14, borderRadius: 14, background: '#FFF3D6', display: 'flex', gap: 10,
          alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ width: 22, height: 22, borderRadius: 99, background: T.warn, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 14 }}>!</div>
          <div style={{ fontSize: 12, color: T.text, lineHeight: 1.4, fontFamily: '"Manrope", system-ui' }}>
            Resultado <strong>orientativo</strong>. No reemplaza la valoración del MVZ.
          </div>
        </div>
        <ResultCard r={RESULTS[0]} primary/>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          letterSpacing: 0.8, color: T.muted, margin: '20px 0 8px', fontWeight: 600 }}>OTRAS COINCIDENCIAS</div>
        {RESULTS.slice(1).map(r => <ResultCard key={r.id} r={r}/>)}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 32px',
        background: 'linear-gradient(to top, rgba(250,246,242,1) 60%, rgba(250,246,242,0))',
        display: 'flex', gap: 10 }}>
        <Btn variant="ghost" onClick={() => go('home')}>Guardar</Btn>
        <Btn variant="coral" full onClick={() => go('home')}>Compartir con MVZ</Btn>
      </div>
    </div>
  );
}

function History({ go }) {
  const items = [
    { d: 'HOY', t: '14:32', lote: 'Lote 14 — Precebo (45d)', dx: 'Pleuroneumonía (APP)', m: 87, riskC: T.coral, sync: false },
    { d: 'HOY', t: '11:08', lote: 'Lote 14 — Precebo (45d)', dx: 'Sin coincidencias', m: 0, riskC: T.muted, sync: false },
    { d: 'AYER', t: '09:15', lote: 'Lote 09 — Ceba (110d)', dx: 'Mycoplasma hyopneumoniae', m: 64, riskC: T.warn, sync: false },
    { d: '03 MAY', t: '16:40', lote: 'Galpón 3 — Lechones (12d)', dx: 'Diarrea neonatal', m: 71, riskC: T.warn, sync: true },
    { d: '01 MAY', t: '08:22', lote: 'Lote 08 — Ceba (130d)', dx: 'Erisipela porcina', m: 58, riskC: T.warn, sync: true },
    { d: '28 ABR', t: '17:01', lote: 'Hembras G2', dx: 'PRRS', m: 62, riskC: T.warn, sync: true },
  ];
  return (
    <div style={{ height: '100%', background: T.paper, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Historial" sub="Tus consultas en este dispositivo"/>
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8 }}>
        <Pill color={T.ink} fg="#fff">TODAS · 47</Pill>
        <Pill>PENDIENTES · 3</Pill>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 100px' }}>
        {items.map((it, i, arr) => {
          const showHeader = i === 0 || arr[i - 1].d !== it.d;
          return (
            <React.Fragment key={i}>
              {showHeader && (
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                  letterSpacing: 0.8, color: T.muted, marginTop: i === 0 ? 4 : 18,
                  marginBottom: 8, fontWeight: 600 }}>— {it.d}</div>
              )}
              <button onClick={() => go('result')} style={{
                width: '100%', background: T.paper, border: `1px solid ${T.hairline}`,
                borderRadius: 14, padding: 14, marginBottom: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: T.muted, width: 42 }}>{it.t}</div>
                <div style={{ width: 1, height: 36, background: T.hairline }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Manrope", system-ui', fontSize: 14, fontWeight: 600, color: T.ink }}>{it.dx}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{it.lote}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  {it.m > 0 ? (
                    <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 18, color: it.riskC }}>{it.m}%</div>
                  ) : (
                    <div style={{ fontSize: 11, color: T.muted, fontFamily: '"JetBrains Mono", monospace' }}>—</div>
                  )}
                  {!it.sync && <div style={{ width: 6, height: 6, borderRadius: 99, background: T.coral }}/>}
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>
      <TabBar active="history" go={go}/>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1, color: 'rgba(255,255,255,0.5)' }}>{k}</div>
      <div style={{ fontFamily: '"Manrope", system-ui', fontSize: 14, fontWeight: 600 }}>{v}</div>
    </div>
  );
}
function SectionLabel({ children }) {
  return <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
    letterSpacing: 0.8, color: T.muted, marginTop: 22, marginBottom: 8, fontWeight: 600 }}>{children}</div>;
}
function ProfRow({ t, sub, right, last }) {
  return (
    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
      borderBottom: last ? 'none' : `1px solid ${T.hairline}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: '"Manrope", system-ui', fontSize: 15, fontWeight: 600, color: T.ink }}>{t}</div>
        {sub && <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      {right || <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={T.muted} strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
    </div>
  );
}

function Profile({ go }) {
  return (
    <div style={{ height: '100%', background: T.cream, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Mi cuenta" back onBack={() => go('home')}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 100px' }}>
        <div style={{ background: T.ink, borderRadius: 22, padding: 20, color: '#fff',
          display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 99, background: T.coral, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 22 }}>DC</div>
            <div>
              <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 20 }}>Daniel Carrera</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Encargado técnico</div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }}/>
          <Row k="GRANJA" v="Los Andes"/>
          <Row k="UBICACIÓN" v="Funza, Cundinamarca"/>
          <Row k="TAMAÑO" v="1 200 cabezas"/>
        </div>
        <SectionLabel>SINCRONIZACIÓN</SectionLabel>
        <div style={{ background: T.paper, borderRadius: 18, overflow: 'hidden' }}>
          <ProfRow t="Subir consultas pendientes" sub="3 consultas sin enviar" right={<Pill>3</Pill>}/>
          <ProfRow t="Última sincronización" sub="Hoy · 11:42" right={<span style={{ fontSize: 12, color: T.ok, fontFamily: '"JetBrains Mono", monospace' }}>OK</span>}/>
          <ProfRow t="Matriz clínica" sub="v2.4 · 15 mar 2026" last/>
        </div>
        <SectionLabel>SOPORTE</SectionLabel>
        <div style={{ background: T.paper, borderRadius: 18, overflow: 'hidden' }}>
          <ProfRow t="Manual del usuario"/>
          <ProfRow t="Contactar soporte"/>
          <ProfRow t="Términos y privacidad" last/>
        </div>
      </div>
      <TabBar active="profile" go={go}/>
    </div>
  );
}

function Matrix({ go }) {
  const rows = [
    { c: '01', name: 'Pleuroneumonía (APP)', agent: 'A. pleuropneumoniae', sys: 'Resp', cat: 'PRE/CEBA', sx: 8 },
    { c: '02', name: 'Mycoplasma hyo.', agent: 'M. hyopneumoniae', sys: 'Resp', cat: 'CEBA', sx: 6 },
    { c: '03', name: 'PRRS', agent: 'PRRSv', sys: 'Resp/Rep', cat: 'TODOS', sx: 12 },
    { c: '04', name: 'Influenza porcina', agent: 'IAV-S', sys: 'Resp', cat: 'TODOS', sx: 7 },
    { c: '05', name: 'Pasteurelosis', agent: 'P. multocida', sys: 'Resp', cat: 'PRE/CEBA', sx: 5 },
    { c: '06', name: 'Diarrea neonatal', agent: 'E. coli K88', sys: 'Dig', cat: 'LACT', sx: 4 },
    { c: '07', name: 'Disentería', agent: 'B. hyodysenteriae', sys: 'Dig', cat: 'CEBA', sx: 6 },
    { c: '08', name: 'Erisipela', agent: 'E. rhusiopathiae', sys: 'Sis', cat: 'TODOS', sx: 9 },
    { c: '09', name: 'Circovirus PCV2', agent: 'PCV2', sys: 'Sis', cat: 'PRE/CEBA', sx: 11 },
  ];
  return (
    <div style={{ height: '100%', background: T.paper, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Matriz clínica" sub="v2.4 — 23 enfermedades · 234 síntomas"/>
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Pill color={T.ink} fg="#fff">TODAS</Pill>
        <Pill>RESPIRATORIO</Pill>
        <Pill>DIGESTIVO</Pill>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 100px' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ padding: 14, borderBottom: `1px solid ${T.hairline}`,
            display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: T.muted, width: 24 }}>{r.c}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Manrope", system-ui', fontSize: 15, fontWeight: 600, color: T.ink }}>{r.name}</div>
              <div style={{ fontSize: 11, color: T.muted, fontStyle: 'italic', fontFamily: '"Manrope", system-ui', marginTop: 2 }}>{r.agent}</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                <Pill color={T.cream} fg={T.muted}>{r.sys}</Pill>
                <Pill color={T.cream} fg={T.muted}>{r.cat}</Pill>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontSize: 18, fontWeight: 700, color: T.ink }}>{r.sx}</div>
              <div style={{ fontSize: 9, color: T.muted, fontFamily: '"JetBrains Mono", monospace' }}>SÍNT.</div>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="matrix" go={go}/>
    </div>
  );
}

const SCREENS = {
  splash: Splash, onboard: Onboard, signup: Signup, login: Signup,
  home: Home, diag1: Diag1, diag2: Diag2, diag3: Diag3,
  result: Result, history: History, profile: Profile, matrix: Matrix,
};

const ORB_SCREENS = new Set(['home', 'history', 'matrix', 'profile']);

export function PhoneApp({ initial = 'splash' }) {
  const [screen, setScreen] = useState(initial);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [state, setStateRaw] = useState({ cat: null, systems: [], symptoms: [] });
  const set = (patch) => setStateRaw(s => ({ ...s, ...patch }));
  const Comp = SCREENS[screen] || Splash;
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Comp go={setScreen} state={state} set={set}/>
      {ORB_SCREENS.has(screen) && (
        <div style={{ position: 'absolute', right: 16, bottom: 106, zIndex: 40 }}>
          <AIOrb label="IA diagnóstica" compact onClick={() => setAssistantOpen(true)} />
        </div>
      )}
      {assistantOpen && <AssistantSheet onClose={() => setAssistantOpen(false)} />}
    </div>
  );
}

function AssistantSheet({ onClose }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70,
      background: 'rgba(26,23,21,0.18)', display: 'flex', alignItems: 'flex-end' }}>
      <button type="button" aria-label="Cerrar asistente" onClick={onClose}
        style={{ position: 'absolute', inset: 0, border: 'none', background: 'transparent' }} />
      <div style={{ position: 'relative', width: '100%', maxHeight: '72%', overflow: 'auto',
        background: T.paper, borderRadius: '28px 28px 0 0', padding: '18px 20px 34px',
        boxShadow: '0 -24px 70px rgba(26,23,21,0.2)' }}>
        <div style={{ width: 44, height: 4, borderRadius: 999, background: T.hairline,
          margin: '0 auto 16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AIOrb compact label="IA diagnóstica" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
              fontSize: 24, fontWeight: 700, color: T.ink, letterSpacing: -0.5 }}>Asistente IA</div>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Matriz, historial y reportes</div>
          </div>
          <button type="button" onClick={onClose} style={{ width: 36, height: 36,
            borderRadius: 12, border: `1px solid ${T.hairline}`, background: T.paper,
            color: T.ink, cursor: 'pointer', fontWeight: 700 }}>×</button>
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { who: 'ia', text: 'Puedo interpretar un diagnóstico, revisar patrones de uso o preparar el resumen mensual.' },
            { who: 'user', text: 'Resume las consultas respiratorias de este mes.' },
            { who: 'ia', text: 'Hay 14 consultas. Respiratorio concentra el 57%. Hay 3 pendientes de envío y dos granjas repiten signos compatibles con APP.' },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.who === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '82%', padding: '11px 13px', borderRadius: 16,
                background: m.who === 'user' ? T.ink : T.cream,
                color: m.who === 'user' ? '#fff' : T.text,
                fontSize: 13, lineHeight: 1.45 }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {['Analizar caso', 'Resumen mensual', 'Alertas de uso', 'Ver pendientes'].map((action) => (
            <button key={action} type="button" style={{ height: 42, borderRadius: 12,
              border: `1px solid ${T.hairline}`, background: T.paper, color: T.ink,
              fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { T, Mark, Wordmark, SCREENS };
