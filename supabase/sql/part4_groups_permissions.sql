-- Permissions
alter table if exists page_versions add column if not exists group_id uuid references groups(id);


-- Example tenant data table
create table if not exists reports (
id uuid primary key default gen_random_uuid(),
group_id uuid not null references groups(id) on delete cascade,
title text not null,
payload jsonb not null default '{}',
created_at timestamptz not null default now()
);


-- RLS enable
alter table groups enable row level security;
alter table group_branding enable row level security;
alter table group_subdomains enable row level security;
alter table group_members enable row level security;
alter table group_role_permissions enable row level security;
alter table group_user_permissions enable row level security;
alter table reports enable row level security;


-- Permission helper
create or replace function public.has_group_permission(g uuid, perm text)
returns boolean language sql stable as $$
with mem as (
select gm.role from group_members gm where gm.group_id = g and gm.user_id = auth.uid()
),
role_perms as (
select p.key from group_role_permissions grp
join permissions p on p.id = grp.permission_id
join mem on mem.role = grp.role
where grp.group_id = g
),
user_perms as (
select p.key from group_user_permissions gup
join permissions p on p.id = gup.permission_id
where gup.group_id = g and gup.user_id = auth.uid()
)
select exists(select 1 from role_perms where key = perm)
or exists(select 1 from user_perms where key = perm);
$$;


-- Policies (examples)
create policy if not exists "groups view member" on groups for select using (
exists(select 1 from group_members gm where gm.group_id = id and gm.user_id = auth.uid())
);
create policy if not exists "branding view member" on group_branding for select using (
exists(select 1 from group_members gm where gm.group_id = group_id and gm.user_id = auth.uid())
);
create policy if not exists "subdomains view member" on group_subdomains for select using (
exists(select 1 from group_members gm where gm.group_id = group_id and gm.user_id = auth.uid())
);
create policy if not exists "members view admins" on group_members for select using (
public.has_group_permission(group_id, 'manage_users')
);
create policy if not exists "reports view member" on reports for select using (
exists(select 1 from group_members gm where gm.group_id = group_id and gm.user_id = auth.uid())
);