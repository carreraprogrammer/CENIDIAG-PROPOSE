
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { IOSDevice } from './ios-frame.jsx';
import { PhoneApp } from './app.jsx';
import { AdminPanel } from './admin.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#F65275",
  "showAdmin": true,
  "view": "phone"
}/*EDITMODE-END*/;

const ACCESS_CODE = '1085333083';
const DOCUMENTS_URL = '/docs/CP-0008-CENIDIAG-PAQUETE.zip';

const SCREEN_LIST = [
  { id: 'splash',  label: '01 · Splash' },
  { id: 'onboard', label: '02 · Onboarding' },
  { id: 'signup',  label: '03 · Registro' },
  { id: 'home',    label: '04 · Inicio' },
  { id: 'diag1',   label: '05 · Categoría' },
  { id: 'diag2',   label: '06 · Sistema' },
  { id: 'diag3',   label: '07 · Síntomas' },
  { id: 'result',  label: '08 · Resultado' },
  { id: 'history', label: '09 · Historial' },
  { id: 'matrix',  label: '10 · Matriz' },
  { id: 'profile', label: '11 · Perfil' },
];

function DownloadLink({ href, children, dark = false, variant = 'secondary', sub }) {
  const primary = variant === 'primary';
  return (
    <a
      href={href}
      download
      style={{
        minHeight: primary ? 74 : 60,
        padding: primary ? '14px 18px' : '12px 16px',
        borderRadius: 16,
        border: primary
          ? '1px solid #F65275'
          : (dark ? '1px solid rgba(255,255,255,0.16)' : '1px solid #EDE7E2'),
        background: primary
          ? '#F65275'
          : (dark ? 'rgba(255,255,255,0.06)' : '#fff'),
        color: primary ? '#fff' : (dark ? '#fff' : '#1A1715'),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        textDecoration: 'none',
        fontFamily: '"Manrope", system-ui',
        fontSize: primary ? 15 : 14,
        fontWeight: 700,
        width: '100%',
        boxShadow: primary ? '0 18px 36px rgba(246,82,117,0.24)' : 'none',
      }}
    >
      <span>
        <span style={{ display: 'block' }}>{children}</span>
        {sub && <span style={{
          display: 'block',
          marginTop: 3,
          color: primary ? 'rgba(255,255,255,0.72)' : (dark ? 'rgba(255,255,255,0.48)' : '#7A6E68'),
          fontSize: 11,
          fontWeight: 600,
        }}>{sub}</span>}
      </span>
      <span style={{
        width: 34,
        height: 34,
        borderRadius: 12,
        background: primary ? 'rgba(255,255,255,0.16)' : '#FFE4EA',
        color: primary ? '#fff' : '#F65275',
        fontFamily: '"JetBrains Mono", monospace',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>↓</span>
    </a>
  );
}

function useScrollReveal(active) {
  useEffect(() => {
    if (!active) return undefined;

    const items = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [active]);
}

function usePastHero(active) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!active) return undefined;

    const onScroll = () => {
      setPastHero(window.scrollY > Math.min(window.innerHeight * 0.82, 760));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);

  return pastHero;
}

function Cover() {
  return (
    <header style={{
      maxWidth: 1280, margin: '0 auto', padding: '64px 40px 32px',
      position: 'relative', zIndex: 2,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px' }}>
          <div data-reveal style={{ display: 'inline-flex', alignItems: 'center', gap: 12,
            background: '#fff', padding: '8px 14px', borderRadius: 999,
            border: '1px solid #EDE7E2',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 600,
            color: '#7A6E68', letterSpacing: 1, marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#F65275' }}/>
            PROPUESTA · 08 MAY 2026 · PORKCOLOMBIA × CARRERA
          </div>
          <div data-reveal style={{ fontFamily: '"Bricolage Grotesque", system-ui',
            fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: -3,
            lineHeight: 0.92, color: '#1A1715' }}>
            Diagnóstico clínico<br/>
            <span style={{ color: '#F65275' }}>en el bolsillo</span> de cada<br/>
            porcicultor de Colombia.
          </div>
          <div data-reveal style={{ marginTop: 24, fontSize: 18, color: '#7A6E68', maxWidth: 620, lineHeight: 1.5 }}>
            <strong style={{ color: '#1A1715' }}>CENIDIAG</strong> es la app móvil que convierte una matriz clínica veterinaria en una herramienta de campo: funciona <strong style={{ color: '#1A1715' }}>sin internet</strong>, registra cada granja en una <strong style={{ color: '#1A1715' }}>base de datos nacional</strong> y entrega un diagnóstico <strong style={{ color: '#1A1715' }}>orientativo</strong> en menos de 2 minutos.
          </div>
        </div>
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 280 }}>
          {[
            { k: 'Para', v: 'Equipo Porkcolombia', sub: '' },
            { k: 'Proyecto', v: 'Tecnología móvil para diagnóstico veterinario', sub: 'Porkcolombia' },
            { k: 'Referencia', v: 'E-diagnóstico 3tres3', sub: 'Mejorada para campo colombiano' },
          ].map((c, i) => (
            <div data-reveal key={i} style={{ '--reveal-delay': `${i * 80}ms`, background: '#fff', border: '1px solid #EDE7E2', borderRadius: 14, padding: 14 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                letterSpacing: 1, color: '#7A6E68', fontWeight: 600 }}>{c.k.toUpperCase()}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1715', marginTop: 4 }}>{c.v}</div>
              <div style={{ fontSize: 12, color: '#7A6E68', marginTop: 2 }}>{c.sub}</div>
            </div>
          ))}
          <div data-reveal style={{ '--reveal-delay': '260ms', marginTop: 4 }}>
            <DownloadLink href={DOCUMENTS_URL} variant="primary" sub="Cotización + anexo de mantenimiento">
              Descargar paquete CP-0008
            </DownloadLink>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {[
          { n: '01', t: 'Offline-first', b: 'Toda la matriz vive en el dispositivo. Funciona en zonas sin señal.' },
          { n: '02', t: 'Matriz determinística', b: 'Lógica estricta basada en una matriz clínica validada por el equipo técnico. Sin IA.' },
          { n: '03', t: 'Base de datos nacional', b: 'Registro consolidado de granjas, lotes y consultas.' },
          { n: '04', t: 'Panel administrativo', b: 'El equipo autorizado actualiza la matriz desde la web. Versionado automático.' },
          { n: '05', t: 'Multiplataforma', b: 'iOS + Android desde un solo código. Publicación en ambas tiendas.' },
        ].map((p, i) => (
          <div data-reveal key={i} style={{ '--reveal-delay': `${i * 70}ms`, background: '#fff', border: '1px solid #EDE7E2', borderRadius: 18, padding: 20 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
              letterSpacing: 1.5, color: '#F65275', fontWeight: 700 }}>{p.n}</div>
            <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
              fontSize: 19, fontWeight: 700, letterSpacing: -0.4, color: '#1A1715', marginTop: 12, lineHeight: 1.15 }}>{p.t}</div>
            <div style={{ fontSize: 13, color: '#7A6E68', marginTop: 8, lineHeight: 1.5 }}>{p.b}</div>
          </div>
        ))}
      </div>
    </header>
  );
}

function PhoneStage({ initial }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '12px 0',
    }}>
      <div style={{ position: 'relative' }}>
        <IOSDevice width={402} height={874}>
          <PhoneApp initial={initial}/>
        </IOSDevice>
      </div>
    </div>
  );
}

function ScreenLabel({ children }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
      letterSpacing: 1.5, color: '#7A6E68', fontWeight: 600,
      marginBottom: 12, textAlign: 'center',
    }}>{children}</div>
  );
}

function CanvasView() {
  return (
    <div style={{
      maxWidth: 1280, margin: '0 auto', padding: '20px 40px 40px',
      position: 'relative', zIndex: 2,
    }}>
      <SectionTitle eyebrow="11 PANTALLAS" title="Recorrido completo del usuario">
        Desde el primer registro de la granja hasta el resultado orientativo y el historial sincronizado.
      </SectionTitle>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 36, marginTop: 32,
      }}>
        {SCREEN_LIST.map(s => (
          <div data-reveal key={s.id}>
            <ScreenLabel>{s.label}</ScreenLabel>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ transform: 'scale(0.7)', transformOrigin: 'top center', marginBottom: -260 }}>
                <IOSDevice width={402} height={874}>
                  <PhoneApp initial={s.id}/>
                </IOSDevice>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div data-reveal style={{ maxWidth: 720 }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
        letterSpacing: 1.5, color: '#F65275', fontWeight: 700 }}>{eyebrow}</div>
      <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
        fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, letterSpacing: -1.2,
        color: '#1A1715', marginTop: 12, lineHeight: 1.05 }}>{title}</div>
      {children && <div style={{ fontSize: 17, color: '#7A6E68', marginTop: 14, lineHeight: 1.5 }}>{children}</div>}
    </div>
  );
}

function PrototypeSection() {
  const [initial, setInitial] = useState('splash');
  return (
    <section style={{ position: 'relative', zIndex: 2, padding: '40px 0 80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <SectionTitle eyebrow="PROTOTIPO INTERACTIVO" title="Tócalo. Funciona.">
          Esto no es un mockup. Es un prototipo navegable: empieza por el splash, registra una granja, completa un diagnóstico de tos respiratoria en un lote de precebos y revisa la matriz coincidente.
        </SectionTitle>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 300px',
        gap: 24, alignItems: 'start', maxWidth: 1280, margin: '32px auto 0', padding: '0 40px' }}>
        {/* Left: jump-to nav */}
        <div data-reveal style={{ background: '#fff', border: '1px solid #EDE7E2', borderRadius: 18,
          padding: 18, position: 'sticky', top: 24 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            letterSpacing: 1.5, color: '#7A6E68', fontWeight: 700, marginBottom: 12 }}>SALTAR A</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {SCREEN_LIST.map(s => (
              <button key={s.id} onClick={() => setInitial(s.id)} style={{
                background: initial === s.id ? '#FFE4EA' : 'transparent',
                color: initial === s.id ? '#D93E60' : '#1A1715',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                padding: '8px 10px', borderRadius: 8,
                fontFamily: '"Manrope", system-ui', fontSize: 13,
                fontWeight: initial === s.id ? 700 : 500,
              }}>{s.label}</button>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: 12, background: '#FAF6F2', borderRadius: 12,
            fontSize: 11, color: '#7A6E68', lineHeight: 1.5 }}>
            Esta lista solo cambia el punto de inicio. Una vez dentro de la app, puedes navegar libremente con los botones.
          </div>
        </div>

        {/* Center: phone */}
        <div data-reveal className="phone-reveal">
          <PhoneStage key={initial} initial={initial}/>
        </div>

        {/* Right: callouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 24 }}>
          {[
            { t: 'Sin conexión, garantizado', b: 'El indicador "● Sin conexión" en verde demuestra que la app sigue funcional. Toda la matriz está en el dispositivo.' },
            { t: '3 pasos · 2 minutos', b: 'Categoría animal → Sistema afectado → Síntomas. Botones grandes para uso con guantes en campo.' },
            { t: 'Resultado siempre orientativo', b: 'Banner ámbar permanente: nunca reemplaza al MVZ. Cumple lo que pidieron explícitamente.' },
            { t: 'Pendientes de envío', b: 'Las consultas hechas offline se marcan con punto rojo y suben automáticamente al recuperar señal.' },
          ].map((c, i) => (
            <div data-reveal key={i} style={{ '--reveal-delay': `${i * 90}ms`, background: '#fff', border: '1px solid #EDE7E2', borderRadius: 14, padding: 14 }}>
              <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
                fontWeight: 700, fontSize: 15, color: '#1A1715', letterSpacing: -0.2 }}>{c.t}</div>
              <div style={{ fontSize: 12, color: '#7A6E68', marginTop: 4, lineHeight: 1.5 }}>{c.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdminSection() {
  return (
    <section style={{ position: 'relative', zIndex: 2, padding: '40px 0 80px',
      background: '#1A1715', color: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 40px' }}>
        <div data-reveal style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            letterSpacing: 1.5, color: '#F65275', fontWeight: 700 }}>PANEL ADMINISTRATIVO WEB</div>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
            fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, letterSpacing: -1.2,
            color: '#fff', marginTop: 12, lineHeight: 1.05 }}>
            El equipo actualiza<br/>la matriz. La app se sincroniza sola.
          </div>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginTop: 14, lineHeight: 1.5 }}>
            Desde el navegador, el equipo autorizado sube el Excel, versiona la matriz y monitorea las granjas registradas, sin tocar código y sin depender de nosotros para cada ajuste.
          </div>
        </div>

        <div data-reveal style={{ marginTop: 40, height: 620, borderRadius: 18, overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Browser chrome */}
          <div style={{ height: 36, background: '#2A2522', display: 'flex',
            alignItems: 'center', padding: '0 14px', gap: 8 }}>
            <div style={{ width: 11, height: 11, borderRadius: 99, background: '#FF5F57' }}/>
            <div style={{ width: 11, height: 11, borderRadius: 99, background: '#FEBC2E' }}/>
            <div style={{ width: 11, height: 11, borderRadius: 99, background: '#28C840' }}/>
            <div style={{ marginLeft: 18, padding: '4px 14px', background: 'rgba(255,255,255,0.08)',
              borderRadius: 8, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
              color: 'rgba(255,255,255,0.6)' }}>admin.porkcolombia.co</div>
          </div>
          <div style={{ height: 'calc(100% - 36px)', background: '#FAF6F2' }}>
            <AdminPanel/>
          </div>
        </div>

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { t: 'Importación de Excel', b: 'Sube la matriz clínica aprobada por Porkcolombia. El sistema la transforma en lógica.' },
            { t: 'Versionado automático', b: 'Cada cambio crea una nueva versión. La app descarga la última al estar en línea.' },
            { t: 'Base de datos de usuarios', b: 'Listado consolidado de porcicultores: granja, ubicación, tamaño, frecuencia de uso.' },
            { t: 'Reportes nacionales', b: 'Mapas de calor por departamento, sistemas más consultados, tendencias.' },
          ].map((c, i) => (
            <div data-reveal key={i} style={{ '--reveal-delay': `${i * 90}ms`, background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
                fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: -0.3 }}>{c.t}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 6, lineHeight: 1.5 }}>{c.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIDifferentiatorSection() {
  return (
    <section style={{ position: 'relative', zIndex: 2, padding: '72px 0 88px',
      background: '#FAF6F2' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 0.85fr) minmax(420px, 1.15fr)',
          gap: 48, alignItems: 'start' }}>
          <div>
            <SectionTitle eyebrow="DIFERENCIAL IA" title="Un agente operativo, no un chatbot decorativo.">
              Como bono estratégico, proponemos una capa de inteligencia por fuera de la app móvil: un asistente con herramientas, permisos controlados y tareas programadas para convertir los datos del sistema en decisiones accionables.
            </SectionTitle>
            <div data-reveal style={{ marginTop: 22, padding: 18, background: '#1A1715', color: '#fff',
              borderRadius: 18, fontSize: 14, lineHeight: 1.55 }}>
              Esta capa se plantea como <strong>piloto incluido</strong> dentro del proyecto: separada del alcance crítico de la app, activable por fases y diseñada para demostrar valor con datos reales sin comprometer la operación principal.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
            {[
              {
                n: '01',
                t: 'Acceso con herramientas',
                b: 'El agente puede consultar matriz, historial, uso, granjas y versiones autorizadas. No responde de memoria: trabaja sobre datos reales del sistema.',
              },
              {
                n: '02',
                t: 'Tareas programadas',
                b: 'Resúmenes mensuales, alertas de baja adopción, estadísticas por región, sistemas más consultados y pendientes de sincronización.',
              },
              {
                n: '03',
                t: 'Apoyo al diagnóstico',
                b: 'Explica coincidencias, sugiere preguntas faltantes y marca señales de atención. Siempre como orientación y soporte al criterio profesional.',
              },
              {
                n: '04',
                t: 'Gobernanza y permisos',
                b: 'Arquitectura separada con cuentas de servicio, delegaciones, scopes y auditoría. La IA solo puede hacer lo que Porkcolombia autorice.',
              },
            ].map((c) => (
              <div data-reveal key={c.n} style={{ '--reveal-delay': `${Number(c.n) * 80}ms`, background: '#fff', border: '1px solid #EDE7E2',
                borderRadius: 18, padding: 18, minHeight: 190 }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                  color: '#F65275', fontWeight: 700, letterSpacing: 1.2 }}>{c.n}</div>
                <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
                  fontSize: 19, fontWeight: 700, color: '#1A1715', letterSpacing: -0.4,
                  marginTop: 12, lineHeight: 1.12 }}>{c.t}</div>
                <div style={{ fontSize: 13, color: '#7A6E68', marginTop: 8,
                  lineHeight: 1.5 }}>{c.b}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12 }}>
          {[
            { k: 'Canales posibles', v: 'Panel web, correo, Telegram, WhatsApp o endpoint interno' },
            { k: 'Modelo de operación', v: 'Agente separado de la app, conectado al backend mediante herramientas' },
            { k: 'Entregables del piloto', v: '1 asistente, 2 reportes programados y tablero inicial de insights' },
            { k: 'Control de riesgo', v: 'Sin decisiones automáticas críticas y sin reemplazar validación profesional' },
          ].map((row) => (
            <div data-reveal key={row.k} style={{ padding: '14px 16px', borderTop: '1px solid #EDE7E2' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                letterSpacing: 1, color: '#F65275', fontWeight: 700 }}>{row.k.toUpperCase()}</div>
              <div style={{ fontSize: 14, color: '#2A2522', marginTop: 5, lineHeight: 1.45 }}>{row.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScopeSection() {
  return (
    <section style={{ position: 'relative', zIndex: 2, padding: '64px 0 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <SectionTitle eyebrow="FASES & ENTREGABLES" title="Plan de ejecución por rangos">
          Siete fases con tiempos estimados. El calendario final depende del alcance aprobado, la disponibilidad de insumos y los ciclos de validación interna.
        </SectionTitle>

        <div data-reveal className="timeline-total" style={{ marginTop: 24, background: '#1A1715', color: '#fff',
          borderRadius: 24, padding: '26px 30px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
              letterSpacing: 1.5, color: '#F65275', fontWeight: 700 }}>TIEMPO TOTAL ESTIMADO</div>
            <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: 15,
              marginTop: 8, lineHeight: 1.5, maxWidth: 620 }}>
              Rango realista para una versión institucional con app móvil Ionic, backend, panel administrativo, validaciones, publicación y handoff técnico.
            </div>
          </div>
          <div className="timeline-total-number" style={{ fontFamily: '"Bricolage Grotesque", system-ui',
            fontSize: 'clamp(48px, 7vw, 86px)', fontWeight: 700,
            letterSpacing: -2.4, lineHeight: 0.92, color: '#fff' }}>
            5-7<span style={{ color: '#F65275' }}> meses</span>
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { ph: 'F1', wk: '2-3 sem.', t: 'Levantamiento y matriz clínica', items: ['Análisis de matriz Excel', 'Modelo de datos JSON', 'Validación con equipo técnico', 'Criterios de aceptación'] },
            { ph: 'F2', wk: '3-4 sem.', t: 'Diseño funcional e interfaces', items: ['UX/UI para uso en campo', 'Flujo guiado de síntomas', 'Diseño del panel web', 'Wireframes validados'] },
            { ph: 'F3', wk: '2-3 sem.', t: 'Arquitectura técnica', items: ['Arquitectura Ionic + web', 'Modelo local RxDB', 'Sincronización offline-first', 'Roles y autenticación'] },
            { ph: 'F4', wk: '5-7 sem.', t: 'Núcleo del sistema', items: ['Backend API + base de datos', 'Motor determinístico JSON', 'Sincronización offline -> nube', 'Versionado de matriz'] },
            { ph: 'F5', wk: '8-10 sem.', t: 'App móvil iOS + Android', items: ['Desarrollo en Ionic', 'Registro de usuario y granja', 'Almacenamiento con RxDB', 'Sincronización automática'] },
            { ph: 'F6', wk: '4-6 sem.', t: 'Panel administrativo web', items: ['Importador Excel -> JSON', 'Versionado de matriz', 'Listado de usuarios y granjas', 'Roles administrativos'] },
            { ph: 'F7', wk: '3-4 sem.', t: 'Pruebas, publicación y entrega', items: ['Pruebas offline y usabilidad', 'App Store + Play Store', 'Capacitación administrativa', 'Handoff y código fuente'] },
          ].map((p, i) => (
            <div data-reveal key={i} style={{ '--reveal-delay': `${i * 90}ms`, background: '#fff', border: '1px solid #EDE7E2', borderRadius: 18,
              padding: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
                  fontSize: 36, fontWeight: 700, color: '#F65275', letterSpacing: -1.5, lineHeight: 1 }}>{p.ph}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                  color: '#7A6E68', fontWeight: 600 }}>{p.wk}</div>
              </div>
              <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
                fontSize: 18, fontWeight: 700, marginTop: 14, color: '#1A1715', letterSpacing: -0.3 }}>{p.t}</div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p.items.map((it, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#2A2522' }}>
                    <span style={{ color: '#F65275', fontWeight: 700 }}>+</span>
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div data-reveal style={{
            '--reveal-delay': '360ms',
            background: '#FFE4EA',
            border: '1px solid #F9B8C7',
            borderRadius: 18,
            padding: 20,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
              letterSpacing: 1.5, color: '#D93E60', fontWeight: 700 }}>GARANTÍA POST-ENTREGA</div>
            <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
              fontSize: 44, fontWeight: 700, color: '#F65275',
              letterSpacing: -1.8, lineHeight: 1, marginTop: 14 }}>90 días</div>
            <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
              fontSize: 18, fontWeight: 700, marginTop: 12,
              color: '#1A1715', letterSpacing: -0.3 }}>Garantía de calidad</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Desde entrega final y aceptación',
                'Corrección de bugs reproducibles',
                'Fallas atribuibles al código entregado',
                'No incluye nuevas funcionalidades',
              ].map((it, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#2A2522' }}>
                  <span style={{ color: '#F65275', fontWeight: 700 }}>+</span>
                  <span>{it}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why us */}
        <div data-reveal style={{ marginTop: 64, background: '#FFE4EA', borderRadius: 24, padding: 40 }}>
          <SectionTitle eyebrow="POR QUÉ ESTA PROPUESTA" title="No solo construimos la app. La pensamos como sistema."/>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { t: 'Identidad visual institucional', b: 'La interfaz mantiene una línea visual sobria y compatible con la comunicación de Porkcolombia, sin depender de un departamento específico.' },
              { t: 'Pensado para campo', b: 'Botones de 56 px, contraste alto, copy en español colombiano. El porcicultor lo entiende a la primera.' },
              { t: 'Escalable a 2027+', b: 'Arquitectura prevista para agregar más enfermedades, más sistemas y nuevos módulos sin reescribir.' },
              { t: 'Continuidad opcional', b: 'Plan anual de mantenimiento posterior a la garantía: matriz clínica, compatibilidad iOS/Android, hosting y soporte.' },
            ].map((c, i) => (
              <div data-reveal key={i} style={{ '--reveal-delay': `${i * 80}ms` }}>
                <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
                  fontSize: 18, fontWeight: 700, color: '#1A1715', letterSpacing: -0.3 }}>{c.t}</div>
                <div style={{ fontSize: 14, color: '#7A6E68', marginTop: 6, lineHeight: 1.5 }}>{c.b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#1A1715', color: '#fff', padding: '80px 40px',
      position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="18" cy="18" r="13" stroke="#F65275" strokeWidth="3"/>
              <line x1="27" y1="27" x2="38" y2="38" stroke="#F65275" strokeWidth="3" strokeLinecap="round"/>
              <ellipse cx="15" cy="18" rx="2" ry="2.6" fill="#F65275"/>
              <ellipse cx="21" cy="18" rx="2" ry="2.6" fill="#F65275"/>
            </svg>
            <span style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 22, letterSpacing: -0.5 }}>CENIDIAG</span>
          </div>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
            fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 700, letterSpacing: -2,
            lineHeight: 1, marginTop: 24, maxWidth: 700 }}>
            Hagámoslo realidad para 2026.
          </div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 16, maxWidth: 520 }}>
            Agendamos una sesión de 30 minutos para revisar alcance, ajustes y firma.
          </div>
          <div style={{ marginTop: 24, maxWidth: 360 }}>
            <DownloadLink href={DOCUMENTS_URL} dark variant="primary" sub="Cotización + anexo en ZIP">
              Descargar paquete CP-0008
            </DownloadLink>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
          <div>DANIEL CARRERA</div>
          <div>carreraprogrammer@gmail.com</div>
          <div style={{ marginTop: 16 }}>PORKCOLOMBIA</div>
          <div></div>
        </div>
      </div>
    </footer>
  );
}

function Tweaks({ tw, setTw }) {
  return null;
}

function FloatingDownloadCTA({ visible }) {
  return (
    <a
      href={DOCUMENTS_URL}
      download
      className={`floating-download ${visible ? 'is-visible' : ''}`}
      aria-label="Descargar cotización"
    >
      <span className="floating-download__label">Descargar cotización</span>
      <span className="floating-download__icon">↓</span>
    </a>
  );
}

function AccessGate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (code.trim() === ACCESS_CODE) {
      sessionStorage.setItem('proposal_access_granted', '1');
      onUnlock();
      return;
    }
    setError(true);
    setCode('');
  };

  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', zIndex: 2,
    }}>
      <form onSubmit={submit} style={{
        width: '100%', maxWidth: 380, background: '#fff', border: '1px solid #EDE7E2',
        borderRadius: 18, padding: 24, boxShadow: '0 24px 80px rgba(26,23,21,0.08)',
      }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          letterSpacing: 1.5, color: '#F65275', fontWeight: 700 }}>ACCESO PRIVADO</div>
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui',
          fontSize: 32, fontWeight: 700, letterSpacing: -0.8,
          color: '#1A1715', marginTop: 10, lineHeight: 1.05 }}>Propuesta CENIDIAG</div>
        <div style={{ color: '#7A6E68', fontSize: 14, marginTop: 10, lineHeight: 1.5 }}>
          Ingresa la clave para ver el contenido.
        </div>
        <input
          autoFocus
          inputMode="numeric"
          type="password"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError(false);
          }}
          placeholder="Clave de acceso"
          style={{
            width: '100%', height: 52, marginTop: 22, borderRadius: 12,
            border: `1.5px solid ${error ? '#F65275' : '#EDE7E2'}`,
            padding: '0 14px', color: '#1A1715', background: '#FAF6F2',
            outline: 'none',
          }}
        />
        {error && (
          <div style={{ color: '#D93E60', fontSize: 12, marginTop: 8 }}>
            Clave incorrecta.
          </div>
        )}
        <button type="submit" style={{
          width: '100%', height: 52, marginTop: 16, borderRadius: 12,
          border: 'none', background: '#1A1715', color: '#fff',
          fontWeight: 700, cursor: 'pointer',
        }}>
          Entrar
        </button>
      </form>
    </main>
  );
}

function App() {
  const [tw, setTw] = useState(TWEAK_DEFAULTS);
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('proposal_access_granted') === '1');
  useScrollReveal(unlocked);
  const showFloatingDownload = usePastHero(unlocked);

  if (!unlocked) {
    return <AccessGate onUnlock={() => setUnlocked(true)}/>;
  }

  return (
    <div data-screen-label="01 Propuesta Cover">
      <Cover/>
      <div data-screen-label="02 Prototipo móvil">
        {tw.view === 'canvas' ? <CanvasView/> : <PrototypeSection/>}
      </div>
      {tw.showAdmin && (
        <div data-screen-label="03 Panel admin web">
          <AdminSection/>
        </div>
      )}
      <div data-screen-label="04 Diferencial IA">
        <AIDifferentiatorSection/>
      </div>
      <div data-screen-label="05 Plan de ejecución">
        <ScopeSection/>
      </div>
      <Footer/>
      <Tweaks tw={tw} setTw={setTw}/>
      <FloatingDownloadCTA visible={showFloatingDownload}/>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
