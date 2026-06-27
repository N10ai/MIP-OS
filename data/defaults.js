 :root{
  --bg:#eef2f7;
  --card:rgba(255,255,255,.74);
  --text:#07111f;
  --muted:#64748b;
  --line:rgba(15,23,42,.09);
  --white:rgba(255,255,255,.74);
  --blue:#007aff;
  --dark:#0b1220;
  --red:#ef4444;
  --green:#22c55e;
  --shadow:0 22px 70px rgba(15,23,42,.14);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  color:var(--text);
  background:
    radial-gradient(circle at top left,rgba(0,122,255,.18),transparent 34%),
    radial-gradient(circle at top right,rgba(139,92,246,.16),transparent 30%),
    linear-gradient(135deg,#f8fafc,#e7ebf2);
  min-height:100vh;
  padding-bottom:96px;
}
button,input,select,textarea{font-family:inherit}
button{
  border:0;
  border-radius:16px;
  padding:11px 14px;
  font-weight:850;
  cursor:pointer;
  transition:.16s ease;
}
button:active{transform:scale(.98)}
input,select,textarea{
  width:100%;
  border:1px solid var(--line);
  background:rgba(255,255,255,.78);
  border-radius:17px;
  padding:12px;
  font-size:16px;
  outline:none;
}
textarea{min-height:100px;resize:vertical}
label{display:block;margin:12px 0 5px;color:var(--muted);font-size:12px;font-weight:900}
.primary{background:var(--blue);color:white;box-shadow:0 10px 26px rgba(0,122,255,.25)}
.dark{background:var(--dark);color:white}
.ghost{background:rgba(255,255,255,.62);border:1px solid var(--line);color:#0f172a}
.red{background:#fee2e2;color:#991b1b}
.full{width:100%}
.topbar{
  position:sticky;
  top:0;
  z-index:60;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  padding:12px 18px;
  background:rgba(255,255,255,.70);
  backdrop-filter:blur(28px);
  border-bottom:1px solid rgba(255,255,255,.70);
}
.icon-button{
  width:44px;height:44px;padding:0;
  display:flex;flex-direction:column;justify-content:center;align-items:center;gap:4px;
  background:rgba(255,255,255,.62);
  border:1px solid var(--line);
}
.icon-button span{width:18px;height:2px;background:#0f172a;border-radius:999px}
.brand{display:flex;align-items:center;gap:12px;min-width:0;flex:1}
.brand img{height:46px;width:56px;object-fit:contain;border-radius:14px;background:white;padding:4px;box-shadow:0 10px 30px rgba(15,23,42,.12)}
.brand h1{font-size:21px;line-height:1;margin:0;font-weight:950}
.brand p{margin:3px 0 0;color:var(--muted);font-size:12px}
.save-button{white-space:nowrap}
.side-menu{
  position:fixed;
  top:0;left:0;bottom:0;
  width:310px;
  max-width:86vw;
  z-index:100;
  background:rgba(255,255,255,.88);
  backdrop-filter:blur(28px);
  box-shadow:var(--shadow);
  transform:translateX(-110%);
  transition:.22s ease;
  padding:18px;
}
.side-menu.open{transform:translateX(0)}
.side-menu-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.nav-item{
  width:100%;
  display:block;
  text-align:left;
  margin:6px 0;
  background:transparent;
  color:#0f172a;
}
.nav-item.active,.nav-item:hover{background:white;box-shadow:0 8px 22px rgba(15,23,42,.08)}
.scrim,.drawer-scrim{
  display:none;
  position:fixed;
  inset:0;
  z-index:90;
  background:rgba(15,23,42,.28);
  backdrop-filter:blur(5px);
}
.scrim.show,.drawer-scrim.show{display:block}
.app-shell{max-width:1280px;margin:auto;padding:18px}
.page{display:none}
.page.active{display:block}
.page-title{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:14px;
  margin-bottom:16px;
}
.page-title h2{margin:0;font-size:28px}
.page-title p{margin:4px 0 0;color:var(--muted)}
.card{
  background:var(--card);
  backdrop-filter:blur(28px);
  border:1px solid var(--white);
  border-radius:30px;
  box-shadow:var(--shadow);
  padding:18px;
  margin-bottom:16px;
}
.card-title{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px}
.card h3{margin:0 0 12px;font-size:18px}
.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}
.metric-grid.small{grid-template-columns:repeat(2,1fr);margin-bottom:0}
.metric-card{
  background:rgba(255,255,255,.68);
  border:1px solid var(--line);
  border-radius:23px;
  padding:14px;
}
.metric-card span{display:block;color:var(--muted);font-size:12px;font-weight:900}
.metric-card strong{display:block;font-size:24px;margin-top:4px}
.toolbar{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:10px}
.quote-layout{display:grid;grid-template-columns:minmax(0,1.12fr) 430px;gap:18px;align-items:start}
.quote-preview-panel{position:sticky;top:86px}
.mini-tabs{
  position:sticky;
  top:74px;
  z-index:30;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:4px;
  background:rgba(255,255,255,.50);
  backdrop-filter:blur(24px);
  border:1px solid var(--white);
  border-radius:20px;
  padding:5px;
  margin-bottom:16px;
}
.mini-tab{background:transparent;color:#475569}
.mini-tab.active{background:white;color:#0f172a;box-shadow:0 8px 22px rgba(15,23,42,.08)}
.editor-panel{display:none}
.editor-panel.active{display:block}
.list-stack{display:flex;flex-direction:column;gap:10px}
.row-card{
  display:grid;
  grid-template-columns:1fr auto;
  gap:12px;
  align-items:center;
  background:rgba(255,255,255,.68);
  border:1px solid var(--line);
  border-radius:23px;
  padding:14px;
  transition:.17s ease;
  touch-action:pan-y;
}
.row-card:hover{background:rgba(255,255,255,.88)}
.row-title{font-weight:950}
.row-meta{color:var(--muted);font-size:12px;margin-top:4px;line-height:1.35}
.button-row{display:flex;gap:8px;flex-wrap:wrap}
.chip-row{display:flex;gap:8px;overflow-x:auto;padding:4px 0 8px}
.chip{
  flex:0 0 auto;
  background:rgba(255,255,255,.72);
  border:1px solid var(--line);
  border-radius:999px;
  padding:10px 13px;
  font-size:13px;
  font-weight:900;
}
.pill{
  display:inline-flex;
  font-size:12px;
  color:#334155;
  background:rgba(255,255,255,.60);
  border:1px solid var(--line);
  padding:6px 9px;
  border-radius:999px;
  white-space:nowrap;
}
.pill.draft{background:#fef3c7;color:#92400e}
.pill.sent{background:#dbeafe;color:#1d4ed8}
.pill.accepted{background:#dcfce7;color:#166534}
.pill.rejected{background:#fee2e2;color:#991b1b}
.flagPill{background:rgba(0,122,255,.10);color:#0757b8}
.dangerPill{background:#fee2e2;color:#991b1b}
.coldPill{background:#e0f2fe;color:#075985}
.empty{text-align:center;color:var(--muted);padding:20px;border:1px dashed var(--line);border-radius:22px;background:rgba(255,255,255,.35)}
.kanban{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;align-items:start}
.kanban-col{background:rgba(255,255,255,.48);border:1px solid var(--line);border-radius:24px;padding:12px;min-height:220px}
.kanban-title{font-weight:950;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.quote-card{
  background:rgba(255,255,255,.76);
  border:1px solid var(--line);
  border-radius:18px;
  padding:12px;
  margin-bottom:10px;
}
.quote-preview{
  background:white;
  border:1px solid var(--line);
  border-radius:24px;
  padding:20px;
  overflow:hidden;
}
.quote-preview.compact{font-size:12px;padding:14px}
.quote-preview.clean{border-radius:8px}
.quote-preview.dark .preview-header{
  background:#0b1220;color:white;border:0;border-radius:18px;padding:14px;
}
.preview-header{
  display:flex;
  justify-content:space-between;
  gap:12px;
  border-bottom:2px solid #0f172a;
  padding-bottom:14px;
  margin-bottom:14px;
}
.preview-logo{height:44px;width:54px;object-fit:contain;border-radius:10px;background:white;padding:3px}
.quote-preview table{width:100%;border-collapse:collapse;font-size:12px}
.quote-preview th,.quote-preview td{
  padding:8px;
  border-bottom:1px solid rgba(15,23,42,.08);
  text-align:left;
  vertical-align:top;
  word-break:break-word;
}
.quote-preview th{color:var(--muted)}
.preview-total{text-align:right;font-size:30px;font-weight:950;margin-top:16px}
.suggest-box{
  display:none;
  background:white;
  border:1px solid var(--line);
  border-radius:18px;
  box-shadow:var(--shadow);
  margin-top:8px;
  padding:8px;
  max-height:250px;
  overflow:auto;
}
.suggest-row{padding:10px;border-radius:14px;cursor:pointer}
.suggest-row:hover{background:#f1f5f9}
.drawer{
  position:fixed;
  left:0;right:0;bottom:0;
  z-index:110;
  background:rgba(255,255,255,.94);
  backdrop-filter:blur(30px);
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  box-shadow:0 -20px 80px rgba(15,23,42,.28);
  padding:16px;
  transform:translateY(110%);
  transition:.24s ease;
  max-height:88vh;
  overflow:auto;
}
.drawer.open{transform:translateY(0)}
.drawer-handle{width:48px;height:5px;background:#cbd5e1;border-radius:999px;margin:0 auto 14px}
.drawer-head{
  position:sticky;top:-16px;z-index:5;
  background:rgba(255,255,255,.94);
  backdrop-filter:blur(20px);
  padding:8px 0 12px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
}
.drawer-footer{
  position:sticky;bottom:-16px;
  background:rgba(255,255,255,.94);
  backdrop-filter:blur(20px);
  padding:12px 0 4px;
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  gap:8px;
}
.bottom-save{
  display:none;
  position:fixed;
  left:12px;right:12px;bottom:12px;
  z-index:70;
}
@media(max-width:940px){
  .topbar{padding:10px 12px}
  .brand img{height:42px;width:50px}
  .brand h1{font-size:19px}
  .save-button{display:none}
  .app-shell{padding:12px}
  .page-title{align-items:flex-start;flex-direction:column}
  .toolbar{grid-template-columns:1fr}
  .quote-layout{display:block}
  .quote-preview-panel{position:static}
  .metric-grid{grid-template-columns:1fr 1fr}
  .metric-grid.small{grid-template-columns:1fr 1fr}
  .kanban{grid-template-columns:1fr}
  .bottom-save{display:block}
  body{padding-bottom:96px}
}
@media print{
  header,.side-menu,.scrim,.drawer,.drawer-scrim,.quote-editor,.control-card,.bottom-save{display:none!important}
  body{background:white!important;padding:0}
  .app-shell{padding:0;max-width:none}
  .page{display:none!important}
  #quoteBuilderPage{display:block!important}
  .quote-layout{display:block}
  .quote-preview-panel{display:block;position:static}
  .card{box-shadow:none!important;border:0!important;background:white!important;padding:0}
  .card-title{display:none!important}
  .quote-preview{border:0!important;border-radius:0!important;padding:22px!important}
}

.app-status{
  max-width:1280px;
  margin:0 auto 12px;
  padding:10px 14px;
  border-radius:16px;
  background:rgba(255,255,255,.70);
  border:1px solid var(--line);
  color:var(--muted);
  font-size:13px;
}
.app-status.ok{color:#166534;background:#dcfce7}
.app-status.err{color:#991b1b;background:#fee2e2}
