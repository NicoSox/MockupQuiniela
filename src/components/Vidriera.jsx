import React, { useState, useEffect, useRef } from 'react';
import { Monitor, ExternalLink, Play, Pause, ChevronDown, ChevronUp, Edit3, Eye, Star } from 'lucide-react';

// ─── Efemérides tradicionales del quiniela argentino ──────────────────────
const EFEMERIDES_INIT = [
  {n:'01',sig:'El agua',sue:'Soñar con lluvia o río'},
  {n:'02',sig:'El niño',sue:'Soñar con un bebé'},
  {n:'03',sig:'El marinero',sue:'Soñar con el mar'},
  {n:'04',sig:'La cama',sue:'Soñar durmiendo'},
  {n:'05',sig:'El gato',sue:'Soñar con un felino'},
  {n:'06',sig:'El perro',sue:'Soñar con un animal doméstico'},
  {n:'07',sig:'El revólver',sue:'Soñar con armas'},
  {n:'08',sig:'El muerto',sue:'Soñar con un difunto'},
  {n:'09',sig:'El niño enfermo',sue:'Soñar con enfermedad'},
  {n:'10',sig:'La leña',sue:'Soñar con fuego o madera'},
  {n:'11',sig:'El gallo',sue:'Soñar con aves de corral'},
  {n:'12',sig:'La ramera',sue:'Soñar con una mujer de la calle'},
  {n:'13',sig:'La yeta / mala suerte',sue:'Soñar con algo que sale mal'},
  {n:'14',sig:'El borracho',sue:'Soñar con alguien en estado ebrio'},
  {n:'15',sig:'La niña bonita',sue:'Soñar con una chica joven'},
  {n:'16',sig:'El dolor de cabeza',sue:'Soñar con malestar'},
  {n:'17',sig:'La desgracia',sue:'Soñar con accidente'},
  {n:'18',sig:'La sangre',sue:'Soñar con heridas'},
  {n:'19',sig:'El pescado',sue:'Soñar en el agua con animales'},
  {n:'20',sig:'La fiesta',sue:'Soñar con celebración'},
  {n:'21',sig:'La mujer',sue:'Soñar con una dama'},
  {n:'22',sig:'El loco',sue:'Soñar con alguien fuera de sí'},
  {n:'23',sig:'El marinero en tierra',sue:'Soñar con alguien perdido'},
  {n:'24',sig:'El caballo',sue:'Soñar con animales de campo'},
  {n:'25',sig:'El gallito',sue:'Soñar con pelea o disputa'},
  {n:'26',sig:'La misa',sue:'Soñar con iglesia o rezos'},
  {n:'27',sig:'El peine',sue:'Soñar arreglándose'},
  {n:'28',sig:'El dentista',sue:'Soñar con los dientes'},
  {n:'29',sig:'El beso',sue:'Soñar con amor romántico'},
  {n:'30',sig:'El Santa Claus',sue:'Soñar con regalos'},
  {n:'31',sig:'Las llaves',sue:'Soñar abriendo puertas'},
  {n:'32',sig:'El dinero',sue:'Soñar con billetes o monedas'},
  {n:'33',sig:'El muerto que habla',sue:'Soñar con un difunto que conversa'},
  {n:'34',sig:'La cabeza',sue:'Soñar con golpes en la cabeza'},
  {n:'35',sig:'El pajarito',sue:'Soñar con aves pequeñas'},
  {n:'36',sig:'El tuerto',sue:'Soñar con alguien con un ojo'},
  {n:'37',sig:'El tiro',sue:'Soñar con disparos'},
  {n:'38',sig:'El mono',sue:'Soñar con simios o payasadas'},
  {n:'39',sig:'La lluvia',sue:'Soñar mojándose'},
  {n:'40',sig:'El médico',sue:'Soñar en el hospital'},
  {n:'41',sig:'La taza',sue:'Soñar tomando algo'},
  {n:'42',sig:'El borrego',sue:'Soñar con ovejas o corderos'},
  {n:'43',sig:'El viejo',sue:'Soñar con un anciano'},
  {n:'44',sig:'El otoño',sue:'Soñar con hojas cayendo'},
  {n:'45',sig:'El vino',sue:'Soñar bebiendo'},
  {n:'46',sig:'El tomate',sue:'Soñar con verduras o frutas rojas'},
  {n:'47',sig:'El muerto parado',sue:'Soñar con alguien que no debería estar'},
  {n:'48',sig:'El muerto que mata',sue:'Soñar con persecución del más allá'},
  {n:'49',sig:'La carne',sue:'Soñar con comida de carne'},
  {n:'50',sig:'El pan',sue:'Soñar con alimentos básicos'},
  {n:'51',sig:'El serrucho',sue:'Soñar con herramientas'},
  {n:'52',sig:'La madre',sue:'Soñar con mamá'},
  {n:'53',sig:'El barco',sue:'Soñar navegando'},
  {n:'54',sig:'El hueso',sue:'Soñar con restos o esqueleto'},
  {n:'55',sig:'La música',sue:'Soñar con canciones o baile'},
  {n:'56',sig:'La caída',sue:'Soñar cayendo al vacío'},
  {n:'57',sig:'El jorobado',sue:'Soñar con alguien deforme'},
  {n:'58',sig:'El ahogado',sue:'Soñar en el agua sin poder respirar'},
  {n:'59',sig:'Las flores',sue:'Soñar con jardines'},
  {n:'60',sig:'El árbol',sue:'Soñar en el bosque'},
  {n:'61',sig:'La pescadora',sue:'Soñar pescando'},
  {n:'62',sig:'El inundado',sue:'Soñar con catástrofe natural'},
  {n:'63',sig:'El casamiento',sue:'Soñar con boda'},
  {n:'64',sig:'El llanto',sue:'Soñar llorando'},
  {n:'65',sig:'La comida',sue:'Soñar en la mesa'},
  {n:'66',sig:'El fantasma',sue:'Soñar con apariciones'},
  {n:'67',sig:'El piano',sue:'Soñar con instrumentos'},
  {n:'68',sig:'El ataúd',sue:'Soñar con un cajón'},
  {n:'69',sig:'El encuentro amoroso',sue:'Soñar con intimidad'},
  {n:'70',sig:'El ladrón',sue:'Soñar con robo o persecución'},
  {n:'71',sig:'El excusado',sue:'Soñar con el baño'},
  {n:'72',sig:'La sorpresa',sue:'Soñar con algo inesperado'},
  {n:'73',sig:'El hospital',sue:'Soñar internado'},
  {n:'74',sig:'La borracha',sue:'Soñar con una mujer ebria'},
  {n:'75',sig:'El tranvía',sue:'Soñar viajando en transporte'},
  {n:'76',sig:'La plancha',sue:'Soñar con tareas del hogar'},
  {n:'77',sig:'Las piernas',sue:'Soñar corriendo o caminando'},
  {n:'78',sig:'El jugador',sue:'Soñar en el casino o apostando'},
  {n:'79',sig:'El lavarropas',sue:'Soñar lavando ropa'},
  {n:'80',sig:'Las visitas',sue:'Soñar con gente en casa'},
  {n:'81',sig:'Las flores amarillas',sue:'Soñar con cementerio'},
  {n:'82',sig:'El pez grande',sue:'Soñar con el mar profundo'},
  {n:'83',sig:'El mal tiempo',sue:'Soñar con tormenta'},
  {n:'84',sig:'La cárcel',sue:'Soñar preso o encerrado'},
  {n:'85',sig:'El antifaz',sue:'Soñar disfrazado o engañado'},
  {n:'86',sig:'El chancho',sue:'Soñar con cerdos'},
  {n:'87',sig:'El pistolero',sue:'Soñar en una pelea armada'},
  {n:'88',sig:'Los zapatos nuevos',sue:'Soñar comprando ropa'},
  {n:'89',sig:'El ratón',sue:'Soñar con roedores'},
  {n:'90',sig:'El miedo',sue:'Soñar con pesadilla'},
  {n:'91',sig:'El infierno',sue:'Soñar con el diablo o fuego eterno'},
  {n:'92',sig:'El médico y el enfermo',sue:'Soñar siendo atendido'},
  {n:'93',sig:'El beso robado',sue:'Soñar con traición amorosa'},
  {n:'94',sig:'El eco',sue:'Soñar con voces sin dueño'},
  {n:'95',sig:'El ahorcado',sue:'Soñar con una ejecución'},
  {n:'96',sig:'El velorio',sue:'Soñar en el velatorio de alguien'},
  {n:'97',sig:'El fusilado',sue:'Soñar con un fusilamiento'},
  {n:'98',sig:'El lamento',sue:'Soñar con quejidos o llanto ajeno'},
  {n:'99',sig:'El espejo',sue:'Soñar viéndose reflejado'},
  {n:'00',sig:'El huevo',sue:'Soñar con algo redondo o nuevo'},
];

// Sueños agrupados por categoría
const SUENOS_CATEGORIAS = [
  { cat:'Personas', suenos:[
    {sue:'Soñar con un bebé',          nro:'02'}, {sue:'Soñar con una mujer',         nro:'21'},
    {sue:'Soñar con un anciano',       nro:'43'}, {sue:'Soñar con mamá',              nro:'52'},
    {sue:'Soñar con un difunto',       nro:'08'}, {sue:'Soñar con un difunto que habla',nro:'33'},
    {sue:'Soñar con un loco',          nro:'22'}, {sue:'Soñar con un borracho',       nro:'14'},
    {sue:'Soñar con un ladrón',        nro:'70'}, {sue:'Soñar con un médico',         nro:'40'},
  ]},
  { cat:'Animales', suenos:[
    {sue:'Soñar con un gato',          nro:'05'}, {sue:'Soñar con un perro',          nro:'06'},
    {sue:'Soñar con un caballo',       nro:'24'}, {sue:'Soñar con un chancho',        nro:'86'},
    {sue:'Soñar con un ratón',         nro:'89'}, {sue:'Soñar con peces',             nro:'19'},
    {sue:'Soñar con un gallo',         nro:'11'}, {sue:'Soñar con pájaros',           nro:'35'},
    {sue:'Soñar con un mono',          nro:'38'}, {sue:'Soñar con un borrego',        nro:'42'},
  ]},
  { cat:'Situaciones', suenos:[
    {sue:'Soñar con una boda',         nro:'63'}, {sue:'Soñar con una fiesta',        nro:'20'},
    {sue:'Soñar cayendo al vacío',     nro:'56'}, {sue:'Soñar con una pelea',         nro:'25'},
    {sue:'Soñar que te roban',         nro:'70'}, {sue:'Soñar preso',                 nro:'84'},
    {sue:'Soñar con una tormenta',     nro:'83'}, {sue:'Soñar viajando',              nro:'75'},
    {sue:'Soñar llorando',             nro:'64'}, {sue:'Soñar con sangre',            nro:'18'},
  ]},
  { cat:'Objetos y lugares', suenos:[
    {sue:'Soñar con dinero',           nro:'32'}, {sue:'Soñar con llaves',            nro:'31'},
    {sue:'Soñar con un ataúd',         nro:'68'}, {sue:'Soñar con flores',            nro:'59'},
    {sue:'Soñar con un barco',         nro:'53'}, {sue:'Soñar en el hospital',        nro:'73'},
    {sue:'Soñar con el baño',          nro:'71'}, {sue:'Soñar con zapatos nuevos',    nro:'88'},
    {sue:'Soñar con armas',            nro:'07'}, {sue:'Soñar con un espejo',         nro:'99'},
  ]},
];

const SORTEOS_INIT = [
  { id:1, nombre:'MATUTINA',   nro:'4686',  hora:'11:30',
    premios:['1234','5678','9101','1121','3141','5161','7181','9202','1222','3242','5262','7282','9303','1323','3343','5363','7383','9404','1424','3444'],
    masJugados:['0013','0022','0045','0069','0070'],
    masSalidores:['0015','0033','0021','0044','0060'],
    masAtrasados:['0007','0088','0123','0999','1002'] },
  { id:2, nombre:'VESPERTINA', nro:'9448',  hora:'14:00',
    premios:['2345','6789','1011','2122','3141','4151','5161','6171','7181','8191','9202','1022','1222','1323','1424','1525','1626','1727','1828','1929'],
    masJugados:['0013','0022','0045','0069','0070'],
    masSalidores:['0015','0033','0021','0044','0060'],
    masAtrasados:['0007','0088','0123','0999','1002'] },
  { id:3, nombre:'SIESTA',     nro:'1381',  hora:'16:00',
    premios:['3456','7890','1121','2232','3343','4454','5565','6676','7787','8898','9909','1010','1111','1212','1313','1414','1515','1616','1717','1818'],
    masJugados:['0013','0022','0045','0069','0070'],
    masSalidores:['0015','0033','0021','0044','0060'],
    masAtrasados:['0007','0088','0123','0999','1002'] },
  { id:4, nombre:'TARDE',      nro:'5391',  hora:'18:00',
    premios:['4567','8901','1232','2343','3454','4565','5676','6787','7898','8909','9010','1011','1112','1213','1314','1415','1516','1617','1718','1819'],
    masJugados:['0013','0022','0045','0069','0070'],
    masSalidores:['0015','0033','0021','0044','0060'],
    masAtrasados:['0007','0088','0123','0999','1002'] },
  { id:5, nombre:'NOCTURNA',   nro:'18218', hora:'22:00',
    premios:['4457','9707','2870','1347','4951','9435','5993','3496','4687','8305','5347','3096','4946','2160','9459','5898','1817','0772','2115','8425'],
    masJugados:['0013','0022','0045','0069','0070'],
    masSalidores:['0015','0033','0021','0044','0060'],
    masAtrasados:['0007','0088','0123','0999','1002'] },
];

const TANDAS_INIT = [
  { id:'extracto',    label:'Extracto',        activa:true,  dur:20 },
  { id:'jugados',     label:'Más jugados',      activa:true,  dur:12 },
  { id:'salidores',   label:'Más salidores',    activa:true,  dur:12 },
  { id:'atrasados',   label:'Más atrasados',    activa:true,  dur:12 },
  { id:'efemeride',   label:'Efeméride del día',activa:true,  dur:15 },
  { id:'sueno',       label:'Sueño destacado',  activa:true,  dur:12 },
];

const pad = n => String(n).padStart(4,'0');

// ─── Preview de la tanda en miniatura ─────────────────────────────────────
function PreviewTanda({ sorteo, tanda, efemeride, sueno }) {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(()=>setTick(t=>t+1),1000); return ()=>clearInterval(id); },[]);
  const hora = new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});

  const cfgTanda = {
    jugados:   { color:'#fbbf24', bg:'#fbbf2422', label:'★ MÁS JUGADOS',   nums: sorteo.masJugados },
    salidores: { color:'#60a5fa', bg:'#60a5fa22', label:'↑ MÁS SALIDORES', nums: sorteo.masSalidores },
    atrasados: { color:'#f87171', bg:'#f8717122', label:'⏳ MÁS ATRASADOS', nums: sorteo.masAtrasados },
  };

  return (
    <div style={{fontFamily:"'Courier New',monospace",background:'#0a0f1e',color:'#fff',display:'flex',flexDirection:'column',height:'100%',overflow:'hidden'}}>
      {/* Header */}
      <div style={{background:'#0d2b6b',padding:'6px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #e02020',flexShrink:0}}>
        <div>
          <div style={{fontSize:12,fontWeight:900,letterSpacing:2,textTransform:'uppercase'}}>LOTERÍA DE TUCUMÁN</div>
          <div style={{fontSize:7,color:'#93c5fd'}}>Concesión N° 26</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:14,fontWeight:900,color:'#fbbf24'}}>{hora}</div>
        </div>
      </div>
      {/* Sorteo bar */}
      <div style={{background:'#1e3a8a',padding:'4px 14px',display:'flex',justifyContent:'space-between',flexShrink:0}}>
        <div><div style={{fontSize:6,color:'#93c5fd',letterSpacing:2}}>EXTRACTO</div><div style={{fontSize:13,fontWeight:900}}>{sorteo.nombre}</div></div>
        <div style={{textAlign:'right'}}><div style={{fontSize:6,color:'#93c5fd'}}>SORTEO N°</div><div style={{fontSize:13,fontWeight:900,color:'#fbbf24'}}>{Number(sorteo.nro).toLocaleString('es-AR')}</div></div>
        <div style={{textAlign:'right'}}><div style={{fontSize:6,color:'#93c5fd'}}>HORA</div><div style={{fontSize:13,fontWeight:900,color:'#4ade80'}}>{sorteo.hora} hs</div></div>
      </div>
      {/* Tanda label */}
      <div style={{background:'#111827',textAlign:'center',fontSize:7,letterSpacing:3,color:'#6b7280',padding:'2px',flexShrink:0,textTransform:'uppercase'}}>
        {tanda==='extracto'?'EXTRACTO DE PREMIOS':tanda==='efemeride'?'EFEMÉRIDE DEL DÍA':tanda==='sueno'?'SUEÑO Y SU NÚMERO':cfgTanda[tanda]?.label||''}
      </div>
      {/* Progreso */}
      <div style={{height:2,background:'#1e3a8a',flexShrink:0}}><div style={{height:2,background:'#3b82f6',width:'60%'}}/></div>

      {/* Contenido */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'6px 10px',overflow:'hidden'}}>
        {tanda==='extracto' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(10,1fr)',gap:3,width:'100%'}}>
            {sorteo.premios.map((n,i)=>(
              <div key={i} style={{background:i===0?'#1e3a8a':i<3?'#1e2d5a':'#111827',border:i===0?'1.5px solid #fbbf24':i<3?'1px solid #60a5fa':'1px solid #1e3a8a',borderRadius:4,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'3px 1px'}}>
                <div style={{fontSize:6,color:'#6b7280',fontWeight:700}}>{i+1}°</div>
                <div style={{fontSize:i<3?11:9,fontWeight:900,color:i===0?'#fbbf24':i<3?'#93c5fd':'#e2e8f0',letterSpacing:1}}>{pad(n)}</div>
              </div>
            ))}
          </div>
        )}
        {(tanda==='jugados'||tanda==='salidores'||tanda==='atrasados') && (() => {
          const cfg = cfgTanda[tanda];
          return (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,width:'100%'}}>
              <div style={{fontSize:9,fontWeight:900,letterSpacing:2,color:cfg.color,textTransform:'uppercase'}}>{cfg.label}</div>
              <div style={{display:'flex',gap:8,justifyContent:'center'}}>
                {cfg.nums.map((n,i)=>(
                  <div key={i} style={{textAlign:'center'}}>
                    <div style={{background:cfg.bg,color:cfg.color,fontWeight:900,fontSize:18,padding:'5px 8px',borderRadius:6,border:`1.5px solid ${cfg.color}40`}}>{pad(n)}</div>
                    <div style={{fontSize:7,color:'#6b7280',marginTop:2}}>{i+1}°</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
        {tanda==='efemeride' && efemeride && (
          <div style={{textAlign:'center',padding:'0 10px'}}>
            <div style={{fontSize:32,fontWeight:900,color:'#fbbf24',fontFamily:"'Courier New',monospace",letterSpacing:3}}>{efemeride.n}</div>
            <div style={{fontSize:14,fontWeight:900,color:'#fff',marginTop:4,letterSpacing:1}}>{efemeride.sig}</div>
            <div style={{fontSize:9,color:'#6b7280',marginTop:6,fontStyle:'italic'}}>{efemeride.sue}</div>
          </div>
        )}
        {tanda==='sueno' && sueno && (
          <div style={{textAlign:'center',padding:'0 10px'}}>
            <div style={{fontSize:10,color:'#a78bfa',letterSpacing:3,fontWeight:900,marginBottom:6}}>SI SOÑASTE CON...</div>
            <div style={{fontSize:13,fontWeight:900,color:'#fff',marginBottom:8}}>"{sueno.sue}"</div>
            <div style={{fontSize:11,color:'#6b7280',marginBottom:4}}>tu número es</div>
            <div style={{fontSize:40,fontWeight:900,color:'#a78bfa',fontFamily:"'Courier New',monospace",letterSpacing:4}}>{sueno.nro}</div>
          </div>
        )}
      </div>

      {/* Barra de tandas */}
      <div style={{background:'#0f172a',borderTop:'1px solid #1e3a8a',display:'flex',padding:'3px 8px',gap:4,flexShrink:0,flexWrap:'wrap'}}>
        {TANDAS_INIT.map((t,i)=>(
          <div key={i} style={{fontSize:6,fontWeight:700,letterSpacing:1,textTransform:'uppercase',padding:'2px 4px',borderRadius:3,background:t.id===tanda?'#1e3a8a':'transparent',color:t.id===tanda?'#93c5fd':'#4b5563'}}>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Genera HTML completo para ventana secundaria ─────────────────────────
function generarHTML(sorteos, sorteoIdx, tandas, efemerides, suenos) {
  const s = sorteos[sorteoIdx];
  const tandasActivas = tandas.filter(t=>t.activa);
  const efDia = efemerides[Math.floor(Math.random()*efemerides.length)];
  const sueDia = suenos[Math.floor(Math.random()*suenos.length)];

  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"/><title>Vidriera — Lotería de Tucumán</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0a0f1e;font-family:'Courier New',monospace;color:#fff;height:100vh;overflow:hidden;display:flex;flex-direction:column;}
#hdr{background:#0d2b6b;padding:10px 28px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #e02020;flex-shrink:0;}
#hdr h1{font-size:22px;font-weight:900;letter-spacing:2px;text-transform:uppercase;}
#hdr p{font-size:11px;color:#93c5fd;margin-top:2px;}
#reloj{font-size:26px;font-weight:900;color:#fbbf24;}
#fecha{font-size:11px;color:#93c5fd;text-transform:capitalize;}
#sorteo-bar{background:#1e3a8a;padding:8px 28px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}
.sb-lbl{font-size:10px;color:#93c5fd;letter-spacing:2px;text-transform:uppercase;}
.sb-val{font-size:26px;font-weight:900;}
#tanda-lbl{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#6b7280;text-align:center;padding:5px;background:#111827;flex-shrink:0;}
#progreso-bar{height:3px;background:#1e3a8a;flex-shrink:0;}
#progreso-fill{height:3px;background:#3b82f6;width:0%;transition:width 0.1s linear;}
#content{flex:1;display:flex;align-items:center;justify-content:center;padding:12px 20px;overflow:hidden;}
.grid-premios{display:grid;grid-template-columns:repeat(10,1fr);gap:7px;width:100%;}
.premio-card{background:#111827;border:1px solid #1e3a8a;border-radius:9px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:7px 3px;}
.top1{background:#1e3a8a;border:2px solid #fbbf24;}
.top3{background:#1e2d5a;border:1px solid #60a5fa;}
.pos{font-size:10px;color:#6b7280;font-weight:700;margin-bottom:3px;}
.num{font-weight:900;letter-spacing:2px;}
.num-top1{font-size:28px;color:#fbbf24;}
.num-top3{font-size:24px;color:#93c5fd;}
.num-normal{font-size:20px;color:#e2e8f0;}
.tanda-panel{width:100%;display:flex;flex-direction:column;align-items:center;gap:16px;}
.tanda-titulo{font-size:16px;font-weight:900;letter-spacing:4px;text-transform:uppercase;}
.tanda-nums{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;}
.tanda-num{font-weight:900;font-size:48px;padding:12px 20px;border-radius:12px;letter-spacing:3px;}
.tanda-num-rank{font-size:11px;font-weight:700;letter-spacing:1px;margin-top:3px;text-align:center;}
.jugados-c{background:#fbbf2420;color:#fbbf24;border:2px solid #fbbf2440;}
.salidores-c{background:#60a5fa20;color:#60a5fa;border:2px solid #60a5fa40;}
.atrasados-c{background:#f8717120;color:#f87171;border:2px solid #f8717140;}
.ef-panel{text-align:center;padding:0 40px;}
.ef-num{font-size:80px;font-weight:900;color:#fbbf24;letter-spacing:4px;}
.ef-sig{font-size:28px;font-weight:900;color:#fff;margin-top:8px;}
.ef-sue{font-size:14px;color:#6b7280;margin-top:10px;font-style:italic;}
.sue-panel{text-align:center;padding:0 40px;}
.sue-cat{font-size:12px;color:#a78bfa;letter-spacing:4px;font-weight:900;margin-bottom:10px;}
.sue-txt{font-size:20px;font-weight:900;color:#fff;margin-bottom:12px;}
.sue-label{font-size:13px;color:#6b7280;margin-bottom:6px;}
.sue-num{font-size:72px;font-weight:900;color:#a78bfa;letter-spacing:4px;}
#barra-tandas{background:#0f172a;border-top:1px solid #1e3a8a;display:flex;padding:5px 18px;gap:8px;flex-shrink:0;flex-wrap:wrap;}
.tanda-tab{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:3px 8px;border-radius:5px;color:#4b5563;}
.tanda-tab.activa{background:#1e3a8a;color:#93c5fd;}
</style></head><body>
<div id="hdr">
  <div><h1>Lotería de Tucumán</h1><p>Concesión N° 26 — LOPEZ BERTELLI, MARTIN</p></div>
  <div style="text-align:right"><div id="reloj"></div><div id="fecha"></div></div>
</div>
<div id="sorteo-bar">
  <div class="sb-item"><div class="sb-lbl">Extracto</div><div class="sb-val">${s.nombre}</div></div>
  <div class="sb-item" style="text-align:center"><div class="sb-lbl">Sorteo N°</div><div class="sb-val" style="color:#fbbf24">${Number(s.nro).toLocaleString('es-AR')}</div></div>
  <div class="sb-item" style="text-align:right"><div class="sb-lbl">Hora</div><div class="sb-val" style="color:#4ade80">${s.hora} hs</div></div>
</div>
<div id="tanda-lbl">— — —</div>
<div id="progreso-bar"><div id="progreso-fill"></div></div>
<div id="content"></div>
<div id="barra-tandas">
  ${tandasActivas.map((t,i)=>`<div class="tanda-tab" id="tab-${i}">${t.label}</div>`).join('')}
</div>
<script>
const s = ${JSON.stringify(s)};
const tandas = ${JSON.stringify(tandasActivas)};
const efDia = ${JSON.stringify(efDia)};
const sueDia = ${JSON.stringify(sueDia)};
let tandaIdx = 0, progreso = 0, iv = null;
function pad(n){return String(n).padStart(4,'0');}
function renderTanda(t){
  const el = document.getElementById('content');
  document.getElementById('tanda-lbl').textContent =
    t.id==='extracto'?'EXTRACTO DE PREMIOS':
    t.id==='jugados'?'★  MÁS JUGADOS':
    t.id==='salidores'?'↑  MÁS SALIDORES':
    t.id==='atrasados'?'⏳  MÁS ATRASADOS':
    t.id==='efemeride'?'EFEMÉRIDE DEL DÍA':'SUEÑO Y SU NÚMERO';
  if(t.id==='extracto'){
    el.innerHTML='<div class="grid-premios">'+s.premios.map((n,i)=>\`
      <div class="premio-card \${i===0?'top1':i<3?'top3':''}">
        <div class="pos">\${i+1}°</div>
        <div class="num \${i===0?'num-top1':i<3?'num-top3':'num-normal'}">\${pad(n)}</div>
      </div>\`).join('')+'</div>';
  } else if(t.id==='jugados'||t.id==='salidores'||t.id==='atrasados'){
    const cfg={jugados:{c:'#fbbf24',cls:'jugados-c',nums:s.masJugados,lbl:'★ MÁS JUGADOS'},salidores:{c:'#60a5fa',cls:'salidores-c',nums:s.masSalidores,lbl:'↑ MÁS SALIDORES'},atrasados:{c:'#f87171',cls:'atrasados-c',nums:s.masAtrasados,lbl:'⏳ MÁS ATRASADOS'}}[t.id];
    el.innerHTML=\`<div class="tanda-panel"><div class="tanda-titulo" style="color:\${cfg.c}">\${cfg.lbl}</div><div class="tanda-nums">\${cfg.nums.map((n,i)=>\`<div><div class="tanda-num \${cfg.cls}">\${pad(n)}</div><div class="tanda-num-rank" style="color:#6b7280">\${i+1}°</div></div>\`).join('')}</div></div>\`;
  } else if(t.id==='efemeride'){
    el.innerHTML=\`<div class="ef-panel"><div class="ef-num">\${efDia.n}</div><div class="ef-sig">\${efDia.sig}</div><div class="ef-sue">\${efDia.sue}</div></div>\`;
  } else {
    el.innerHTML=\`<div class="sue-panel"><div class="sue-cat">SI SOÑASTE CON...</div><div class="sue-txt">"\${sueDia.sue}"</div><div class="sue-label">tu número es</div><div class="sue-num">\${sueDia.nro}</div></div>\`;
  }
  tandas.forEach((_,i)=>{const el2=document.getElementById('tab-'+i);if(el2)el2.className='tanda-tab'+(i===tandaIdx?' activa':'');});
}
function avanzar(idx){
  tandaIdx=idx;
  progreso=0;
  const fill=document.getElementById('progreso-fill');
  const dur=tandas[idx].dur;
  const step=100/(dur*10);
  if(iv)clearInterval(iv);
  iv=setInterval(()=>{
    progreso=Math.min(100,progreso+step);
    fill.style.width=progreso+'%';
    if(progreso>=100){clearInterval(iv);avanzar((tandaIdx+1)%tandas.length);}
  },100);
  renderTanda(tandas[idx]);
}
function tick(){
  const a=new Date();
  document.getElementById('reloj').textContent=a.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  document.getElementById('fecha').textContent=a.toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
}
tick();setInterval(tick,1000);
avanzar(0);
<\/script></body></html>`;
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function Vidriera() {
  const [tab, setTab]               = useState('preview');   // preview | sorteos | efemerides | suenos | tandas
  const [sorteos, setSorteos]       = useState(SORTEOS_INIT);
  const [sorteoIdx, setSorteoIdx]   = useState(4);
  const [tandas, setTandas]         = useState(TANDAS_INIT);
  const [efemerides, setEfemerides] = useState(EFEMERIDES_INIT);
  const [suenos]                    = useState(SUENOS_CATEGORIAS.flatMap(c=>c.suenos));
  const [tandaPreview, setTandaPreview] = useState('extracto');
  const [efDia]                     = useState(EFEMERIDES_INIT[32]); // 33 — el muerto que habla
  const [sueDia]                    = useState(SUENOS_CATEGORIAS[0].suenos[5]); // muerto que habla

  // Auto-avance preview
  const tandaRef = useRef(null);
  useEffect(() => {
    const activas = tandas.filter(t=>t.activa);
    if (!activas.length) return;
    const idx = activas.findIndex(t=>t.id===tandaPreview);
    const duracion = activas[idx]?.dur || 15;
    const id = setTimeout(() => {
      const next = activas[(idx+1)%activas.length];
      setTandaPreview(next?.id || 'extracto');
    }, duracion*1000);
    return () => clearTimeout(id);
  }, [tandaPreview, tandas]);

  const abrirVentana = () => {
    const html = generarHTML(sorteos, sorteoIdx, tandas, efemerides, suenos);
    const w = window.open('','_blank','width=1280,height=720,toolbar=no,menubar=no,scrollbars=no');
    if (!w) return;
    w.document.open(); w.document.write(html); w.document.close();
  };

  const updatePremio = (si, pi, val) => {
    setSorteos(prev => prev.map((s,i) => i===si ? {...s, premios: s.premios.map((p,j)=>j===pi?val.replace(/\D/,'').slice(0,5):p)} : s));
  };
  const updateNums = (si, campo, pi, val) => {
    setSorteos(prev => prev.map((s,i) => i===si ? {...s, [campo]: s[campo].map((n,j)=>j===pi?val.replace(/\D/,'').slice(0,5):n)} : s));
  };
  const updateEf = (idx, campo, val) => {
    setEfemerides(prev => prev.map((e,i) => i===idx ? {...e,[campo]:val} : e));
  };

  const TABS = [
    {id:'preview',    label:'👁 Preview'},
    {id:'sorteos',    label:'🎯 Sorteos'},
    {id:'efemerides', label:'📖 Efemérides'},
    {id:'suenos',     label:'💤 Sueños'},
    {id:'tandas',     label:'⚙️ Tandas'},
  ];

  return (
    <div className="space-y-4 text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
            <Monitor size={22} className="text-indigo-600"/> Vidriera
          </h2>
          <p className="text-xs text-slate-400 mt-1">Display público · Extractos · Efemérides · Sueños</p>
        </div>
        <button onClick={abrirVentana}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow">
          <ExternalLink size={14}/> Abrir en Monitor
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all border ${tab===t.id?'bg-slate-800 text-white border-slate-800':'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ PREVIEW ══ */}
      {tab==='preview' && (
        <>
          {/* Selector sorteo */}
          <div className="flex gap-2">
            {sorteos.map((s,i)=>(
              <button key={i} onClick={()=>setSorteoIdx(i)}
                className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all border ${sorteoIdx===i?'bg-indigo-600 text-white border-indigo-600 shadow':'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}>
                <div>{s.nombre}</div>
                <div className={`text-[9px] mt-0.5 ${sorteoIdx===i?'text-indigo-200':'text-slate-400'}`}>#{s.nro} · {s.hora}</div>
              </button>
            ))}
          </div>
          {/* Info tandas */}
          <div className="bg-slate-800 text-white rounded-xl p-3 flex items-center gap-4 flex-wrap">
            <div className="text-[10px] font-black text-slate-400 uppercase">Rotación activa:</div>
            {tandas.filter(t=>t.activa).map((t,i,arr)=>(
              <div key={i} className="flex items-center gap-1.5">
                <button onClick={()=>setTandaPreview(t.id)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${tandaPreview===t.id?'bg-indigo-600 text-white':'text-slate-300 hover:text-white'}`}>
                  {t.label}
                </button>
                <span className="text-[9px] text-slate-500">{t.dur}s</span>
                {i<arr.length-1 && <span className="text-slate-600">→</span>}
              </div>
            ))}
          </div>
          {/* Preview 16:9 */}
          <div className="rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl" style={{aspectRatio:'16/9'}}>
            <PreviewTanda sorteo={sorteos[sorteoIdx]} tanda={tandaPreview} efemeride={efDia} sueno={sueDia}/>
          </div>
          <p className="text-[10px] text-slate-400 text-center">Preview en tiempo real · Hacé clic en una tanda para saltar a ella</p>
        </>
      )}

      {/* ══ EDITOR SORTEOS ══ */}
      {tab==='sorteos' && (
        <div className="space-y-3">
          {sorteos.map((s,si)=>(
            <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                <span className="font-black text-slate-800 text-xs uppercase tracking-widest">{s.nombre}</span>
                <span className="text-[10px] text-slate-400 font-mono">#{s.nro} · {s.hora} hs</span>
              </div>
              <div className="p-4 space-y-4">
                {/* Info básica */}
                <div className="grid grid-cols-3 gap-3">
                  {[['Nombre','nombre'],['N° Sorteo','nro'],['Hora','hora']].map(([lbl,k])=>(
                    <div key={k}>
                      <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">{lbl}</label>
                      <input value={s[k]} onChange={e=>setSorteos(prev=>prev.map((x,i)=>i===si?{...x,[k]:e.target.value}:x))}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-400 outline-none"/>
                    </div>
                  ))}
                </div>
                {/* Premios */}
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase block mb-2">20 premios (1° al 20°)</label>
                  <div className="grid grid-cols-10 gap-1.5">
                    {s.premios.map((n,pi)=>(
                      <div key={pi} className="text-center">
                        <div className={`text-[8px] font-black mb-0.5 ${pi===0?'text-yellow-600':pi<3?'text-blue-500':'text-slate-400'}`}>{pi+1}°</div>
                        <input value={n} onChange={e=>updatePremio(si,pi,e.target.value)} maxLength={5}
                          className={`w-full text-center font-mono font-black text-[10px] border rounded-lg py-1.5 outline-none focus:ring-1 ${pi===0?'border-yellow-300 bg-yellow-50 text-yellow-700 focus:ring-yellow-400':pi<3?'border-blue-200 bg-blue-50 focus:ring-blue-400':'border-slate-200 focus:ring-slate-300'}`}/>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Números especiales */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {campo:'masJugados',   label:'⭐ Más jugados',   c:'yellow'},
                    {campo:'masSalidores', label:'📈 Más salidores', c:'blue'},
                    {campo:'masAtrasados', label:'⏳ Más atrasados', c:'red'},
                  ].map(({campo,label,c})=>(
                    <div key={campo}>
                      <label className={`text-[9px] font-black uppercase block mb-1.5 text-${c}-600`}>{label}</label>
                      <div className="flex gap-1.5">
                        {s[campo].map((n,pi)=>(
                          <div key={pi} className="flex-1 text-center">
                            <div className="text-[8px] text-slate-400 mb-0.5">{pi+1}°</div>
                            <input value={n} onChange={e=>updateNums(si,campo,pi,e.target.value)} maxLength={5}
                              className={`w-full text-center font-mono font-black text-xs border rounded-lg py-1.5 outline-none focus:ring-1 border-${c}-200 bg-${c}-50 focus:ring-${c}-300`}/>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══ EDITOR EFEMÉRIDES ══ */}
      {tab==='efemerides' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
            <span className="font-black text-slate-800 text-xs uppercase tracking-widest">Efemérides del Quiniela — significado popular de cada número</span>
          </div>
          <div className="overflow-x-auto">
            <table className="text-xs w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-[10px]">
                  <th className="p-2.5 text-center w-12">N°</th>
                  <th className="p-2.5 text-left">Significado popular</th>
                  <th className="p-2.5 text-left">Sueño asociado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {efemerides.map((e,i)=>(
                  <tr key={e.n} className={i%2===0?'bg-white':'bg-slate-50'}>
                    <td className="p-2 text-center font-black font-mono text-indigo-700 text-sm">{e.n}</td>
                    <td className="p-1.5">
                      <input value={e.sig} onChange={ev=>updateEf(i,'sig',ev.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:ring-1 focus:ring-indigo-400 outline-none bg-transparent hover:bg-white"/>
                    </td>
                    <td className="p-1.5">
                      <input value={e.sue} onChange={ev=>updateEf(i,'sue',ev.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:ring-1 focus:ring-indigo-400 outline-none bg-transparent hover:bg-white text-slate-500"/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══ SUEÑOS ══ */}
      {tab==='suenos' && (
        <div className="space-y-4">
          {SUENOS_CATEGORIAS.map(cat=>(
            <div key={cat.cat} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                <span className="font-black text-slate-800 text-xs uppercase tracking-widest">{cat.cat}</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2">
                {cat.suenos.map((s,i)=>(
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2">
                    <span className="font-black font-mono text-indigo-700 text-base w-10 text-center">{s.nro}</span>
                    <span className="text-xs text-slate-600 flex-1">{s.sue}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-700">
            Los sueños rotan aleatoriamente en el display. En la versión final podrás editarlos y agregar nuevos.
          </div>
        </div>
      )}

      {/* ══ TANDAS ══ */}
      {tab==='tandas' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
            <span className="font-black text-slate-800 text-xs uppercase tracking-widest">Control del carrusel — activá, desactivá y ajustá duración</span>
          </div>
          <div className="p-5 space-y-3">
            {tandas.map((t,i)=>(
              <div key={t.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${t.activa?'border-indigo-200 bg-indigo-50':'border-slate-200 bg-slate-50 opacity-50'}`}>
                <button onClick={()=>setTandas(prev=>prev.map((x,j)=>j===i?{...x,activa:!x.activa}:x))}
                  className={`w-10 h-6 rounded-full transition-all ${t.activa?'bg-indigo-600':'bg-slate-300'} relative shrink-0`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${t.activa?'left-5':'left-1'}`}/>
                </button>
                <span className="font-black text-slate-800 text-sm flex-1">{t.label}</span>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-slate-400 uppercase font-black">Duración</label>
                  <input type="number" min="5" max="60" value={t.dur}
                    onChange={e=>setTandas(prev=>prev.map((x,j)=>j===i?{...x,dur:Number(e.target.value)}:x))}
                    className="w-16 border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-black text-center focus:ring-2 focus:ring-indigo-400 outline-none"/>
                  <span className="text-[10px] text-slate-400">seg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
