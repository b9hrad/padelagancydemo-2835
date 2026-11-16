import { useCallback, useEffect, useRef, useState } from 'react';

const lines = [
  'We believe the best games are built',
  'on connection, not just competition.',
  'Six courts. One academy. A place to',
  'find your rhythm, raise your game, and',
  'be part of something bigger.'
];
const Arrow = ({ down = false }: { down?: boolean }) => <span aria-hidden="true">{down ? '↓' : '↗'}</span>;
function Mark() { return <svg viewBox="0 0 45 40" aria-hidden="true"><path fill="currentColor" d="M0 35 20 0 27 12 14 35ZM23 35 32 19 45 40 26 40Z" /></svg>; }
function Laurel() { return <svg viewBox="0 0 200 145" aria-label="Orvante academy club distinction"><g fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M67 130C22 111 20 53 45 20M133 130c45-19 47-77 22-110"/>{Array.from({length:8},(_,i)=>{const y=28+i*12;const x=29+Math.pow((y-70)/50,2)*12;return <g key={i}><ellipse cx={x-5} cy={y} rx="3.6" ry="8" transform={`rotate(${-40+i*7} ${x-5} ${y})`}/><ellipse cx={x+6} cy={y+3} rx="3.6" ry="8" transform={`rotate(${30+i*4} ${x+6} ${y+3})`}/><ellipse cx={205-x} cy={y} rx="3.6" ry="8" transform={`rotate(${40-i*7} ${205-x} ${y})`}/><ellipse cx={194-x} cy={y+3} rx="3.6" ry="8" transform={`rotate(${-30-i*4} ${194-x} ${y+3})`}/></g>;})}</g><text x="100" y="52" textAnchor="middle" fill="currentColor" fontSize="9" letterSpacing="2">THE ORVANTE</text><text x="100" y="70" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="600">ACADEMY</text><text x="100" y="88" textAnchor="middle" fill="currentColor" fontSize="8" letterSpacing="1.3">CLUB DISTINCTION</text><text x="100" y="111" textAnchor="middle" fill="currentColor" fontSize="20">2026</text></svg>; }

function BookingDialog({ type, close }: {type: string; close: () => void}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [saved,setSaved]=useState(false);
  useEffect(()=>{const el=ref.current!;const previous=document.activeElement as HTMLElement;el.showModal();const backdrop=(e:MouseEvent)=>{if(e.target===el){const r=el.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}};el.addEventListener('click',backdrop);document.body.style.overflow='hidden'; return ()=>{el.removeEventListener('click',backdrop);document.body.style.overflow='';previous?.focus();};},[close]);
  return <dialog ref={ref} className="booking-dialog" onCancel={close} aria-label="Club inquiry">
    <button className="dialog-close" onClick={close} aria-label="Close inquiry">×</button>
    <div className="eyebrow">O PADEL / ORVANTE</div><h2>Your next game<br/>starts here.</h2>
    {saved ? <div className="draft-result"><h3>Your inquiry is ready.</h3><p>This is a fictional club preview. No request has been sent and no court has been reserved.</p><button className="black-button" onClick={()=>setSaved(false)}>Edit inquiry <Arrow/></button></div> : <form onSubmit={e=>{e.preventDefault();setSaved(true);}}>
      <p>Six courts. An academy. Room for you.</p>
      <label>I'm interested in<select aria-label="Inquiry type" defaultValue={type}><option>Book a court</option><option>Join the academy</option><option>Contact the club</option></select></label>
      <div className="form-row"><label>Your name<input aria-label="Your name" required autoComplete="name" placeholder="Full name"/></label><label>Email<input aria-label="Email" required type="email" autoComplete="email" placeholder="you@example.com"/></label></div>
      <label>Preferred date<input aria-label="Preferred date" type="date" min={new Date().toISOString().split('T')[0]} required/></label>
      <label>A little about your game<textarea aria-label="About your game" placeholder="Your level, group size, or anything you'd like to know." rows={3}/></label>
      <button type="submit" className="black-button">Preview inquiry <Arrow/></button><small>Demo only. This form does not send or reserve anything.</small>
    </form>}
  </dialog>;
}

export default function Index() {
  const root=useRef<HTMLElement>(null);
  const [booking,setBooking]=useState<string|null>(null);
  const closeBooking=useCallback(()=>setBooking(null),[]);
  const [nav,setNav]=useState(0);
  const [hover,setHover]=useState<number|null>(null);
  useEffect(()=>{
    const el=root.current!; const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches; const rec=new URLSearchParams(location.search).get('rec')==='1';
    const animations:Animation[]=[]; let raf=0; let started=performance.now(); let trustStart:number|null=null;
    const animate=(node:Element,frames:Keyframe[],options:KeyframeAnimationOptions)=>{if(!reduced)animations.push(node.animate(frames,options));};
    el.querySelectorAll('.title-line > span').forEach((n,i)=>animate(n,[{transform:'translateY(110%)'},{transform:'translateY(0)'}],{duration:1000,delay:110*i,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'}));
    const photo=el.querySelector('.photo-reveal')!;
    animate(photo,[{opacity:0,filter:'blur(12px)',transform:'translateY(40px)'},{opacity:1,filter:'blur(0)',transform:'translateY(0)'}],{duration:1300,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
    animate(el.querySelector('.nav')!,[{opacity:0,transform:'translateY(-18px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay:150,fill:'backwards'});
    el.querySelectorAll('.reveal').forEach((n,i)=>animate(n,[{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay:250+i*55,easing:'ease-out',fill:'backwards'}));
    animate(el.querySelector('.progress-fill')!,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:1500,delay:700,fill:'backwards',easing:'ease-out'});
    const trust=el.querySelector('.trust-panel')!;const words=Array.from(el.querySelectorAll<HTMLElement>('.manifesto-word'));const avatars=el.querySelectorAll('.avatar');
    const count=(scope:string,progress:number)=>{el.querySelectorAll<HTMLElement>(scope).forEach(n=>{n.textContent=Math.round(Number(n.dataset.target)*(1-Math.pow(1-progress,3))).toString();});};
    const showTrust=()=>{if(trustStart!==null)return;trustStart=performance.now();avatars.forEach((n,i)=>animate(n,[{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'scale(1)'}],{duration:650,delay:i*80,fill:'backwards',easing:'cubic-bezier(.2,.8,.2,1.2)'}));};
    const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!rec)showTrust();},{threshold:.2}); observer.observe(trust);
    const clamp=(v:number)=>Math.max(0,Math.min(1,v));
    const tick=(now:number)=>{
      const elapsed=now-started;
      count('.hero-count',reduced?1:clamp(elapsed/1400));
      if(reduced){showTrust();count('.trust-count',1);}else{if(rec&&elapsed>=3500)showTrust(); count('.trust-count',trustStart===null?0:clamp((now-trustStart)/1700));}
      const statement=el.querySelector('.manifesto-text')!.getBoundingClientRect();
      const progress=reduced?1:rec?clamp((elapsed-1300)/2900):clamp((innerHeight*.82-statement.top)/(statement.height+innerHeight*.2));
      words.forEach((word,i)=>{const p=clamp((progress*(words.length+3)-i)/3);const color=Math.round(111+(244-111)*p);word.style.color=`rgb(${color},${color},${color})`;});
      const drift=reduced?0:rec?Math.min(elapsed*.003,35):Math.min(scrollY*.12,110);(el.querySelector('.hero-photo') as HTMLElement).style.transform=`translateY(${drift}px)`;
      if(rec&&elapsed>5300)(el.querySelector('.award-card') as HTMLElement).classList.add('record-lift');
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);return ()=>{cancelAnimationFrame(raf);observer.disconnect();animations.forEach(a=>a.cancel());};
  },[]);
  const goto=(i:number)=>{setNav(i);document.getElementById(['home','club','academy','community'][i])?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
  const open=(type='Book a court')=>setBooking(type);
  return <main ref={root}>
    <section className="hero" id="home" aria-label="O padel club">
      <div className="photo-reveal"><img className="hero-photo" src="/images/hero.webp" alt="A player seen from behind in a dark technical jacket" fetchPriority="high"/></div>
      <nav className="nav" aria-label="Main navigation" onMouseLeave={()=>setHover(null)}><span className="nav-slider" style={{transform:`translateX(${(hover??nav)*100}%)`}}/>{['Home','Club','Academy','Community'].map((name,i)=><button key={name} className={(hover??nav)===i?'selected':''} onMouseEnter={()=>setHover(i)} onFocus={()=>setHover(i)} onBlur={()=>setHover(null)} onClick={()=>goto(i)}>{name}</button>)}</nav>
      <div className="top-date reveal">Monday / 16 November 2026</div>
      <button className="black-button top-contact reveal" onClick={()=>open('Contact the club')}><span>Contact Us</span><Arrow/></button>
      <div className="hero-title"><h1><span className="title-line"><span>PURE</span></span><span className="title-line"><span>PADEL</span></span></h1><span className="title-year">(’26)</span></div>
      <div className="about reveal"><div className="eyebrow"><span className="tiny-dot"/> (ABOUT O PADEL)</div><p>Six exceptional courts. One shared passion.<br/>Your place to play, learn, and belong.</p><button className="black-button" onClick={()=>open()}>Book A Court <Arrow/></button></div>
      <div className="stats-frame reveal"><div className="partner-card"><div className="mini-number"><span className="hero-count" data-target="400">400</span>+</div><div className="mini-label">Players. One community.</div><div className="partner-marks"><span>✳ Halcyon</span><span>◒ Ostra</span><span>↟ Fenwick</span><span>≋ Monolo</span><span>⋈ Kitefly</span><span>⌁ Arbor</span></div><button onClick={()=>open()}>Find your court <Arrow/></button></div><div className="feed-card"><img src="/images/community.webp" alt="An Orvante community member in a black cap"/><div className="feed-label">Club Journal · 05/06</div><div className="feed-number"><strong><span className="hero-count" data-target="230">230</span>+</strong><span>Games shared.<br/>Connections made.</span></div></div></div>
      <button className="growth-pill reveal" onClick={()=>open('Join the academy')}><span className="check-disc">✓</span> Real Progress</button>
      <div className="available reveal">We’re ready<br/><span className="tiny-dot"/> for your game</div>
      <div className="academy-preview reveal" id="academy"><div className="academy-heading"><span>On Court</span><span>[2026]</span></div><h2>Orvante Academy</h2><button className="academy-image" onClick={()=>open('Join the academy')} aria-label="Explore Orvante Academy"><img src="/images/academy.webp" alt="Abstract monochrome motion study for the Orvante academy"/><span className="round-arrow"><Arrow/></span><span className="academy-caption">FIND YOUR NEXT LEVEL</span><span className="progress-line"><span className="progress-fill"/></span></button></div>
      <button className="brand-plate reveal" onClick={()=>open('Contact the club')} aria-label="Contact Orvante"><Mark/><span>ORVANTE<small>O PADEL — SIX COURTS. ONE CLUB.</small></span><span className="menu-lines"><i/><i/></span></button>
      <div className="jacket-logos reveal"><span>lumon</span><span className="paperfold">◈ paperfold</span><span className="northwind">NORTHWIND</span></div>
      <div className="hero-corner reveal">O PADEL / PLAY WITHOUT LIMITS</div>
    </section>
    <div className="detail-bar"><span>EST <em>2019</em></span><button onClick={()=>goto(1)}>SCROLL DOWN <span className="white-disc"><Arrow down/></span></button><span className="detail-right">LIVE ON COURT</span></div>
    <section className="statement" id="club" aria-label="Our philosophy"><h2 className="manifesto-text">{lines.map((line,l)=><span className="manifesto-line" key={line}>{line.split(' ').map((word,i)=><span className="manifesto-word" key={`${l}-${i}`}>{word}{i<line.split(' ').length-1?' ':''}</span>)}</span>)}</h2><p className="subline">From your first rally to your next level.<br/>Six courts. Expert coaching. <span>Built for the love of play.</span></p></section>
    <section className="trust-section" id="community" aria-label="Our padel community"><div className="trust-panel"><div className="trust-intro"><div className="eyebrow">THE PEOPLE MAKE THE PLACE</div><h2>Trusted by<br/>Hundreds of<br/>Players.<br/>Just like you.</h2><span className="glass-tile asterisk" aria-hidden="true">✳</span><span className="glass-tile four-dots" aria-hidden="true"><i/><i/><i/><i/></span><p>A first-time player or a lifelong competitor.<br/>There’s a place for every game here.<br/>Come for the court. Stay for the community.</p></div><div className="trust-cards"><div className="avatar-card trust-card"><div className="avatar-grid">{Array.from({length:8},(_,i)=><img className="avatar" key={i} src={`/images/avatar-${i+1}.webp`} alt={`Club community portrait ${i+1}`} loading="lazy"/>)}</div><div className="trust-number"><span className="trust-count" data-target="6">6</span><span className="number-star">✳</span></div><h3>Exceptional Courts</h3><p>More rallies. More room to play.</p><span className="card-foot">A COURT FOR EVERY GAME <Arrow/></span></div><div className="award-card trust-card"><div className="award-heading"><strong><span className="trust-count" data-target="10">10</span>+</strong><span>Academy Programs</span></div><Laurel/><p>From the first serve<br/>to your personal best.</p><button onClick={()=>open('Join the academy')}>Find your program <Arrow/></button></div><button className="portrait-card trust-card" onClick={()=>open('Join the academy')} aria-label="Join our club community"><img src="/images/portrait.webp" alt="Side profile of an Orvante academy player" loading="lazy"/><span>YOUR GAME.<br/>YOUR PEOPLE.<Arrow/></span></button></div></div><div className="section-foot"><span>O PADEL — AN ORVANTE CLUB</span><button onClick={()=>goto(0)}>BACK TO TOP ↑</button></div></section>
    {booking&&<BookingDialog type={booking} close={closeBooking}/>}
  </main>;
}
