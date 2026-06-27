# MIP OS v1

GitHub Pages-ready static app.

## Files
- `index.html`
- `css/app.css`
- `js/app.js`
- `js/supabase.js`
- `data/defaults.js`

## Supabase tables required

Run this in Supabase SQL Editor:

```sql
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  quote_number text,
  customer_name text,
  status text default 'draft',
  quote_data jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact text,
  email text,
  phone text,
  data jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table quotes enable row level security;
alter table customers enable row level security;

create policy "public read quotes" on quotes for select using (true);
create policy "public insert quotes" on quotes for insert with check (true);
create policy "public update quotes" on quotes for update using (true);
create policy "public delete quotes" on quotes for delete using (true);

create policy "public read customers" on customers for select using (true);
create policy "public insert customers" on customers for insert with check (true);
create policy "public update customers" on customers for update using (true);
create policy "public delete customers" on customers for delete using (true);
```

Public policies are for testing. Add authentication before using this with sensitive customer data.
