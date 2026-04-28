import React from 'react';

const data = [
  { sub:'001', nombre:'Almaraz, Patricia Beatriz',   domicilio:'9 de Julio N°41 - Arcadia',      cuit:'27-30299885-5', afip:'Monotrib.', matutina:3664750,  vespertina:2950300, siesta:1011800, tarde:1349600, nocturno:3111150, total:12087600, comision:1450512,   dgr:94283.28,  autom:50767.92  },
  { sub:'002', nombre:'Lopez, Jorge Jose',            domicilio:'Bs.As. N°118 - Concepc.',        cuit:'20-22556395-1', afip:'Autónomo',  matutina:10316170, vespertina:7834060, siesta:4536570, tarde:4397000, nocturno:8350715, total:35434515, comision:4252129.8, dgr:276388.44, autom:148824.54 },
  { sub:'003', nombre:'Molina, Sandra Isabel',        domicilio:'Centenario N°28',                cuit:'27-34765048-5', afip:'Monotrib.', matutina:4271200,  vespertina:4005250, siesta:2653500, tarde:2675350, nocturno:4320400, total:17925700, comision:2151084,   dgr:139820.46, autom:75287.94  },
  { sub:'004', nombre:'Lopez Bertelli, Ramiro',       domicilio:'Alpachiri - Calle Principal',    cuit:'20-30070541-4', afip:'Monotrib.', matutina:3757500,  vespertina:4356900, siesta:2430780, tarde:2607200, nocturno:5839100, total:18991480, comision:2278977.6, dgr:148133.54, autom:79764.22  },
  { sub:'005', nombre:'Medina, Fatima Cecilia',       domicilio:'Vicente Lopez y Planes N°469',   cuit:'23-28919962-2', afip:'Monotrib.', matutina:2999500,  vespertina:3598800, siesta:1785300, tarde:1837400, nocturno:2892000, total:13113000, comision:1573560,   dgr:102281.40, autom:55074.60  },
  { sub:'006', nombre:'Parsons, Monica Beatriz',      domicilio:'Catamarca N°881',                cuit:'23-29750573-4', afip:'Monotrib.', matutina:4586040,  vespertina:5082000, siesta:2448296, tarde:2532400, nocturno:6204379, total:20853115, comision:2502373.8, dgr:162654.30, autom:87583.08  },
  { sub:'007', nombre:'Lopez, Rodrigo Javier',        domicilio:'Almafuerte N°457',               cuit:'20-32110038-5', afip:'Monotrib.', matutina:5935050,  vespertina:5702400, siesta:2740400, tarde:2990000, nocturno:6004305, total:23372155, comision:2804658.6, dgr:182302.81, autom:98163.05  },
  { sub:'008', nombre:'Aranda, Carlos A.',            domicilio:'E.Padilla N°593 - Concepc.',     cuit:'20-08057122-5', afip:'Autónomo',  matutina:422900,   vespertina:436255,  siesta:67550,   tarde:275700,  nocturno:382795,  total:1585200,  comision:190224,    dgr:12364.56,  autom:6657.84   },
  { sub:'009', nombre:'Riarte, Virginia Lujan',       domicilio:'Haimes N°1581',                  cuit:'27-45726638-9', afip:'Monotrib.', matutina:3205100,  vespertina:3418990, siesta:1120900, tarde:1646350, nocturno:3881200, total:13272540, comision:1592704.8, dgr:103525.81, autom:55744.67  },
  { sub:'010', nombre:'VACANTE',                      domicilio:'',                               cuit:'',              afip:'',          matutina:0,        vespertina:0,       siesta:0,       tarde:0,       nocturno:0,       total:0,        comision:0,         dgr:0,         autom:0         },
  { sub:'011', nombre:'Pelegrina, Ana Rosa',          domicilio:'J.B.Alberdi S/N - Alto Verde',   cuit:'27-05728526-0', afip:'Monotrib.', matutina:1938400,  vespertina:1994000, siesta:1153600, tarde:940900,  nocturno:2057000, total:8083900,  comision:970068,    dgr:63054.42,  autom:33952.38  },
  { sub:'012', nombre:'Diaz, Dario F. Martin',        domicilio:'Tomas Guido N°1227 - Conc.',     cuit:'20-28920189-1', afip:'Monotrib.', matutina:3107030,  vespertina:3794235, siesta:2146700, tarde:2058600, nocturno:3963850, total:15070415, comision:1808449.8, dgr:117549.24, autom:63295.74  },
  { sub:'013', nombre:'Dip, Silvia Marisel',          domicilio:'Obispo Colombre N°2113',         cuit:'27-23055235-0', afip:'Monotrib.', matutina:4678900,  vespertina:4924150, siesta:3676850, tarde:2144100, nocturno:5194500, total:20618500, comision:2474220,   dgr:160824.30, autom:86597.70  },
  { sub:'014', nombre:'Martinez, Julio Cesar',        domicilio:'Obispo Colombre N°2386',         cuit:'20-26109680-4', afip:'Monotrib.', matutina:2521950,  vespertina:2168350, siesta:1030100, tarde:1060450, nocturno:1866350, total:8647200,  comision:1037664,   dgr:67448.16,  autom:36318.24  },
  { sub:'015', nombre:'VACANTE',                      domicilio:'',                               cuit:'',              afip:'',          matutina:0,        vespertina:0,       siesta:0,       tarde:0,       nocturno:0,       total:0,        comision:0,         dgr:0,         autom:0         },
  { sub:'016', nombre:'Pavelka, Julio',               domicilio:'San Martin N°978',               cuit:'20-14427896-9', afip:'Autónomo',  matutina:3661100,  vespertina:3879000, siesta:2227800, tarde:1964050, nocturno:3507550, total:15239500, comision:1828740,   dgr:118868.10, autom:64005.90  },
  { sub:'017', nombre:'Delgado, Estela del Valle',    domicilio:'San Martin N°2411',              cuit:'27-11007944-9', afip:'Monotrib.', matutina:1236450,  vespertina:1095450, siesta:466200,  tarde:576550,  nocturno:1172100, total:4546750,  comision:545610,    dgr:35464.65,  autom:19096.35  },
];

const fmt = (n) => {
  if (n === null || n === undefined) return '—';
  const num = Number(n);
  if (num === 0) return '$0';
  const dec = Number.isInteger(num) ? 0 : 2;
  return '$' + num.toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
};

const sum = (field) => data.reduce((acc, r) => acc + (r[field] || 0), 0);

export default function Declaracion() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: '#eef2f8', minHeight: '100vh', padding: '18px 14px' }}>
      <style>{`
      
@media print {
  @page { 
    size: A4 landscape; 
    margin: 10mm 5mm; 
  }

  html, body {
    height: auto !important;
    overflow: visible !important;
    background: #fff !important;
  }

  /* Contenedor principal */
  #dp {
    height: auto !important;
    overflow: visible !important;
    position: static !important;
  }

  /* Oculta TODO lo que no querés imprimir */
  .no-print {
    display: none !important;
  }

  /* Evita sombras y cosas visuales */
  .card {
    box-shadow: none !important;
    border: 1px solid #ddd !important;
    page-break-inside: avoid;
  }
[style*="min-height"] {
  min-height: auto !important;
}
  /* TABLA */
  #tbl {
    width: 100% !important;
    table-layout: auto !important;
  }

  #tbl th, #tbl td {
    font-size: 7.5px !important;
    padding: 2px !important;
    white-space: normal !important;
  }

  /* Evita cortes feos */
  tr {
    page-break-inside: avoid;
  }

  /* Layouts en grid */
  .g2 {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
  }
}

        .card {
          background: #fff;
          border-radius: 9px;
          border: 1px solid #c6d4ea;
          padding: 14px 18px;
          margin-bottom: 12px;
          box-shadow: 0 1px 5px rgba(13,43,107,.08);
        }

        .sec-hdr {
          display: flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 700; color: #0d2b6b;
          text-transform: uppercase; letter-spacing: .5px;
          padding-bottom: 7px; margin-bottom: 10px;
          border-bottom: 2px solid #dce8f8;
        }
        .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

        /* Info rows */
        .ir { display: flex; justify-content: space-between; align-items: baseline; padding: 3px 0; border-bottom: 1px solid #edf2fa; gap: 10px; }
        .ir:last-child { border-bottom: none; }
        .lbl { font-size: 11px; color: #5a6e96; white-space: nowrap; }
        .val { font-size: 11px; font-weight: 600; font-family: 'Courier New', monospace; text-align: right; color: #1a2744; }
        .ir.strong { border-top: 1.5px solid #9ab0d8; margin-top: 4px; padding-top: 5px; }
        .ir.strong .lbl { font-size: 12px; font-weight: 700; color: #1a2744; }
        .ir.strong .val { font-size: 12px; color: #0d2b6b; }

        /* Main table */
        #tbl { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 11px; }
        #tbl th {
          background: #0d2b6b; color: #fff; font-weight: 600;
          text-align: center; padding: 6px 3px;
          border: 1px solid #1a3f8f;
          font-size: 10px; line-height: 1.25;
        }
        #tbl td {
          padding: 4px 4px; border: 1px solid #d0dcef;
          vertical-align: middle; line-height: 1.3;
          overflow: hidden;
        }
        #tbl tr:nth-child(even) td { background: #f3f7fd; }
        #tbl tr.vac td { color: #a0aec0; font-style: italic; }
        #tbl tr.tot td { background: #dce6f8; font-weight: 700; border-top: 2px solid #0d2b6b; }
        #tbl .r { text-align: right; font-family: 'Courier New', monospace; font-size: 10.5px; white-space: nowrap; }
        #tbl .c { text-align: center; }
        #tbl .sub { text-align: center; font-weight: 700; color: #0d2b6b; font-family: 'Courier New', monospace; }
        #tbl .tnm { color: #0d2b6b; font-weight: 700; }

        /* Firma */
        .fbox { border-top: 1.5px solid #0d2b6b; padding-top: 6px; text-align: center; }
        .fbox .fl { font-size: 10px; color: #5a6e96; }
        .fbox .fn { font-size: 11px; font-weight: 700; color: #1a2744; margin-top: 3px; }
      `}</style>

      <div id="dp">
        {/* Botón */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <button
            onClick={() => window.print()}
            style={{ fontFamily: 'inherit', fontSize: 13, fontWeight: 700, padding: '7px 22px', background: '#0d2b6b', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Imprimir / Guardar PDF
          </button>
        </div>

        {/* Cabecera */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: '#0d2b6b', textTransform: 'uppercase', letterSpacing: .8, borderBottom: '3px solid #e02020', paddingBottom: 3, display: 'inline-block' }}>
                Lotería de Tucumán
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a6ac8', marginTop: 4 }}>Liquidación de Comisiones — Diciembre 2025</div>
              <div style={{ fontSize: 11, color: '#5a6e96', marginTop: 2 }}>Concepción, 06 de Enero de 2026</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0d2b6b' }}>CONCESION N° 26</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1a2744', marginTop: 2 }}>LOPEZ BERTELLI, MARTIN</div>
              <div style={{ fontSize: 11, color: '#5a6e96' }}>CUIT: 20-24737694-2 · Resp. Inscripto</div>
            </div>
          </div>
        </div>

        {/* Juramento */}
        <div style={{ fontSize: 11, color: '#4a5e8a', background: '#f0f5ff', border: '1px solid #c6d4ea', borderLeft: '3px solid #1a6ac8', borderRadius: 5, padding: '6px 12px', marginBottom: 12, lineHeight: 1.5 }}>
          Declaro <strong style={{ color: '#0d2b6b' }}>bajo juramento</strong> que las comisiones devengadas por esta concesión en el mes indicado corresponden a la siguiente distribución:
        </div>

        {/* Info + retenciones */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }} className="g2">
          <div className="card">
            <div className="sec-hdr"><span className="dot" style={{ background: '#0d2b6b' }} />Datos del Concesionario</div>
            {[['D.N.I.:', '24.737.694'], ['Domicilio:', '24 de Septiembre N°1435 — Concepción'], ['Inscripción AFIP-DGI:', '20-24737694-2'], ['Condición:', 'Responsable Inscripto'], ['Período:', 'Diciembre 2025']].map(([l, v]) => (
              <div className="ir" key={l}><span className="lbl">{l}</span><span style={{ fontSize: 11, fontWeight: 600, textAlign: 'right', color: '#1a2744' }}>{v}</span></div>
            ))}
          </div>
          <div className="card">
            <div className="sec-hdr"><span className="dot" style={{ background: '#e02020' }} />Retenciones del Período</div>
            {[['Ret. Ingresos Brutos 6,5%:', '$2.688.914,49'], ['Ret. Impuesto Municipal 3%:', '—'], ['Ret. Impuesto Ganancias 2%:', '$277.293,46']].map(([l, v]) => (
              <div className="ir" key={l}><span className="lbl">{l}</span><span className="val">{v}</span></div>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div className="card">
          <div className="sec-hdr"><span className="dot" style={{ background: '#1a6ac8' }} />Sub-Concesiones — Planilla de Pago</div>
          <div style={{ overflowX: 'auto' }}>
            <table id="tbl">
              <colgroup>
                <col style={{ width: '3.5%' }} /><col style={{ width: '13%' }} /><col style={{ width: '10.5%' }} />
                <col style={{ width: '8.5%' }} /><col style={{ width: '5.5%' }} />
                <col style={{ width: '7%' }} /><col style={{ width: '7%' }} /><col style={{ width: '6%' }} />
                <col style={{ width: '6.5%' }} /><col style={{ width: '6.5%' }} />
                <col style={{ width: '8%' }} /><col style={{ width: '7.5%' }} />
                <col style={{ width: '6%' }} /><col style={{ width: '5%' }} /><col style={{ width: '6.5%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Sub N°</th><th>Apellido y Nombre</th><th>Domicilio</th>
                  <th>CUIT N°</th><th>AFIP</th>
                  <th>Matutina</th><th>Vespertina</th><th>Siesta</th>
                  <th>De la Tarde</th><th>Nocturno</th>
                  <th>Total</th><th>Comisión</th>
                  <th>D.G.R.</th><th>SI.CO.RE</th><th>3,5% Autom.</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i} className={d.nombre === 'VACANTE' ? 'vac' : ''}>
                    <td className="sub">{d.sub}</td>
                    <td style={{ fontSize: 11 }}>{d.nombre}</td>
                    <td style={{ fontSize: 9.5, color: '#5a6e96' }}>{d.domicilio || '—'}</td>
                    <td style={{ fontSize: 9, fontFamily: 'Courier New', color: '#5a6e96' }}>{d.cuit || '—'}</td>
                    <td className="c" style={{ fontSize: 9.5 }}>{d.afip || '—'}</td>
                    <td className="r">{fmt(d.matutina)}</td>
                    <td className="r">{fmt(d.vespertina)}</td>
                    <td className="r">{fmt(d.siesta)}</td>
                    <td className="r">{fmt(d.tarde)}</td>
                    <td className="r">{fmt(d.nocturno)}</td>
                    <td className="r tnm">{fmt(d.total)}</td>
                    <td className="r">{fmt(d.comision)}</td>
                    <td className="r">{fmt(d.dgr)}</td>
                    <td className="r">—</td>
                    <td className="r">{fmt(d.autom)}</td>
                  </tr>
                ))}
                <tr className="tot">
                  <td colSpan={5} style={{ textAlign: 'right', paddingRight: 8, color: '#0d2b6b' }}>TOTALES</td>
                  <td className="r">{fmt(sum('matutina'))}</td>
                  <td className="r">{fmt(sum('vespertina'))}</td>
                  <td className="r">{fmt(sum('siesta'))}</td>
                  <td className="r">{fmt(sum('tarde'))}</td>
                  <td className="r">{fmt(sum('nocturno'))}</td>
                  <td className="r tnm">{fmt(sum('total'))}</td>
                  <td className="r">{fmt(sum('comision'))}</td>
                  <td className="r">{fmt(sum('dgr'))}</td>
                  <td className="r">—</td>
                  <td className="r">{fmt(sum('autom'))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }} className="g2">
          <div className="card">
            <div className="sec-hdr"><span className="dot" style={{ background: '#0d2b6b' }} />Resumen de Apuestas — Concesión N° 26</div>
            {[['Sub-Conc. Matutina:', '$56.302.040'], ['Sub-Conc. Vespertina:', '$55.240.140'], ['Sub-Conc. Siesta:', '$29.496.346'], ['Sub-Conc. De la Tarde:', '$29.055.650'], ['Sub-Conc. Nocturno:', '$58.747.394']].map(([l, v]) => (
              <div className="ir" key={l}><span className="lbl">{l}</span><span className="val">{v}</span></div>
            ))}
            <div className="ir strong"><span className="lbl">Total Sub-Concesiones:</span><span className="val">$228.841.570</span></div>
            <div className="ir"><span className="lbl">Concesión propia:</span><span className="val">$29.721.800</span></div>
            <div className="ir strong"><span className="lbl">Total General:</span><span className="val">$258.549.470</span></div>
          </div>
          <div className="card">
            <div className="sec-hdr"><span className="dot" style={{ background: '#1a6ac8' }} />Comisiones y Automatizaciones</div>
            {[['Sub-Concesión:', '$27.460.976,40'], ['Concesión 16%:', '$13.906.938,80']].map(([l, v]) => (
              <div className="ir" key={l}><span className="lbl">{l}</span><span className="val">{v}</span></div>
            ))}
            <div className="ir strong"><span className="lbl">Total Comisiones:</span><span className="val">$41.367.915,20</span></div>
            <div className="ir"><span className="lbl">No Imponible:</span><span className="val">$42.700,00</span></div>
            <div className="ir strong"><span className="lbl">Autom. Conc. 5%:</span><span className="val">$695.346,94</span></div>
            <div className="ir"><span className="lbl">Aut. Sub-Conc. 3%:</span><span className="val">$961.134,17</span></div>
            <div className="ir"><span className="lbl">Total Automatizaciones:</span><span className="val">$1.656.481,12</span></div>
            <div className="ir strong"><span className="lbl">Neto a cobrar (est.):</span><span className="val" style={{ color: '#0d2b6b', fontWeight: 800 }}>$13.864.238,80</span></div>
          </div>
        </div>

        {/* Firmas */}
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 36 }}>
            {[['Firma del Concesionario', 'LOPEZ BERTELLI, MARTIN'], ['Aclaración / Sello', ''], ['Firma y Sello Oficial', 'Lotería de Tucumán']].map(([l, n]) => (
              <div key={l} className="fbox">
                <div className="fl">{l}</div>
                <div className="fn">{n || '\u00A0'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
