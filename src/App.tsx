import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowUp, BarChart3, Bot, Check, ChevronDown, ChevronLeft, ChevronRight,
  Code2, Copy, CreditCard, Database, ExternalLink, File, Folder, GitBranch, Github,
  Globe2, Grid2X2, Hammer, History, Image, LayoutDashboard, List, Menu, Mic, MoreHorizontal,
  Paperclip, Pencil, Plus, RefreshCw, Search, Settings2, ShieldCheck, Sparkles, Star,
  Terminal, Trash2, Upload, User, Users, WandSparkles, Zap
} from "lucide-react";
import "./styles.css";

type Mode = "Build" | "Plan" | "Ask";
type Surface = "preview" | "code" | "files" | "history" | "cloud" | "analytics" | "settings" | "seo" | "security" | "payments" | "ai" | "mcp";
type Project = { id:number; name:string; edited:string; live:boolean; framework:string; tone:string; collaborators:number; starred:boolean };

const seed:Project[] = [
  {id:1,name:"Daily Delights",edited:"Edited 2 hours ago",live:true,framework:"React + Vite",tone:"plum",collaborators:3,starred:false},
  {id:2,name:"Wealth Map",edited:"Edited yesterday",live:true,framework:"React + Vite",tone:"amber",collaborators:2,starred:true},
  {id:3,name:"Reading Room",edited:"Edited 2 days ago",live:false,framework:"React + Vite",tone:"teal",collaborators:1,starred:false},
  {id:4,name:"Focus OS",edited:"Edited 4 days ago",live:true,framework:"React + Vite",tone:"violet",collaborators:4,starred:false},
  {id:5,name:"Launch Board",edited:"Edited 1 week ago",live:false,framework:"React + Vite",tone:"blue",collaborators:2,starred:false},
  {id:6,name:"Portfolio",edited:"Edited 2 weeks ago",live:true,framework:"React + Vite",tone:"rose",collaborators:1,starred:false}
];

function cn(...v:(string|false|undefined)[]){return v.filter(Boolean).join(" ")}
function IconButton({label,onClick,active,children}:{label:string;onClick?:()=>void;active?:boolean;children:React.ReactNode}) {
  return <button className={cn("icon-btn",active && "active")} aria-label={label} title={label} onClick={onClick}>{children}</button>;
}
function Mark(){return <div className="mark"><i/><i/><i/></div>}
function Avatar({small=false,text="JW"}:{small?:boolean;text?:string}){return <div className={cn("avatar",small&&"small")}>{text}</div>}

function Sidebar({collapsed,setCollapsed,onOpen}:{collapsed:boolean;setCollapsed:(v:boolean)=>void;onOpen:(name:string)=>void}) {
  const recents=["Daily Delights","My Daily List","Wealth Map","Focus OS","Reading Room"];
  return <aside className={cn("sidebar",collapsed&&"collapsed")}>
    <div>
      <div className="side-brand"><Mark/><button className="collapse-side" onClick={()=>setCollapsed(!collapsed)}><ChevronLeft size={15}/></button></div>
      <button className="workspace"><Avatar small/><span>Joshua's workspace</span><ChevronDown size={13}/></button>
      <nav className="nav">
        <button className="nav-item active"><LayoutDashboard size={16}/><span>Dashboard</span></button>
        <button className="nav-item"><Search size={16}/><span>Search</span><kbd>⌘K</kbd></button>
        <button className="nav-item"><Zap size={16}/><span>Connectors</span><b>3</b></button>
      </nav>
      <div className="side-label">Projects</div>
      <nav className="nav">
        <button className="nav-item"><Folder size={15}/><span>All projects</span><b>6</b></button>
        <button className="nav-item"><Star size={15}/><span>Starred</span><b>1</b></button>
        <button className="nav-item"><User size={15}/><span>My projects</span></button>
        <button className="nav-item"><Users size={15}/><span>Shared with me</span></button>
      </nav>
      <div className="side-label">Recents</div>
      {!collapsed && <div className="recent">{recents.map((r,i)=><button key={r} onClick={()=>onOpen(r)}><span className={"dot d"+i}/>{r}</button>)}</div>}
    </div>
    <div className="side-foot">
      {!collapsed && <div className="credit"><div><span>Daily build credits</span><b>5/5</b></div><div className="meter"><i/></div><small>Pro Plan</small></div>}
      <button className="profile"><Avatar/><span><strong>Joshua Wilson</strong><small>joshua@example.com</small></span><MoreHorizontal size={15}/></button>
    </div>
  </aside>
}

function Composer({value,setValue,mode,setMode,onCreate,editor=false}:{value:string;setValue:(s:string)=>void;mode:Mode;setMode:(m:Mode)=>void;onCreate?:()=>void;editor?:boolean}) {
  const [attach,setAttach]=useState(false);
  const [skills,setSkills]=useState(false);
  return <div className={cn("composer",editor&&"editor-composer")}>
    {attach && !editor && <div className="menu attach"><div className="menu-find"><Search size={13}/><input placeholder="Search..."/></div><button><Image size={14}/> Image / mockup <ChevronRight size={13}/></button><button><Database size={14}/> CSV / data <ChevronRight size={13}/></button><button><Sparkles size={14}/> Template <ChevronRight size={13}/></button><button><Zap size={14}/> Connectors <ChevronRight size={13}/></button></div>}
    {skills && editor && <SkillMenu onPick={(s)=>{setValue(s+" ");setSkills(false)}}/>}
    <textarea value={value} onChange={e=>{setValue(e.target.value);if(editor && (e.target.value.endsWith("/") || e.target.value.endsWith(" /")))setSkills(true)}} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();onCreate?.()} if(e.key==="Escape")setSkills(false)}} placeholder={editor?"Ask Lovable to edit this page, add a feature...":"Ask Lovable to create a prototype..."}/>
    <div className="composer-row">
      <div className="composer-left">
        <IconButton label="Attachments" active={attach} onClick={()=>setAttach(!attach)}><Plus size={18}/></IconButton>
        {editor && <><IconButton label="Attach file"><Paperclip size={16}/></IconButton><IconButton label="Crop preview"><WandSparkles size={16}/></IconButton><IconButton label="Project context">@</IconButton><IconButton label="Voice"><Mic size={16}/></IconButton><span className="slash">/</span></>}
        <button className="mode-pill" onClick={()=>setMode(mode==="Build"?"Plan":mode==="Plan"?"Ask":"Build")}><Hammer size={13}/>{mode}<ChevronDown size={13}/></button>
      </div>
      <div className="composer-right">{editor&&<span className="fast">Fast</span>}<IconButton label="Voice"><Mic size={16}/></IconButton><button className={cn("send",value.trim()&&"ready")} onClick={onCreate}><ArrowUp size={17}/></button></div>
    </div>
  </div>
}

function SkillMenu({onPick}:{onPick:(s:string)=>void}) {
  const skills=["/goal","/accessibility","/redesign","/seo-reviews","/skill-creation","/video-creation"];
  return <div className="menu skills"><div className="skill-title">Skills</div>{skills.map(s=><button key={s} onClick={()=>onPick(s)}><Sparkles size={13}/><strong>{s}</strong><small>Built-in workflow</small></button>)}</div>
}

function ProjectCard({p,onOpen,onStar}:{p:Project;onOpen:()=>void;onStar:()=>void}) {
  return <article className="project-card">
    <button className={"thumb tone-"+p.tone} onClick={onOpen}>
      <div className="traffic"><i/><i/><i/><span>lovable.app</span></div>
      <div className="mini-app"><div className="mini-head"/><div className="mini-title"/><div className="mini-grid"><i/><i/><i/></div></div>
    </button>
    <div className="status"><span className={p.live?"live":"draft"}>{p.live?"● Live":"Draft"}</span><span className="framework">{p.framework}</span></div>
    <div className="meta"><div><strong>{p.name}</strong><small>{p.edited}</small></div><div className="collabs">{Array.from({length:p.collaborators}).map((_,i)=><Avatar key={i} small text={i===0?"JW":i===1?"AK":"MR"}/>)}</div></div>
    <div className="card-actions"><IconButton label="Star" active={p.starred} onClick={onStar}><Star size={15}/></IconButton><IconButton label="Share"><Users size={14}/></IconButton><IconButton label="More" onClick={()=>alert("Open in new tab · View published · Rename · Duplicate · Project settings · Delete")}><MoreHorizontal size={15}/></IconButton></div>
  </article>
}

function Dashboard({onOpen}:{onOpen:(n:string)=>void}) {
  const [collapsed,setCollapsed]=useState(false),[prompt,setPrompt]=useState(""),[mode,setMode]=useState<Mode>("Build"),[tab,setTab]=useState("All projects"),[query,setQuery]=useState(""),[view,setView]=useState<"grid"|"list">("grid"),[sort,setSort]=useState("Last modified"),[projects,setProjects]=useState(seed);
  const filtered=useMemo(()=>projects.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())&&(tab!=="Starred"||p.starred)).sort((a,b)=>sort==="Alphabetical"?a.name.localeCompare(b.name):a.id-b.id),[projects,query,tab,sort]);
  const create=()=>{if(!prompt.trim())return;const p:Project={id:Date.now(),name:prompt.trim().slice(0,28),edited:"Edited just now",live:false,framework:"React + Vite",tone:"pink",collaborators:1,starred:false};setProjects([p,...projects]);setPrompt("");onOpen(p.name)};
  return <div className="app">
    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} onOpen={onOpen}/>
    <main className={cn("dash-main",collapsed&&"rail")}>
      <header className="mobile-header"><IconButton label="Menu"><Menu size={18}/></IconButton><Mark/><Avatar small/></header>
      <div className="hero">
        <div className="workspace-caption">Workspace · Personal</div>
        <h1>What do you want to build?</h1>
        <p>Describe an app, feature, workflow, or idea. Lovable turns it into a working product.</p>
        <Composer value={prompt} setValue={setPrompt} mode={mode} setMode={setMode} onCreate={create}/>
      </div>
      <section className="gallery">
        <div className="gallery-head">
          <div className="tabs">{["All projects","Created by me","Shared with me"].map(t=><button className={cn("tab",tab===t&&"selected")} key={t} onClick={()=>setTab(t)}>{t}</button>)}</div>
          <div className="tools"><div className="search"><Search size={14}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects"/></div><select value={sort} onChange={e=>setSort(e.target.value)}><option>Last modified</option><option>Alphabetical</option><option>Created date</option></select><div className="view"><IconButton label="Grid" active={view==="grid"} onClick={()=>setView("grid")}><Grid2X2 size={15}/></IconButton><IconButton label="List" active={view==="list"} onClick={()=>setView("list")}><List size={15}/></IconButton></div><button className="import" onClick={()=>alert("Import Project: GitHub URL, ZIP upload, or local folder.")}><Upload size={14}/> Import</button></div>
        </div>
        {view==="grid"?<div className="grid">{filtered.map(p=><ProjectCard key={p.id} p={p} onOpen={()=>onOpen(p.name)} onStar={()=>setProjects(projects.map(x=>x.id===p.id?{...x,starred:!x.starred}:x))}/>)}</div>:<div className="list">{filtered.map(p=><div className="list-row" key={p.id} onDoubleClick={()=>onOpen(p.name)}><div className={"list-thumb tone-"+p.tone}/><div className="row-name"><strong>{p.name}</strong><small>{p.edited}</small></div><span className="framework">{p.framework}</span><span>{p.live?"● Live":"Draft"}</span><IconButton label="Open" onClick={()=>onOpen(p.name)}><ExternalLink size={14}/></IconButton></div>)}</div>}
      </section>
    </main>
  </div>
}

function SurfaceMenu({surface,setSurface}:{surface:Surface;setSurface:(s:Surface)=>void}) {
  const items:[Surface,string,React.ReactNode][]= [["preview","Preview",<Sparkles size={14}/>],["code","Code",<Code2 size={14}/>],["files","Files",<Folder size={14}/>],["history","History",<History size={14}/>]];
  const more:[Surface,string,React.ReactNode][]= [["cloud","Cloud",<Database size={14}/>],["ai","AI",<Sparkles size={14}/>],["mcp","Agent integrations",<Bot size={14}/>],["analytics","Analytics",<BarChart3 size={14}/>],["seo","SEO & AI Search",<Globe2 size={14}/>],["security","Security",<ShieldCheck size={14}/>],["payments","Payments",<CreditCard size={14}/>],["settings","Settings",<Settings2 size={14}/>]];
  const [open,setOpen]=useState(false);
  return <div className="surface-tabs">{items.map(x=><button key={x[0]} className={surface===x[0]?"selected":""} onClick={()=>setSurface(x[0])}>{x[2]}{x[1]}</button>)}<button className="more-btn" onClick={()=>setOpen(!open)}>More <ChevronDown size={12}/></button>{open&&<div className="menu more">{more.map(x=><button key={x[0]} onClick={()=>{setSurface(x[0]);setOpen(false)}}>{x[2]}<span>{x[1]}</span><ChevronRight size={12}/></button>)}</div>}</div>
}

function Preview({viewport,inspect}:{viewport:"desktop"|"tablet"|"mobile";inspect:boolean}) {
  return <div className="preview-wrap">
    <div className="browserbar"><div className="browser-left"><ChevronLeft size={14}/><ChevronRight size={14}/><RefreshCw size={13}/><button className="route">Homepage / <ChevronDown size={11}/></button></div><span>{viewport==="desktop"?"100%":viewport==="tablet"?"820px":"390px"}</span><div className="browser-right"><span>100%</span><span className="errors"><Check size={11}/> 0 errors</span></div></div>
    <div className="stage"><div className={"mock-site "+viewport}>
      <aside className="mock-sidebar"><Mark/><div className="mock-work">JW <span>Joshua's workspace</span></div><i className="mock-line selected"/><i className="mock-line"/><i className="mock-line"/><span className="mock-gap"/><i className="mock-line"/><i className="mock-line"/></aside>
      <main className="mock-main"><div className="mock-hero"><span className="mock-chip">build anything</span><h2>What should we build?</h2><div className="mock-box"/></div><div className="mock-gallery"><span className="mock-tabline"/><div className="mock-cards"><i/><i/><i/></div></div></main>
    </div>{inspect&&<div className="inspect-box"><span>button.primary</span></div>}<div className="visual-tools"><button className={inspect?"on":""}>⌾</button><button>T</button></div></div>
  </div>
}

function ToolSurface({surface,history}:{surface:Surface;history:string[]}) {
  if(surface==="code")return <div className="surface code"><div className="surface-top"><span>src / components / <b>Dashboard.tsx</b></span><em>Diff off</em></div><pre>{'import { useState } from "react";\nimport { Search, Plus, Star } from "lucide-react";\n\nexport function Dashboard() {\n  const [query, setQuery] = useState("");\n  const [mode, setMode] = useState("Build");\n  return (\n    <main className="dashboard">\n      <HeroComposer mode={mode} />\n      <ProjectGallery query={query} />\n    </main>\n  );\n}'}</pre></div>;
  if(surface==="files")return <div className="surface"><div className="surface-top"><strong>Project files</strong><div><button>+ New File</button><button>+ New Folder</button><button><Upload size={13}/> Upload</button></div></div><div className="tree">{["src","components","App.tsx","Dashboard.tsx","Editor.tsx","styles.css","public","index.html","package.json"].map((x,i)=><div key={x} className={"tree-row l"+(i<2?i===0?0:1:2)}>{i<2?<Folder size={14}/>:<File size={14}/>} {x}</div>)}</div></div>;
  if(surface==="history")return <div className="surface"><h2 className="surface-title"><History size={16}/> Version history</h2>{history.map((x,i)=><div className="history" key={x}><span className="timeline">{i===0?<Check size={10}/>:i+1}</span><div><b>{x}</b><small>{i===0?"Just now":i===1?"7 min ago":"Today"}</small></div><button onClick={()=>alert("Restore "+x)}>Restore</button></div>)}</div>;
  const meta:Record<string,[string,string]>={cloud:["Cloud","Backend infrastructure and data"],analytics:["Analytics","Published app performance"],settings:["Project settings","Metadata, knowledge, domains, and Git"],seo:["SEO & AI Search","Search previews, schema, crawlers"],security:["Security","Dependencies and vulnerability monitoring"],payments:["Payments","Stripe and Paddle commerce setup"],ai:["AI Gateway","Models, tokens, latency, and spend"],mcp:["Agent integrations","MCP endpoint and callable tools"]};
  const info=meta[surface]||["Tool surface","Project tooling"];
  return <div className="surface"><div className="tool-title"><div className="tool-icon"><Sparkles size={17}/></div><div><h2>{info[0]}</h2><p>{info[1]}</p></div></div><div className="tool-card"><div className="tool-row"><b>{surface==="security"?"A+ Passed":surface==="payments"?"Stripe · Connected":"Healthy"}</b><button onClick={()=>alert("Mock action completed")}><RefreshCw size={13}/> Run</button></div><div className="placeholder"><i/><i/><i/><i/></div></div></div>
}

function Editor({name,onBack}:{name:string;onBack:()=>void}) {
  const [mode,setMode]=useState<Mode>("Build"),[surface,setSurface]=useState<Surface>("preview"),[viewport,setViewport]=useState<"desktop"|"tablet"|"mobile">("desktop"),[message,setMessage]=useState(""),[inspect,setInspect]=useState(false),[thinking,setThinking]=useState(false),[history,setHistory]=useState(["Checkpoint 4 · Current","Checkpoint 3 · Responsive grid","Checkpoint 2 · Navigation"]);
  const [msgs,setMsgs]=useState(["Create a polished dashboard with a dark theme, responsive cards, and a fast project launcher."]);
  const send=()=>{if(!message.trim())return;const m=message.trim();setMsgs(msgs.concat(m));setMessage("");setThinking(true);setHistory([("Checkpoint "+(history.length+1)+" · "+m.slice(0,24))].concat(history));window.setTimeout(()=>setThinking(false),900)};
  return <div className="editor">
    <header className="editor-top"><div className="top-group"><IconButton label="Back" onClick={onBack}><ArrowLeft size={16}/></IconButton><button className="title-pill">{name}<Pencil size={11}/></button><span className="branch"><GitBranch size={12}/> main</span><span className="credit-pill">45 / 50</span></div><div className="device-toggle">{(["desktop","tablet","mobile"] as const).map(v=><button className={viewport===v?"selected":""} key={v} onClick={()=>setViewport(v)}>{v[0].toUpperCase()+v.slice(1)}</button>)}</div><div className="top-group right"><span className="sync"><Github size={14}/> Synced</span><button className="share" onClick={()=>alert("Share modal mock")}>Share</button><button className="publish" onClick={()=>alert("Publish drawer mock")}>Publish</button><Avatar small/></div></header>
    <div className="editor-body">
      <aside className="chat">
        <div className="chat-head"><div className="mode-toggle">{(["Build","Plan","Ask"] as Mode[]).map(m=><button className={mode===m?"selected":""} key={m} onClick={()=>setMode(m)}>{m}</button>)}</div><div><IconButton label="New chat"><Plus size={15}/></IconButton><IconButton label="Collapse"><ChevronLeft size={15}/></IconButton></div></div>
        <div className="messages">{msgs.map((m,i)=><div className="turn" key={i}><div className="user-msg"><Avatar small/><div><strong>You</strong><p>{m}</p><span className="attach-chip"><Image size={10}/> screenshot.png</span></div></div>{i===msgs.length-1&&thinking?<div className="thinking active"><Sparkles size={13}/> Thinking…</div>:<button className="thinking"><Sparkles size={13}/> Finished thinking <ChevronDown size={12}/></button>}<div className="tool-badges"><span><Terminal size={10}/> Read src/components/Header.tsx</span><span><File size={10}/> Created src/components/Hero.tsx</span><span><File size={10}/> Updated src/styles.css</span></div><p className="turn-summary">Updated layout proportions, responsive states, and the preview surface with realistic local mock behavior.</p><div className="turn-actions"><IconButton label="Revert"><RefreshCw size={13}/></IconButton><IconButton label="Copy" onClick={()=>navigator.clipboard?.writeText(m)}><Copy size={13}/></IconButton><IconButton label="Thumbs up">👍</IconButton><IconButton label="Thumbs down">👎</IconButton><IconButton label="More"><MoreHorizontal size={14}/></IconButton></div></div>)}</div>
        <Composer value={message} setValue={setMessage} mode={mode} setMode={setMode} onCreate={send} editor/>
      </aside>
      <main className="canvas">
        <div className="surfacebar"><SurfaceMenu surface={surface} setSurface={setSurface}/><div className="surface-tools"><IconButton label="Element inspector" active={inspect} onClick={()=>setInspect(!inspect)}>⌾</IconButton><IconButton label="Text edit">T</IconButton><IconButton label="Open in new tab"><ExternalLink size={14}/></IconButton></div></div>
        {surface==="preview"?<Preview viewport={viewport} inspect={inspect}/>:<ToolSurface surface={surface} history={history}/>}
      </main>
    </div>
  </div>
}

export default function App(){const [project,setProject]=useState<string|null>(null);return project?<Editor name={project} onBack={()=>setProject(null)}/>:<Dashboard onOpen={setProject}/>}