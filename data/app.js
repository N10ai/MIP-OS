export const LOGO_URL = "https://images.fillout.com/orgid-278758/flowpublicid-sq68cpvhvb/widgetid-default/vLdctMaEwcPZsqqgYeQmyE/pasted-image-1773071890634.png";

export const defaultInfoFields = [
  { label:"Quote Number", value:"", visible:true },
  { label:"Customer", value:"", visible:true },
  { label:"Contact", value:"", visible:false },
  { label:"Email", value:"", visible:false },
  { label:"Phone", value:"", visible:false },
  { label:"Commodity", value:"", visible:true },
  { label:"Currency", value:"USD", visible:false }
];

export const defaultRouteFields = [
  { label:"Origin", value:"MIA", visible:true },
  { label:"Destination", value:"", visible:true },
  { label:"Incoterm", value:"FCA", visible:true },
  { label:"Carrier", value:"", visible:true },
  { label:"Frequency", value:"", visible:true },
  { label:"Transit Time", value:"", visible:true }
];

export const defaultCargoFlags = [
  { name:"Oversized", style:"flagPill" },
  { name:"DG/Hazmat", style:"dangerPill" },
  { name:"Refrigerated", style:"coldPill" },
  { name:"Bonded", style:"flagPill" },
  { name:"FTZ", style:"flagPill" },
  { name:"Fragile", style:"flagPill" }
];

export const defaultChargeLibrary = [
  { name:"Bonded Fee", type:"flat", rate:120, qty:1, min:120 },
  { name:"Airport Transfer", type:"flat", rate:150, qty:1, min:150 },
  { name:"Storage", type:"flat", rate:0, qty:1, min:0 },
  { name:"Waiting Time", type:"flat", rate:0, qty:1, min:0 },
  { name:"Liftgate", type:"flat", rate:95, qty:1, min:95 },
  { name:"Residential Delivery", type:"flat", rate:125, qty:1, min:125 },
  { name:"Customs Entry", type:"flat", rate:150, qty:1, min:150 },
  { name:"TSA Screening", type:"per_chargeable_kg", rate:0.10, qty:0, min:35 },
  { name:"Docs Fee", type:"flat", rate:75, qty:1, min:75 },
  { name:"Palletizing", type:"per_piece", rate:25, qty:0, min:50 }
];

export const defaultChargePresets = {
  "Air Export Standard": [
    { name:"Air Freight", type:"per_chargeable_kg", rate:0, qty:0, min:50 },
    { name:"Handling", type:"per_piece", rate:15, qty:0, min:50 },
    { name:"AWB Fee", type:"flat", rate:75, qty:1, min:75 },
    { name:"AES Filing", type:"flat", rate:85, qty:1, min:85 },
    { name:"Pickup", type:"flat", rate:0, qty:1, min:0 },
    { name:"Bonded Fee", type:"flat", rate:120, qty:0, min:120 },
    { name:"Airport Transfer", type:"flat", rate:150, qty:0, min:150 }
  ],
  "Air Import Standard": [
    { name:"Air Freight", type:"per_chargeable_kg", rate:0, qty:0, min:50 },
    { name:"Handling", type:"per_piece", rate:15, qty:0, min:50 },
    { name:"AWB Fee", type:"flat", rate:75, qty:1, min:75 },
    { name:"Import Documentation", type:"flat", rate:95, qty:1, min:95 },
    { name:"Airport Recovery", type:"flat", rate:150, qty:1, min:150 },
    { name:"Delivery / Pickup", type:"flat", rate:0, qty:1, min:0 },
    { name:"Bonded Fee", type:"flat", rate:120, qty:0, min:120 }
  ],
  "Ocean Export Standard": [
    { name:"Ocean Freight", type:"per_cbm", rate:0, qty:0, min:100 },
    { name:"Handling", type:"per_piece", rate:15, qty:0, min:50 },
    { name:"Export Documentation", type:"flat", rate:95, qty:1, min:95 },
    { name:"Bill of Lading Fee", type:"flat", rate:85, qty:1, min:85 },
    { name:"Pickup", type:"flat", rate:0, qty:1, min:0 }
  ],
  "Ocean Import Standard": [
    { name:"Ocean Freight", type:"per_cbm", rate:0, qty:0, min:100 },
    { name:"Handling", type:"per_piece", rate:15, qty:0, min:50 },
    { name:"Import Documentation", type:"flat", rate:125, qty:1, min:125 },
    { name:"Delivery Order Fee", type:"flat", rate:95, qty:1, min:95 },
    { name:"Delivery / Pickup", type:"flat", rate:0, qty:1, min:0 }
  ],
  "Ground Standard": [
    { name:"Ground Freight", type:"flat", rate:0, qty:1, min:0 },
    { name:"Handling", type:"per_piece", rate:15, qty:0, min:50 },
    { name:"Fuel Surcharge", type:"flat", rate:45, qty:1, min:45 }
  ]
};

export const defaultRouteTemplates = [
  { name:"Air Export Starter", fields: defaultRouteFields },
  { name:"Ocean Export Starter", fields:[
    { label:"Origin Port", value:"Miami", visible:true },
    { label:"Destination Port", value:"", visible:true },
    { label:"Carrier", value:"", visible:true },
    { label:"Free Days", value:"", visible:true },
    { label:"Transit Time", value:"", visible:true },
    { label:"Incoterm", value:"FOB", visible:true }
  ]},
  { name:"Ground Starter", fields:[
    { label:"Pickup", value:"", visible:true },
    { label:"Delivery", value:"", visible:true },
    { label:"Carrier", value:"", visible:true },
    { label:"Service", value:"LTL", visible:true },
    { label:"Transit Time", value:"", visible:true }
  ]}
];
