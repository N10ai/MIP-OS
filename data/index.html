import { db } from "./supabase.js";
import {
  LOGO_URL,
  defaultInfoFields,
  defaultRouteFields,
  defaultCargoFlags,
  defaultChargeLibrary,
  defaultChargePresets,
  defaultRouteTemplates
} from "../data/defaults.js";

let state = {
  currentQuoteId:"",
  currentStatus:"draft",
  infoFields:safeClone(defaultInfoFields),
  routeFields:safeClone(defaultRouteFields),
  cargo:[],
  charges:[],
  terms:"Quote is subject to final weight, dimensions, carrier acceptance, availability, customs requirements, exams, storage, waiting time, and applicable accessorial charges.",
  preset:"Air Export Standard",
  design: loadLocal("mipDesign", {
    style:"premium",
    accent:"#0b1220",
    title:"MIP Cargo Express",
    subtitle:"Freight Quotation",
    logoUrl:LOGO_URL,
    extraImageUrl:"",
    sectionOrder:["quote","route","cargo","charges","terms"]
  })
};

let chargeLibrary = loadLocal("chargeLibrary", defaultChargeLibrary);
let cargoFlags = loadLocal("cargoFlags", defaultCargoFlags);
let chargePresets = loadLocal("chargePresets", defaultChargePresets);
let routeTemplates = loadLocal("routeTemplates", defaultRouteTemplates);
let routeShortcuts = loadLocal("routeShortcuts", [0,1,2]);

let editing = null;
let swipe = { startX:0, currentX:0, moved:false };

const $ = (id) => document.getElementById(id);

function loadLocal(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? safeClone(fallback); }
  catch { return safeClone(fallback); }
}
function saveLocal(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function esc(v){ return String(v ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
function clone(v){ return JSON.parse(JSON.stringify(v)); }
function toKg(v,u){ return u === "lb" ? v / 2.20462 : v; }
function toCm(v,u){ return u === "in" ? v * 2.54 : v; }
function field(label){ return state.infoFields.find(f => f.label === label)?.value || ""; }
function setField(label,value,visible){
  let f = state.infoFields.find(x => x.label === label);
  if(!f){ f = { label, value:"", visible:!!visible }; state.infoFields.push(f); }
  f.value = value || "";
  if(typeof visible === "boolean") f.visible = visible;
}
function money(v){
  const currency = field("Currency") || "USD";
  return new Intl.NumberFormat("en-US",{style:"currency",currency}).format(v || 0);
}
function arrowSvg(){
  return '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}


window.addEventListener("error", (event) => {
  const el = document.getElementById("appStatus");
  if(el){
    el.className = "app-status err";
    el.textContent = "App error: " + event.message;
  }
});

window.addEventListener("unhandledrejection", (event) => {
  const el = document.getElementById("appStatus");
  if(el){
    el.className = "app-status err";
    el.textContent = "App error: " + (event.reason?.message || event.reason);
  }
});

function setAppStatus(message,type="ok"){
  const el = document.getElementById("appStatus");
  if(!el) return;
  el.className = "app-status " + type;
  el.textContent = message;
}

function safeClone(value){
  try{
    if(typeof structuredClone === "function") return structuredClone(value);
  }catch(e){}
  return JSON.parse(JSON.stringify(value));
}

function init(){
  bindGlobalNav();
  bindQuoteEditor();
  bindQuotesPage();
  bindCustomersPage();
  bindLibraries();
  bindDesigner();

  loadChargePresets();
  renderAll();
  newCargo(false);
  calculateAndRender();

  loadDashboard();
  loadQuotes();
  checkSupabase();
}

function bindGlobalNav(){
  $("menuButton").onclick = openMenu;
  $("closeMenuButton").onclick = closeMenu;
  $("menuScrim").onclick = closeMenu;
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.onclick = () => { goPage(btn.dataset.page); closeMenu(); };
  });
  document.querySelectorAll("[data-page-button]").forEach(btn => {
    btn.onclick = () => goPage(btn.dataset.pageButton);
  });
  $("saveQuoteTopButton").onclick = saveQuote;
  $("saveQuoteBottomButton").onclick = saveQuote;
  $("drawerScrim").onclick = closeDrawer;
}

function openMenu(){ $("sideMenu").classList.add("open"); $("menuScrim").classList.add("show"); }
function closeMenu(){ $("sideMenu").classList.remove("open"); $("menuScrim").classList.remove("show"); }
function goPage(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  $(id).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.page === id));
  if(id === "quotesPage") loadQuotes();
  if(id === "customersPage") loadCustomers();
  if(id === "dashboardPage") loadDashboard();
  if(id === "designerPage") renderDesigner();
}

function bindQuoteEditor(){
  document.querySelectorAll(".mini-tab").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".mini-tab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".editor-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      $(btn.dataset.editorTab).classList.add("active");
    };
  });

  $("addQuoteFieldButton").onclick = () => addInfoField();
  $("addRouteFieldButton").onclick = () => addRouteField();
  $("addCargoButton").onclick = () => newCargo(true);
  $("addManualChargeButton").onclick = () => addCharge();
  $("applyChargePresetButton").onclick = applyChargePreset;
  $("saveChargePresetButton").onclick = saveChargePreset;
  $("copyEmailButton").onclick = copyEmailQuote;
  $("termsBox").oninput = () => { state.terms = $("termsBox").value; calculateAndRender(); };
  $("customerInput").oninput = handleCustomerInput;
  $("openCustomersFromQuote").onclick = () => goPage("customersPage");
  $("manageRoutesButton").onclick = openRouteManager;
  $("manageChargeLibraryButton").onclick = () => goPage("librariesPage");
  $("manageCargoFlagsButton").onclick = () => goPage("librariesPage");
}

function renderAll(){
  renderInfoFields();
  renderRouteFields();
  renderCargo();
  renderCharges();
  renderChargeLibraryChips();
  renderRouteShortcuts();
  renderDesigner();
  $("termsBox").value = state.terms;
}

function renderInfoFields(){
  $("quoteFieldsList").innerHTML = state.infoFields.map((f,i)=>`
    <div class="row-card" onclick="editInfoField(${i})">
      <div>
        <div class="row-title">${esc(f.label)} ${!f.visible ? '<span class="pill">Hidden</span>' : ''}</div>
        <div class="row-meta">${esc(f.value) || "Tap to fill"}</div>
      </div>
      <button class="ghost" onclick="event.stopPropagation();editInfoField(${i})">${arrowSvg()}</button>
    </div>
  `).join("");
}

window.editInfoField = function(i){
  editing = { type:"info", index:i };
  const f = state.infoFields[i];
  const isCustomer = f.label.toLowerCase().includes("customer");
  openDrawer(`
    <div class="drawer-head"><h3>Edit Field</h3><button class="primary" onclick="closeDrawer()">Done</button></div>
    <label>Label</label>
    <input id="editLabel" value="${esc(f.label)}">
    <label>Value</label>
    <textarea id="editValue">${esc(f.value)}</textarea>
    ${isCustomer ? '<div id="drawerCustomerSuggest" class="suggest-box" style="display:block"></div><button class="ghost full" onclick="goPageFromDrawer(\'customersPage\')">Open Customers</button>' : ''}
    <label>Show on quote preview</label>
    <select id="editVisible"><option value="true">Yes</option><option value="false">No</option></select>
    <div class="drawer-footer">
      <button class="red" onclick="deleteEdited()">Delete</button>
      <button class="ghost" onclick="duplicateEdited()">Duplicate</button>
      <button class="primary" onclick="closeDrawer()">Done</button>
    </div>
  `);
  $("editVisible").value = String(f.visible);
  ["editLabel","editValue","editVisible"].forEach(id => $(id).oninput = liveEditField);
  $("editVisible").onchange = liveEditField;
  if(isCustomer){
    $("editValue").oninput = () => { liveEditField(); showDrawerCustomerSuggestions(); };
    showDrawerCustomerSuggestions();
  }
};

window.goPageFromDrawer = function(page){ closeDrawer(); goPage(page); };

async function showDrawerCustomerSuggestions(){
  const box = $("drawerCustomerSuggest");
  if(!box || !db) return;
  const q = $("editValue").value.toLowerCase();
  const res = await db.from("customers").select("*").limit(8);
  if(res.error){ box.innerHTML = '<div class="row-meta">Create customers table first.</div>'; return; }
  let rows = (res.data || []).filter(c => !q || [c.company,c.contact,c.email,c.phone].join(" ").toLowerCase().includes(q)).slice(0,8);
  box.innerHTML = rows.map(c => `
    <div class="suggest-row" onclick="selectCustomer('${c.id}')">
      <strong>${esc(c.company || "Unnamed")}</strong><br>
      <span class="row-meta">${esc(c.contact || "")} | ${esc(c.email || "")}</span>
    </div>
  `).join("") || '<div class="row-meta">No matches</div>';
}

window.selectCustomer = async function(id){
  const res = await db.from("customers").select("*").eq("id",id).single();
  if(res.error){ alert(res.error.message); return; }
  setField("Customer", res.data.company || "", true);
  setField("Contact", res.data.contact || "", false);
  setField("Email", res.data.email || "", false);
  setField("Phone", res.data.phone || "", false);
  const d = res.data.data || {};
  if(d.address) setField("Address", d.address, false);
  if(d.tax_id) setField("Tax ID", d.tax_id, false);
  closeDrawer();
  renderInfoFields();
  calculateAndRender();
};

function liveEditField(){
  const arr = editing.type === "info" ? state.infoFields : state.routeFields;
  arr[editing.index].label = $("editLabel").value;
  arr[editing.index].value = $("editValue").value;
  arr[editing.index].visible = $("editVisible").value === "true";
  renderAll();
  calculateAndRender();
}

function addInfoField(){
  state.infoFields.push({ label:"New Field", value:"", visible:true });
  renderInfoFields();
  window.editInfoField(state.infoFields.length - 1);
}

function addRouteField(){
  state.routeFields.push({ label:"New Route Field", value:"", visible:true });
  renderRouteFields();
  window.editRouteField(state.routeFields.length - 1);
}

window.deleteEdited = function(){
  if(editing.type === "info") state.infoFields.splice(editing.index,1);
  if(editing.type === "route") state.routeFields.splice(editing.index,1);
  closeDrawer();
  renderAll();
  calculateAndRender();
};

window.duplicateEdited = function(){
  const arr = editing.type === "info" ? state.infoFields : state.routeFields;
  arr.splice(editing.index + 1, 0, clone(arr[editing.index]));
  closeDrawer();
  renderAll();
  calculateAndRender();
};

function renderRouteFields(){
  $("routeFieldsList").innerHTML = state.routeFields.map((f,i)=>`
    <div class="row-card" onclick="editRouteField(${i})">
      <div>
        <div class="row-title">${esc(f.label)} ${!f.visible ? '<span class="pill">Hidden</span>' : ''}</div>
        <div class="row-meta">${esc(f.value) || "Tap to fill"}</div>
      </div>
      <button class="ghost" onclick="event.stopPropagation();editRouteField(${i})">${arrowSvg()}</button>
    </div>
  `).join("");
}

window.editRouteField = function(i){
  editing = { type:"route", index:i };
  const f = state.routeFields[i];
  openDrawer(`
    <div class="drawer-head"><h3>Edit Route Field</h3><button class="primary" onclick="closeDrawer()">Done</button></div>
    <label>Label</label><input id="editLabel" value="${esc(f.label)}">
    <label>Value</label><textarea id="editValue">${esc(f.value)}</textarea>
    <label>Show on quote preview</label>
    <select id="editVisible"><option value="true">Yes</option><option value="false">No</option></select>
    <div class="drawer-footer">
      <button class="red" onclick="deleteEdited()">Delete</button>
      <button class="ghost" onclick="duplicateEdited()">Duplicate</button>
      <button class="primary" onclick="closeDrawer()">Done</button>
    </div>
  `);
  $("editVisible").value = String(f.visible);
  ["editLabel","editValue","editVisible"].forEach(id => $(id).oninput = liveEditField);
  $("editVisible").onchange = liveEditField;
};

function renderRouteShortcuts(){
  const html = routeShortcuts.map(i => routeTemplates[i] ? 
    `<button class="chip" onclick="applyRouteTemplate(${i})">${esc(routeTemplates[i].name)}</button>` : ""
  ).join("");
  $("routeShortcutChips").innerHTML = html + `<button class="chip" onclick="openRouteManager()">Edit Routes</button>`;
}

window.applyRouteTemplate = function(i){
  state.routeFields = clone(routeTemplates[i].fields || []);
  renderRouteFields();
  calculateAndRender();
};

function openRouteManager(){
  openDrawer(`
    <div class="drawer-head"><h3>Route Templates</h3><button class="primary" onclick="saveCurrentRouteTemplate()">+ Save</button></div>
    <div class="list-stack">
      ${routeTemplates.map((t,i)=>`
        <div class="row-card">
          <div>
            <div class="row-title">${esc(t.name)}</div>
            <div class="row-meta">${t.fields.length} fields</div>
          </div>
          <div class="button-row">
            <button class="ghost" onclick="applyRouteTemplate(${i});closeDrawer()">Apply</button>
            <button class="ghost" onclick="toggleRouteShortcut(${i})">${routeShortcuts.includes(i) ? "Unpin" : "Pin"}</button>
            <button class="red" onclick="deleteRouteTemplate(${i})">Delete</button>
          </div>
        </div>
      `).join("")}
    </div>
  `);
}

window.saveCurrentRouteTemplate = function(){
  const name = prompt("Route template name?");
  if(!name) return;
  routeTemplates.push({ name, fields:clone(state.routeFields) });
  saveLocal("routeTemplates", routeTemplates);
  renderRouteShortcuts();
  openRouteManager();
};

window.deleteRouteTemplate = function(i){
  if(!confirm("Delete this route template?")) return;
  routeTemplates.splice(i,1);
  routeShortcuts = routeShortcuts.filter(x => x !== i);
  saveLocal("routeTemplates", routeTemplates);
  saveLocal("routeShortcuts", routeShortcuts);
  renderRouteShortcuts();
  openRouteManager();
};

window.toggleRouteShortcut = function(i){
  routeShortcuts = routeShortcuts.includes(i) ? routeShortcuts.filter(x => x !== i) : [...routeShortcuts, i];
  saveLocal("routeShortcuts", routeShortcuts);
  renderRouteShortcuts();
  openRouteManager();
};

function newCargo(open=true){
  state.cargo.push({ desc:"Cargo line", qty:1, weight:0, wUnit:"kg", l:0, w:0, h:0, dUnit:"in", flags:[] });
  renderCargo();
  calculateAndRender();
  if(open) editCargo(state.cargo.length - 1);
}

function renderCargo(){
  $("cargoList").innerHTML = state.cargo.length ? state.cargo.map((c,i)=>{
    const kg = toKg(Number(c.weight || 0), c.wUnit) * Number(c.qty || 0);
    const cbm = (toCm(Number(c.l || 0), c.dUnit) * toCm(Number(c.w || 0), c.dUnit) * toCm(Number(c.h || 0), c.dUnit) * Number(c.qty || 0)) / 1000000;
    const flags = (c.flags || []).map(f => `<span class="pill ${flagClass(f)}">${esc(f)}</span>`).join(" ");
    return `
      <div class="row-card" ontouchstart="startSwipe(event,this)" ontouchmove="moveSwipe(event,this)" ontouchend="endSwipeCargo(event,this,${i})" onclick="editCargo(${i})">
        <div>
          <div class="row-title">${esc(c.desc)} <span class="pill">${c.qty} pcs</span> ${flags}</div>
          <div class="row-meta">${kg.toFixed(2)} KG | ${cbm.toFixed(4)} CBM | ${c.l} x ${c.w} x ${c.h} ${c.dUnit}</div>
        </div>
        <button class="ghost" onclick="event.stopPropagation();editCargo(${i})">${arrowSvg()}</button>
      </div>
    `;
  }).join("") : `<div class="empty">No cargo yet. Tap Add Cargo.</div>`;
}

window.editCargo = function(i){
  editing = { type:"cargo", index:i };
  const c = state.cargo[i];
  openDrawer(`
    <div class="drawer-head"><h3>Edit Cargo</h3><button class="primary" onclick="closeDrawer()">Done</button></div>
    <label>Description</label><input id="cDesc" value="${esc(c.desc)}">
    <div class="button-row">
      <div style="flex:1"><label>Pieces</label><input id="cQty" type="number" value="${c.qty}"></div>
      <div style="flex:1"><label>Weight / Piece</label><input id="cWeight" type="number" value="${c.weight}"></div>
    </div>
    <div class="button-row">
      <div style="flex:1"><label>Weight Unit</label><select id="cWUnit"><option ${c.wUnit==="kg"?"selected":""}>kg</option><option ${c.wUnit==="lb"?"selected":""}>lb</option></select></div>
      <div style="flex:1"><label>Dim Unit</label><select id="cDUnit"><option ${c.dUnit==="in"?"selected":""}>in</option><option ${c.dUnit==="cm"?"selected":""}>cm</option></select></div>
    </div>
    <div class="button-row">
      <div style="flex:1"><label>L</label><input id="cL" type="number" value="${c.l}"></div>
      <div style="flex:1"><label>W</label><input id="cW" type="number" value="${c.w}"></div>
      <div style="flex:1"><label>H</label><input id="cH" type="number" value="${c.h}"></div>
    </div>
    <label>Flags</label>
    <div class="chip-row">${cargoFlags.map(f => `<button class="chip" onclick="toggleCargoFlag('${escJs(f.name)}')">${(c.flags||[]).includes(f.name) ? "Selected " : "+ "}${esc(f.name)}</button>`).join("")}</div>
    <div class="drawer-footer">
      <button class="red" onclick="deleteCargo(${i})">Delete</button>
      <button class="ghost" onclick="duplicateCargo(${i})">Duplicate</button>
      <button class="primary" onclick="closeDrawer()">Done</button>
    </div>
  `);
  ["cDesc","cQty","cWeight","cWUnit","cDUnit","cL","cW","cH"].forEach(id => $(id).oninput = liveCargoEdit);
  $("cWUnit").onchange = liveCargoEdit;
  $("cDUnit").onchange = liveCargoEdit;
};

function liveCargoEdit(){
  const i = editing.index;
  const previousFlags = state.cargo[i].flags || [];
  state.cargo[i] = {
    desc:$("cDesc").value,
    qty:Number($("cQty").value || 0),
    weight:Number($("cWeight").value || 0),
    wUnit:$("cWUnit").value,
    l:Number($("cL").value || 0),
    w:Number($("cW").value || 0),
    h:Number($("cH").value || 0),
    dUnit:$("cDUnit").value,
    flags:previousFlags
  };
  renderCargo();
  calculateAndRender();
}

window.toggleCargoFlag = function(name){
  const c = state.cargo[editing.index];
  c.flags = c.flags || [];
  c.flags = c.flags.includes(name) ? c.flags.filter(x => x !== name) : [...c.flags, name];
  editCargo(editing.index);
  calculateAndRender();
};

window.deleteCargo = function(i){ state.cargo.splice(i,1); closeDrawer(); renderCargo(); calculateAndRender(); };
window.duplicateCargo = function(i){ state.cargo.splice(i+1,0,clone(state.cargo[i])); closeDrawer(); renderCargo(); calculateAndRender(); };

function flagClass(name){ return cargoFlags.find(f => f.name === name)?.style || "flagPill"; }

function loadChargePresets(){
  $("chargePresetSelect").innerHTML = Object.keys(chargePresets).map(name => `<option>${esc(name)}</option>`).join("");
}

function applyChargePreset(){
  const name = $("chargePresetSelect").value;
  state.preset = name;
  state.charges = clone(chargePresets[name] || []);
  renderCharges();
  calculateAndRender();
}

function saveChargePreset(){
  const name = prompt("Preset name?");
  if(!name) return;
  chargePresets[name] = clone(state.charges);
  saveLocal("chargePresets", chargePresets);
  loadChargePresets();
  $("chargePresetSelect").value = name;
}

function renderChargeLibraryChips(){
  $("chargeLibraryChips").innerHTML = chargeLibrary.map((ch,i)=>`<button class="chip" onclick="addChargeFromLibrary(${i})">+ ${esc(ch.name)}</button>`).join("");
}

window.addChargeFromLibrary = function(i){
  state.charges.push(clone(chargeLibrary[i]));
  renderCharges();
  calculateAndRender();
};

function addCharge(){
  state.charges.push({ name:"Other Charge", type:"flat", rate:0, qty:1, min:0 });
  renderCharges();
  calculateAndRender();
  editCharge(state.charges.length - 1);
}

function renderCharges(){
  const d = calculate();
  $("chargesList").innerHTML = state.charges.length ? state.charges.map((c,i)=>{
    const calc = d.calcCharges[i] || { amount:0, calcQty:c.qty };
    return `
      <div class="row-card" ontouchstart="startSwipe(event,this)" ontouchmove="moveSwipe(event,this)" ontouchend="endSwipeCharge(event,this,${i})" onclick="editCharge(${i})">
        <div>
          <div class="row-title">${esc(c.name)} <span class="pill">${esc(c.type.replaceAll("_"," "))}</span></div>
          <div class="row-meta">Rate ${money(c.rate)} | Qty ${Number(calc.calcQty || 0).toFixed(2)} | Min ${money(c.min)}</div>
        </div>
        <div>
          <strong>${money(calc.amount)}</strong><br>
          <button class="ghost" onclick="event.stopPropagation();editCharge(${i})">${arrowSvg()}</button>
        </div>
      </div>
    `;
  }).join("") : `<div class="empty">No charges yet.</div>`;
}

window.editCharge = function(i){
  editing = { type:"charge", index:i };
  const c = state.charges[i];
  openDrawer(`
    <div class="drawer-head"><h3>Edit Charge</h3><button class="primary" onclick="closeDrawer()">Done</button></div>
    <label>Name</label><input id="chName" value="${esc(c.name)}">
    <label>Type</label>
    <select id="chType">
      <option value="flat" ${c.type==="flat"?"selected":""}>Flat</option>
      <option value="per_chargeable_kg" ${c.type==="per_chargeable_kg"?"selected":""}>Per Chargeable KG</option>
      <option value="per_cbm" ${c.type==="per_cbm"?"selected":""}>Per CBM</option>
      <option value="per_piece" ${c.type==="per_piece"?"selected":""}>Per Piece</option>
    </select>
    <div class="button-row">
      <div style="flex:1"><label>Rate</label><input id="chRate" type="number" value="${c.rate}"></div>
      <div style="flex:1"><label>Manual Qty</label><input id="chQty" type="number" value="${c.qty}"></div>
    </div>
    <label>Minimum</label><input id="chMin" type="number" value="${c.min}">
    <div class="drawer-footer">
      <button class="red" onclick="deleteCharge(${i})">Delete</button>
      <button class="ghost" onclick="saveChargeToLibrary(${i})">To Library</button>
      <button class="primary" onclick="closeDrawer()">Done</button>
    </div>
  `);
  ["chName","chType","chRate","chQty","chMin"].forEach(id => $(id).oninput = liveChargeEdit);
  $("chType").onchange = liveChargeEdit;
};

function liveChargeEdit(){
  const i = editing.index;
  state.charges[i] = {
    name:$("chName").value,
    type:$("chType").value,
    rate:Number($("chRate").value || 0),
    qty:Number($("chQty").value || 0),
    min:Number($("chMin").value || 0)
  };
  renderCharges();
  calculateAndRender();
}

window.deleteCharge = function(i){ state.charges.splice(i,1); closeDrawer(); renderCharges(); calculateAndRender(); };
window.saveChargeToLibrary = function(i){ chargeLibrary.push(clone(state.charges[i])); saveLocal("chargeLibrary", chargeLibrary); renderChargeLibraryChips(); alert("Saved to charge library."); };

function calculate(){
  let pieces = 0, totalKg = 0, cbm = 0;
  state.cargo.forEach(c => {
    pieces += Number(c.qty || 0);
    totalKg += toKg(Number(c.weight || 0), c.wUnit) * Number(c.qty || 0);
    cbm += (toCm(Number(c.l || 0), c.dUnit) * toCm(Number(c.w || 0), c.dUnit) * toCm(Number(c.h || 0), c.dUnit) * Number(c.qty || 0)) / 1000000;
  });
  const volKg = cbm * 167;
  const preset = (state.preset || "Air Export Standard").toLowerCase();
  const isAir = preset.includes("air");
  const isOcean = preset.includes("ocean");
  const chargeable = isAir ? Math.max(totalKg, volKg) : isOcean ? cbm : totalKg;
  const unit = isOcean ? "CBM" : "KG";
  let subtotal = 0;
  const calcCharges = state.charges.map(ch => {
    let q = Number(ch.qty || 0);
    if(ch.type === "per_chargeable_kg") q = chargeable;
    if(ch.type === "per_cbm") q = cbm;
    if(ch.type === "per_piece") q = pieces;
    let amount = q * Number(ch.rate || 0);
    if(Number(ch.min || 0) > 0 && amount < Number(ch.min)) amount = Number(ch.min);
    subtotal += amount;
    return { ...ch, calcQty:q, amount };
  });
  return { pieces,totalKg,cbm,volKg,chargeable,unit,subtotal,calcCharges };
}

function calculateAndRender(){
  const d = calculate();
  $("summaryWeight").innerText = `${d.totalKg.toFixed(2)} KG`;
  $("summaryCbm").innerText = d.cbm.toFixed(4);
  $("summaryVolKg").innerText = d.volKg.toFixed(2);
  $("summaryChargeable").innerText = `${d.chargeable.toFixed(2)} ${d.unit}`;
  renderPreview(d);
  renderDesignerPreview(d);
}

function renderPreview(d){
  $("quotePreview").innerHTML = buildPreviewHtml(d);
}

function buildPreviewHtml(d){
  const visibleInfo = state.infoFields.filter(f => f.visible && f.value);
  const visibleRoute = state.routeFields.filter(f => f.visible && f.value);
  const quoteNo = field("Quote Number") || "Q-0001";
  const cargoFlagsUsed = [...new Set(state.cargo.flatMap(c => c.flags || []))];
  const flagHtml = cargoFlagsUsed.length ? `<div style="margin-top:8px">${cargoFlagsUsed.map(f => `<span class="pill ${flagClass(f)}">${esc(f)}</span>`).join(" ")}</div>` : "";
  const sections = {
    quote: visibleInfo.length ? `<h3>Quote Info</h3><table>${visibleInfo.map(f=>`<tr><th>${esc(f.label)}</th><td>${esc(f.value)}</td></tr>`).join("")}</table>` : "",
    route: visibleRoute.length ? `<h3>Route</h3><table>${visibleRoute.map(f=>`<tr><th>${esc(f.label)}</th><td>${esc(f.value)}</td></tr>`).join("")}</table>` : "",
    cargo: `<h3>Cargo Summary</h3><table><tr><th>Pieces</th><th>Weight</th><th>CBM</th><th>Vol KG</th><th>Chargeable</th></tr><tr><td>${d.pieces}</td><td>${d.totalKg.toFixed(2)} KG</td><td>${d.cbm.toFixed(4)}</td><td>${d.volKg.toFixed(2)}</td><td>${d.chargeable.toFixed(2)} ${d.unit}</td></tr></table>${flagHtml}`,
    charges: `<h3>Charges</h3><table><tr><th>Charge</th><th>Rate</th><th>Qty</th><th style="text-align:right">Amount</th></tr>${d.calcCharges.map(c=>`<tr><td>${esc(c.name)}</td><td>${money(c.rate)}</td><td>${Number(c.calcQty || 0).toFixed(2)}</td><td style="text-align:right">${money(c.amount)}</td></tr>`).join("")}</table><div class="preview-total" style="color:${state.design.accent}">Total ${money(d.subtotal)}</div>`,
    terms: `<h3>Terms and Conditions</h3><p style="font-size:12px;color:#475569;line-height:1.5">${esc(state.terms)}</p>`
  };
  const ordered = state.design.sectionOrder.map(s => sections[s] || "").join("");
  const image = state.design.extraImageUrl ? `<img src="${esc(state.design.extraImageUrl)}" style="width:100%;max-height:160px;object-fit:cover;border-radius:16px;margin-bottom:12px">` : "";
  const html = `
    <div class="preview-header" style="border-bottom-color:${state.design.accent}">
      <div style="display:flex;gap:10px;align-items:center">
        <img class="preview-logo" src="${esc(state.design.logoUrl || LOGO_URL)}" alt="MIP">
        <div><h2 style="margin:0">${esc(state.design.title)}</h2><div class="row-meta">${esc(state.design.subtitle)}</div></div>
      </div>
      <div style="text-align:right"><strong>QUOTE</strong><br><span class="row-meta">${esc(quoteNo)}</span></div>
    </div>
    ${image}
    ${ordered}
  `;
  const cls = `quote-preview ${state.design.style === "premium" ? "" : state.design.style}`;
  setTimeout(() => {
    $("quotePreview")?.setAttribute("class", cls);
    $("designerPreview")?.setAttribute("class", cls);
  },0);
  return html;
}

async function copyEmailQuote(){
  calculateAndRender();
  const html = `<div style="font-family:Arial,sans-serif;max-width:760px;width:100%;box-sizing:border-box">${$("quotePreview").innerHTML}</div>`;
  const plain = buildEmailText();
  try{
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], {type:"text/html"}),
        "text/plain": new Blob([plain], {type:"text/plain"})
      })
    ]);
    alert("Formatted quote copied.");
  }catch{
    await navigator.clipboard.writeText(plain);
    alert("Plain text copied.");
  }
}

function buildEmailText(){
  const d = calculate();
  const lines = ["MIP Cargo Express", `Quote #: ${field("Quote Number") || ""}`, ""];
  state.infoFields.filter(f => f.visible && f.value).forEach(f => lines.push(`${f.label}: ${f.value}`));
  lines.push("","Route:");
  state.routeFields.filter(f => f.visible && f.value).forEach(f => lines.push(`${f.label}: ${f.value}`));
  lines.push("","Cargo Summary:",`Pieces: ${d.pieces}`,`Weight: ${d.totalKg.toFixed(2)} KG`,`CBM: ${d.cbm.toFixed(4)}`,`Chargeable: ${d.chargeable.toFixed(2)} ${d.unit}`,"","Charges:");
  d.calcCharges.forEach(c => lines.push(`${c.name}: ${money(c.amount)}`));
  lines.push("",`Total: ${money(d.subtotal)}`,"","Terms:",state.terms);
  return lines.join("\n");
}

function quotePayload(){
  return {
    infoFields:state.infoFields,
    routeFields:state.routeFields,
    cargo:state.cargo,
    charges:state.charges,
    terms:state.terms,
    preset:state.preset,
    design:state.design
  };
}

function applyQuotePayload(data){
  state.infoFields = data.infoFields || safeClone(defaultInfoFields);
  state.routeFields = data.routeFields || safeClone(defaultRouteFields);
  state.cargo = data.cargo || [];
  state.charges = data.charges || [];
  state.terms = data.terms || state.terms;
  state.preset = data.preset || "Air Export Standard";
  state.design = data.design || state.design;
  $("termsBox").value = state.terms;
  renderAll();
  calculateAndRender();
}

async function saveQuote(){
  const payload = quotePayload();
  const quote_number = field("Quote Number") || null;
  const customer_name = field("Customer") || null;
  localStorage.setItem("mipCurrentQuote", JSON.stringify(payload));
  if(!db){ alert("Saved locally. Supabase not connected."); return; }
  const row = {
    quote_number,
    customer_name,
    status:state.currentStatus || "draft",
    quote_data:payload,
    updated_at:new Date().toISOString()
  };
  let result;
  if(state.currentQuoteId){
    result = await db.from("quotes").update(row).eq("id",state.currentQuoteId).select().single();
  }else{
    result = await db.from("quotes").insert(row).select().single();
  }
  if(result.error){ alert("Save error: " + result.error.message); return; }
  state.currentQuoteId = result.data.id;
  alert("Quote saved.");
  loadDashboard();
  loadQuotes();
}

async function loadDashboard(){
  if(!db) return;
  const res = await db.from("quotes").select("*").order("updated_at",{ascending:false}).limit(50);
  if(res.error) return;
  const rows = res.data || [];
  $("dashDrafts").innerText = rows.filter(r => (r.status || "draft") === "draft").length;
  $("dashSent").innerText = rows.filter(r => r.status === "sent").length;
  $("dashAccepted").innerText = rows.filter(r => r.status === "accepted").length;
  let total = 0;
  rows.forEach(r => total += totalFromPayload(r.quote_data));
  $("dashTotal").innerText = money(total);
  $("recentQuotesList").innerHTML = rows.slice(0,5).map(quoteRowHtml).join("") || `<div class="empty">No quotes yet.</div>`;
}

function bindQuotesPage(){
  $("newQuoteButton").onclick = newBlankQuote;
  ["quoteSearch","quoteStatusFilter","quoteDateFilter","quoteViewMode"].forEach(id => $(id).oninput = loadQuotes);
  $("quoteStatusFilter").onchange = loadQuotes;
  $("quoteDateFilter").onchange = loadQuotes;
  $("quoteViewMode").onchange = loadQuotes;
}

async function loadQuotes(){
  if(!db){ $("quotesBoard").innerHTML = `<div class="empty">Supabase not connected.</div>`; return; }
  const res = await db.from("quotes").select("*").order("updated_at",{ascending:false}).limit(200);
  if(res.error){ $("quotesBoard").innerHTML = `<div class="empty">${esc(res.error.message)}</div>`; return; }
  let rows = res.data || [];
  const q = $("quoteSearch").value.toLowerCase();
  const status = $("quoteStatusFilter").value;
  const days = $("quoteDateFilter").value;
  if(q) rows = rows.filter(r => [r.quote_number,r.customer_name,r.status,JSON.stringify(r.quote_data||{})].join(" ").toLowerCase().includes(q));
  if(status !== "all") rows = rows.filter(r => (r.status || "draft") === status);
  if(days !== "all"){
    const cutoff = Date.now() - Number(days) * 86400000;
    rows = rows.filter(r => new Date(r.updated_at || r.created_at).getTime() >= cutoff);
  }
  if($("quoteViewMode").value === "list") renderQuoteList(rows);
  else renderQuoteKanban(rows);
}

function renderQuoteList(rows){
  $("quotesBoard").innerHTML = `<div class="list-stack">${rows.map(quoteRowHtml).join("") || `<div class="empty">No quotes found.</div>`}</div>`;
}

function renderQuoteKanban(rows){
  const statuses = ["draft","sent","accepted","rejected"];
  const labels = {draft:"Draft",sent:"Sent",accepted:"Accepted",rejected:"Rejected"};
  $("quotesBoard").innerHTML = `<div class="kanban">${statuses.map(st => `
    <div class="kanban-col">
      <div class="kanban-title">${labels[st]} <span class="pill">${rows.filter(r => (r.status||"draft") === st).length}</span></div>
      ${rows.filter(r => (r.status||"draft") === st).map(quoteCardHtml).join("") || `<div class="empty">Empty</div>`}
    </div>
  `).join("")}</div>`;
}

function quoteRowHtml(r){
  const status = r.status || "draft";
  const total = totalFromPayload(r.quote_data);
  const date = new Date(r.updated_at || r.created_at).toLocaleDateString();
  return `
    <div class="row-card" onclick="openQuote('${r.id}')">
      <div>
        <div class="row-title">${esc(r.quote_number || "Untitled Quote")} <span class="pill ${status}">${status}</span></div>
        <div class="row-meta">${esc(r.customer_name || "No customer")} | ${money(total)} | ${date}</div>
      </div>
      <select onclick="event.stopPropagation()" onchange="updateQuoteStatus('${r.id}',this.value)">
        <option value="draft" ${status==="draft"?"selected":""}>Draft</option>
        <option value="sent" ${status==="sent"?"selected":""}>Sent</option>
        <option value="accepted" ${status==="accepted"?"selected":""}>Accepted</option>
        <option value="rejected" ${status==="rejected"?"selected":""}>Rejected</option>
      </select>
    </div>
  `;
}

function quoteCardHtml(r){
  const status = r.status || "draft";
  const total = totalFromPayload(r.quote_data);
  const date = new Date(r.updated_at || r.created_at).toLocaleDateString();
  return `
    <div class="quote-card" onclick="openQuote('${r.id}')">
      <div class="row-title">${esc(r.quote_number || "Untitled Quote")}</div>
      <div class="row-meta">${esc(r.customer_name || "No customer")}</div>
      <div style="font-size:20px;font-weight:950;margin:8px 0">${money(total)}</div>
      <div class="row-meta">${date}</div>
      <select style="margin-top:8px" onclick="event.stopPropagation()" onchange="updateQuoteStatus('${r.id}',this.value)">
        <option value="draft" ${status==="draft"?"selected":""}>Draft</option>
        <option value="sent" ${status==="sent"?"selected":""}>Sent</option>
        <option value="accepted" ${status==="accepted"?"selected":""}>Accepted</option>
        <option value="rejected" ${status==="rejected"?"selected":""}>Rejected</option>
      </select>
    </div>
  `;
}

async function openQuote(id){
  const res = await db.from("quotes").select("*").eq("id",id).single();
  if(res.error){ alert(res.error.message); return; }
  state.currentQuoteId = id;
  state.currentStatus = res.data.status || "draft";
  applyQuotePayload(res.data.quote_data || {});
  goPage("quoteBuilderPage");
}

window.updateQuoteStatus = async function(id,status){
  const res = await db.from("quotes").update({status,updated_at:new Date().toISOString()}).eq("id",id);
  if(res.error){ alert(res.error.message); return; }
  if(state.currentQuoteId === id) state.currentStatus = status;
  loadQuotes();
  loadDashboard();
};

function totalFromPayload(payload){
  if(!payload) return 0;
  const saved = { cargo:state.cargo, charges:state.charges, preset:state.preset };
  state.cargo = payload.cargo || [];
  state.charges = payload.charges || [];
  state.preset = payload.preset || "Air Export Standard";
  const total = calculate().subtotal || 0;
  state.cargo = saved.cargo;
  state.charges = saved.charges;
  state.preset = saved.preset;
  return total;
}

function newBlankQuote(){
  state.currentQuoteId = "";
  state.currentStatus = "draft";
  state.infoFields = safeClone(defaultInfoFields);
  state.routeFields = safeClone(defaultRouteFields);
  state.cargo = [];
  state.charges = [];
  state.terms = "Quote is subject to final weight, dimensions, carrier acceptance, availability, customs requirements, exams, storage, waiting time, and applicable accessorial charges.";
  state.preset = "Air Export Standard";
  applyChargePreset();
  newCargo(false);
  renderAll();
  calculateAndRender();
  goPage("quoteBuilderPage");
}

async function handleCustomerInput(){
  const q = $("customerInput").value.toLowerCase();
  setField("Customer", $("customerInput").value, true);
  renderInfoFields();
  calculateAndRender();
  if(!db || !q){ $("customerSuggestBox").style.display = "none"; return; }
  const res = await db.from("customers").select("*").limit(8);
  if(res.error) return;
  const rows = (res.data || []).filter(c => [c.company,c.contact,c.email,c.phone].join(" ").toLowerCase().includes(q)).slice(0,8);
  $("customerSuggestBox").innerHTML = rows.map(c => `
    <div class="suggest-row" onclick="selectCustomer('${c.id}')">
      <strong>${esc(c.company || "Unnamed")}</strong><br>
      <span class="row-meta">${esc(c.contact || "")} | ${esc(c.email || "")}</span>
    </div>
  `).join("");
  $("customerSuggestBox").style.display = rows.length ? "block" : "none";
}

function bindCustomersPage(){
  $("addCustomerButton").onclick = () => editCustomer();
  $("refreshCustomersButton").onclick = loadCustomers;
  $("customerSearch").oninput = loadCustomers;
}

async function loadCustomers(){
  if(!db){ $("customersList").innerHTML = `<div class="empty">Supabase not connected.</div>`; return; }
  const res = await db.from("customers").select("*").order("updated_at",{ascending:false}).limit(100);
  if(res.error){ $("customersList").innerHTML = `<div class="empty">Create customers table first.</div>`; return; }
  const q = $("customerSearch").value.toLowerCase();
  let rows = res.data || [];
  if(q) rows = rows.filter(c => [c.company,c.contact,c.email,c.phone,JSON.stringify(c.data||{})].join(" ").toLowerCase().includes(q));
  $("customersList").innerHTML = rows.map(c => `
    <div class="row-card" onclick="selectCustomer('${c.id}')">
      <div>
        <div class="row-title">${esc(c.company || "Unnamed")}</div>
        <div class="row-meta">${esc(c.contact || "")} | ${esc(c.email || "")} | ${esc(c.phone || "")}</div>
      </div>
      <button class="ghost" onclick="event.stopPropagation();editCustomer('${c.id}')">${arrowSvg()}</button>
    </div>
  `).join("") || `<div class="empty">No customers found.</div>`;
}

window.selectCustomer = async function(id){
  const res = await db.from("customers").select("*").eq("id",id).single();
  if(res.error){ alert(res.error.message); return; }
  setField("Customer",res.data.company || "",true);
  setField("Contact",res.data.contact || "",false);
  setField("Email",res.data.email || "",false);
  setField("Phone",res.data.phone || "",false);
  const d = res.data.data || {};
  if(d.address) setField("Address",d.address,false);
  if(d.tax_id) setField("Tax ID",d.tax_id,false);
  $("customerInput").value = res.data.company || "";
  $("customerSuggestBox").style.display = "none";
  renderInfoFields();
  calculateAndRender();
  goPage("quoteBuilderPage");
};

window.editCustomer = async function(id=""){
  let c = { company:"",contact:"",email:"",phone:"",data:{} };
  if(id){
    const res = await db.from("customers").select("*").eq("id",id).single();
    if(res.error){ alert(res.error.message); return; }
    c = res.data;
  }
  const d = c.data || {};
  openDrawer(`
    <div class="drawer-head"><h3>${id ? "Edit" : "New"} Customer</h3><button class="primary" onclick="saveCustomer('${id}')">Save</button></div>
    <label>Company</label><input id="custCompany" value="${esc(c.company)}">
    <label>Contact</label><input id="custContact" value="${esc(c.contact)}">
    <label>Email</label><input id="custEmail" value="${esc(c.email)}">
    <label>Phone</label><input id="custPhone" value="${esc(c.phone)}">
    <label>Address</label><textarea id="custAddress">${esc(d.address)}</textarea>
    <label>Tax ID</label><input id="custTax" value="${esc(d.tax_id)}">
    <div class="drawer-footer">
      <button class="red" onclick="deleteCustomer('${id}')">Delete</button>
      <button class="ghost" onclick="closeDrawer()">Cancel</button>
      <button class="primary" onclick="saveCustomer('${id}')">Save</button>
    </div>
  `);
};

window.saveCustomer = async function(id){
  if(!$("custCompany").value.trim()){ alert("Company is required."); return; }
  const row = {
    company:$("custCompany").value.trim(),
    contact:$("custContact").value.trim(),
    email:$("custEmail").value.trim(),
    phone:$("custPhone").value.trim(),
    data:{ address:$("custAddress").value, tax_id:$("custTax").value },
    updated_at:new Date().toISOString()
  };
  const res = id ? await db.from("customers").update(row).eq("id",id) : await db.from("customers").insert(row);
  if(res.error){ alert(res.error.message); return; }
  closeDrawer();
  loadCustomers();
};

window.deleteCustomer = async function(id){
  if(!id){ closeDrawer(); return; }
  if(!confirm("Delete this customer?")) return;
  const res = await db.from("customers").delete().eq("id",id);
  if(res.error){ alert(res.error.message); return; }
  closeDrawer();
  loadCustomers();
};

function bindLibraries(){
  $("libraryAddChargeButton").onclick = () => editLibraryCharge();
  $("libraryAddFlagButton").onclick = () => editCargoFlag();
  renderLibraries();
}

function renderLibraries(){
  $("libraryChargeList").innerHTML = chargeLibrary.map((ch,i)=>`
    <div class="row-card">
      <div><div class="row-title">${esc(ch.name)}</div><div class="row-meta">${esc(ch.type)} | ${money(ch.rate)} | Min ${money(ch.min)}</div></div>
      <button class="ghost" onclick="editLibraryCharge(${i})">${arrowSvg()}</button>
    </div>
  `).join("");
  $("libraryFlagList").innerHTML = cargoFlags.map((f,i)=>`
    <div class="row-card">
      <div><div class="row-title">${esc(f.name)} <span class="pill ${f.style}">Label</span></div><div class="row-meta">${esc(f.style)}</div></div>
      <button class="ghost" onclick="editCargoFlag(${i})">${arrowSvg()}</button>
    </div>
  `).join("");
}

window.editLibraryCharge = function(i=null){
  const ch = i === null ? { name:"New Charge",type:"flat",rate:0,qty:1,min:0 } : chargeLibrary[i];
  openDrawer(`
    <div class="drawer-head"><h3>Library Charge</h3><button class="primary" onclick="saveLibraryCharge(${i===null ? -1 : i})">Save</button></div>
    <label>Name</label><input id="libName" value="${esc(ch.name)}">
    <label>Type</label><select id="libType">
      <option value="flat" ${ch.type==="flat"?"selected":""}>Flat</option>
      <option value="per_chargeable_kg" ${ch.type==="per_chargeable_kg"?"selected":""}>Per Chargeable KG</option>
      <option value="per_cbm" ${ch.type==="per_cbm"?"selected":""}>Per CBM</option>
      <option value="per_piece" ${ch.type==="per_piece"?"selected":""}>Per Piece</option>
    </select>
    <label>Rate</label><input id="libRate" type="number" value="${ch.rate}">
    <label>Qty</label><input id="libQty" type="number" value="${ch.qty}">
    <label>Min</label><input id="libMin" type="number" value="${ch.min}">
    <div class="drawer-footer">
      <button class="red" onclick="deleteLibraryCharge(${i===null ? -1 : i})">Delete</button>
      <button class="ghost" onclick="closeDrawer()">Cancel</button>
      <button class="primary" onclick="saveLibraryCharge(${i===null ? -1 : i})">Save</button>
    </div>
  `);
};

window.saveLibraryCharge = function(i){
  const item = { name:$("libName").value, type:$("libType").value, rate:Number($("libRate").value||0), qty:Number($("libQty").value||0), min:Number($("libMin").value||0) };
  if(i < 0) chargeLibrary.push(item);
  else chargeLibrary[i] = item;
  saveLocal("chargeLibrary",chargeLibrary);
  closeDrawer();
  renderLibraries();
  renderChargeLibraryChips();
};

window.deleteLibraryCharge = function(i){
  if(i >= 0) chargeLibrary.splice(i,1);
  saveLocal("chargeLibrary",chargeLibrary);
  closeDrawer();
  renderLibraries();
  renderChargeLibraryChips();
};

window.editCargoFlag = function(i=null){
  const f = i === null ? { name:"New Flag",style:"flagPill" } : cargoFlags[i];
  openDrawer(`
    <div class="drawer-head"><h3>Cargo Flag</h3><button class="primary" onclick="saveCargoFlag(${i===null ? -1 : i})">Save</button></div>
    <label>Name</label><input id="flagName" value="${esc(f.name)}">
    <label>Style</label><select id="flagStyle">
      <option value="flagPill" ${f.style==="flagPill"?"selected":""}>Blue</option>
      <option value="dangerPill" ${f.style==="dangerPill"?"selected":""}>Red / DG</option>
      <option value="coldPill" ${f.style==="coldPill"?"selected":""}>Cold</option>
    </select>
    <div class="drawer-footer">
      <button class="red" onclick="deleteCargoFlag(${i===null ? -1 : i})">Delete</button>
      <button class="ghost" onclick="closeDrawer()">Cancel</button>
      <button class="primary" onclick="saveCargoFlag(${i===null ? -1 : i})">Save</button>
    </div>
  `);
};

window.saveCargoFlag = function(i){
  const item = { name:$("flagName").value, style:$("flagStyle").value };
  if(i < 0) cargoFlags.push(item);
  else cargoFlags[i] = item;
  saveLocal("cargoFlags",cargoFlags);
  closeDrawer();
  renderLibraries();
  renderCargo();
  calculateAndRender();
};

window.deleteCargoFlag = function(i){
  if(i >= 0){
    const removed = cargoFlags[i].name;
    cargoFlags.splice(i,1);
    state.cargo.forEach(c => c.flags = (c.flags||[]).filter(f => f !== removed));
  }
  saveLocal("cargoFlags",cargoFlags);
  closeDrawer();
  renderLibraries();
  renderCargo();
  calculateAndRender();
};

function bindDesigner(){
  $("saveDesignButton").onclick = () => { saveLocal("mipDesign",state.design); alert("Design saved."); };
  ["designStyle","designAccent","designTitle","designSubtitle","designLogoUrl","designExtraImageUrl"].forEach(id => {
    $(id).oninput = liveDesignEdit;
    $(id).onchange = liveDesignEdit;
  });
}

function renderDesigner(){
  $("designStyle").value = state.design.style;
  $("designAccent").value = state.design.accent;
  $("designTitle").value = state.design.title;
  $("designSubtitle").value = state.design.subtitle;
  $("designLogoUrl").value = state.design.logoUrl;
  $("designExtraImageUrl").value = state.design.extraImageUrl;
  renderSectionOrder();
  renderDesignerPreview(calculate());
}

function liveDesignEdit(){
  state.design.style = $("designStyle").value;
  state.design.accent = $("designAccent").value;
  state.design.title = $("designTitle").value;
  state.design.subtitle = $("designSubtitle").value;
  state.design.logoUrl = $("designLogoUrl").value;
  state.design.extraImageUrl = $("designExtraImageUrl").value;
  calculateAndRender();
}

function renderDesignerPreview(d){
  const el = $("designerPreview");
  if(el) el.innerHTML = buildPreviewHtml(d);
}

function renderSectionOrder(){
  const names = { quote:"Quote Info", route:"Route", cargo:"Cargo", charges:"Charges", terms:"Terms" };
  $("sectionOrderList").innerHTML = state.design.sectionOrder.map((s,i)=>`
    <div class="row-card">
      <div><div class="row-title">${names[s]}</div><div class="row-meta">Move this section in quote preview.</div></div>
      <div class="button-row">
        <button class="ghost" onclick="moveSection(${i},-1)">Up</button>
        <button class="ghost" onclick="moveSection(${i},1)">Down</button>
      </div>
    </div>
  `).join("");
}

window.moveSection = function(i,dir){
  const j = i + dir;
  if(j < 0 || j >= state.design.sectionOrder.length) return;
  const tmp = state.design.sectionOrder[i];
  state.design.sectionOrder[i] = state.design.sectionOrder[j];
  state.design.sectionOrder[j] = tmp;
  renderSectionOrder();
  calculateAndRender();
};

function openDrawer(html){
  $("drawerContent").innerHTML = html;
  $("drawer").classList.add("open");
  $("drawerScrim").classList.add("show");
}
window.closeDrawer = function(){
  $("drawer").classList.remove("open");
  $("drawerScrim").classList.remove("show");
  editing = null;
};

window.startSwipe = function(e,el){ swipe.moved=false; swipe.startX=e.touches[0].clientX; swipe.currentX=swipe.startX; };
window.moveSwipe = function(e,el){
  swipe.currentX=e.touches[0].clientX;
  const diff = swipe.currentX - swipe.startX;
  if(diff < -20){ swipe.moved=true; el.style.transform=`translateX(${Math.max(diff,-95)}px)`; el.style.opacity=Math.max(.35,1+diff/180); }
};
window.endSwipeCargo = function(e,el,i){
  const diff = swipe.currentX - swipe.startX;
  if(diff < -85) window.deleteCargo(i);
  else { el.style.transform="translateX(0)"; el.style.opacity="1"; }
  setTimeout(()=>swipe.moved=false,80);
};
window.endSwipeCharge = function(e,el,i){
  const diff = swipe.currentX - swipe.startX;
  if(diff < -85) window.deleteCharge(i);
  else { el.style.transform="translateX(0)"; el.style.opacity="1"; }
  setTimeout(()=>swipe.moved=false,80);
};

function escJs(v){ return String(v || "").replaceAll("\\","\\\\").replaceAll("'","\\'").replaceAll("\n"," "); }

async function checkSupabase(){
  if(!db){ $("supabaseStatus").innerText = "Not connected. Check CDN or keys."; return; }
  const res = await db.from("quotes").select("id").limit(1);
  $("supabaseStatus").innerText = res.error ? `Connected but query failed: ${res.error.message}` : "Connected.";
}


window.goPage = goPage;
window.editCustomer = window.editCustomer;
window.selectCustomer = window.selectCustomer;
window.updateQuoteStatus = window.updateQuoteStatus;
window.editInfoField = window.editInfoField;
window.editRouteField = window.editRouteField;
window.applyRouteTemplate = window.applyRouteTemplate;
window.saveCurrentRouteTemplate = window.saveCurrentRouteTemplate;
window.deleteRouteTemplate = window.deleteRouteTemplate;
window.toggleRouteShortcut = window.toggleRouteShortcut;
window.editCargo = window.editCargo;
window.deleteCargo = window.deleteCargo;
window.duplicateCargo = window.duplicateCargo;
window.toggleCargoFlag = window.toggleCargoFlag;
window.editCharge = window.editCharge;
window.deleteCharge = window.deleteCharge;
window.saveChargeToLibrary = window.saveChargeToLibrary;
window.addChargeFromLibrary = window.addChargeFromLibrary;
window.editLibraryCharge = window.editLibraryCharge;
window.saveLibraryCharge = window.saveLibraryCharge;
window.deleteLibraryCharge = window.deleteLibraryCharge;
window.editCargoFlag = window.editCargoFlag;
window.saveCargoFlag = window.saveCargoFlag;
window.deleteCargoFlag = window.deleteCargoFlag;
window.moveSection = window.moveSection;
window.startSwipe = window.startSwipe;
window.moveSwipe = window.moveSwipe;
window.endSwipeCargo = window.endSwipeCargo;
window.endSwipeCharge = window.endSwipeCharge;
window.closeDrawer = window.closeDrawer;
window.goPageFromDrawer = window.goPageFromDrawer;

try{
  init();
  setAppStatus("MIP OS loaded. If Supabase tables exist, data will sync automatically.","ok");
}catch(e){
  setAppStatus("MIP OS failed to start: " + e.message,"err");
  console.error(e);
}

