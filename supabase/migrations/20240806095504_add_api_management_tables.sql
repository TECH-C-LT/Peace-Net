create table "public"."api_keys" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid,
    "name" text not null,
    "description" text,
    "api_key" text,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "last_used" timestamp with time zone,
    "expires_at" timestamp with time zone
);


alter table "public"."api_keys" enable row level security;

create table "public"."plans" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "description" text,
    "total_request_limit" integer not null,
    "price" numeric(10,2) not null
);


create table "public"."usage_logs" (
    "id" uuid not null default uuid_generate_v4(),
    "api_key_id" uuid,
    "endpoint" text not null,
    "request_count" integer default 1,
    "date" date default CURRENT_DATE
);


alter table "public"."usage_logs" enable row level security;

create table "public"."user_plans" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid,
    "plan_id" uuid,
    "start_date" date not null,
    "end_date" date,
    "total_requests_used" integer default 0
);


alter table "public"."user_plans" enable row level security;

CREATE UNIQUE INDEX api_keys_api_key_key ON public.api_keys USING btree (api_key);

CREATE UNIQUE INDEX api_keys_pkey ON public.api_keys USING btree (id);

CREATE INDEX idx_api_keys_user_id ON public.api_keys USING btree (user_id);

CREATE INDEX idx_usage_logs_api_key_id ON public.usage_logs USING btree (api_key_id);

CREATE INDEX idx_user_plans_user_id ON public.user_plans USING btree (user_id);

CREATE UNIQUE INDEX plans_pkey ON public.plans USING btree (id);

CREATE UNIQUE INDEX usage_logs_pkey ON public.usage_logs USING btree (id);

CREATE UNIQUE INDEX user_plans_pkey ON public.user_plans USING btree (id);

alter table "public"."api_keys" add constraint "api_keys_pkey" PRIMARY KEY using index "api_keys_pkey";

alter table "public"."plans" add constraint "plans_pkey" PRIMARY KEY using index "plans_pkey";

alter table "public"."usage_logs" add constraint "usage_logs_pkey" PRIMARY KEY using index "usage_logs_pkey";

alter table "public"."user_plans" add constraint "user_plans_pkey" PRIMARY KEY using index "user_plans_pkey";

alter table "public"."api_keys" add constraint "api_keys_api_key_key" UNIQUE using index "api_keys_api_key_key";

alter table "public"."api_keys" add constraint "api_keys_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."api_keys" validate constraint "api_keys_user_id_fkey";

alter table "public"."usage_logs" add constraint "usage_logs_api_key_id_fkey" FOREIGN KEY (api_key_id) REFERENCES api_keys(id) not valid;

alter table "public"."usage_logs" validate constraint "usage_logs_api_key_id_fkey";

alter table "public"."user_plans" add constraint "user_plans_plan_id_fkey" FOREIGN KEY (plan_id) REFERENCES plans(id) not valid;

alter table "public"."user_plans" validate constraint "user_plans_plan_id_fkey";

alter table "public"."user_plans" add constraint "user_plans_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_plans" validate constraint "user_plans_user_id_fkey";

grant delete on table "public"."api_keys" to "anon";

grant insert on table "public"."api_keys" to "anon";

grant references on table "public"."api_keys" to "anon";

grant select on table "public"."api_keys" to "anon";

grant trigger on table "public"."api_keys" to "anon";

grant truncate on table "public"."api_keys" to "anon";

grant update on table "public"."api_keys" to "anon";

grant delete on table "public"."api_keys" to "authenticated";

grant insert on table "public"."api_keys" to "authenticated";

grant references on table "public"."api_keys" to "authenticated";

grant select on table "public"."api_keys" to "authenticated";

grant trigger on table "public"."api_keys" to "authenticated";

grant truncate on table "public"."api_keys" to "authenticated";

grant update on table "public"."api_keys" to "authenticated";

grant delete on table "public"."api_keys" to "service_role";

grant insert on table "public"."api_keys" to "service_role";

grant references on table "public"."api_keys" to "service_role";

grant select on table "public"."api_keys" to "service_role";

grant trigger on table "public"."api_keys" to "service_role";

grant truncate on table "public"."api_keys" to "service_role";

grant update on table "public"."api_keys" to "service_role";

grant delete on table "public"."plans" to "anon";

grant insert on table "public"."plans" to "anon";

grant references on table "public"."plans" to "anon";

grant select on table "public"."plans" to "anon";

grant trigger on table "public"."plans" to "anon";

grant truncate on table "public"."plans" to "anon";

grant update on table "public"."plans" to "anon";

grant delete on table "public"."plans" to "authenticated";

grant insert on table "public"."plans" to "authenticated";

grant references on table "public"."plans" to "authenticated";

grant select on table "public"."plans" to "authenticated";

grant trigger on table "public"."plans" to "authenticated";

grant truncate on table "public"."plans" to "authenticated";

grant update on table "public"."plans" to "authenticated";

grant delete on table "public"."plans" to "service_role";

grant insert on table "public"."plans" to "service_role";

grant references on table "public"."plans" to "service_role";

grant select on table "public"."plans" to "service_role";

grant trigger on table "public"."plans" to "service_role";

grant truncate on table "public"."plans" to "service_role";

grant update on table "public"."plans" to "service_role";

grant delete on table "public"."usage_logs" to "anon";

grant insert on table "public"."usage_logs" to "anon";

grant references on table "public"."usage_logs" to "anon";

grant select on table "public"."usage_logs" to "anon";

grant trigger on table "public"."usage_logs" to "anon";

grant truncate on table "public"."usage_logs" to "anon";

grant update on table "public"."usage_logs" to "anon";

grant delete on table "public"."usage_logs" to "authenticated";

grant insert on table "public"."usage_logs" to "authenticated";

grant references on table "public"."usage_logs" to "authenticated";

grant select on table "public"."usage_logs" to "authenticated";

grant trigger on table "public"."usage_logs" to "authenticated";

grant truncate on table "public"."usage_logs" to "authenticated";

grant update on table "public"."usage_logs" to "authenticated";

grant delete on table "public"."usage_logs" to "service_role";

grant insert on table "public"."usage_logs" to "service_role";

grant references on table "public"."usage_logs" to "service_role";

grant select on table "public"."usage_logs" to "service_role";

grant trigger on table "public"."usage_logs" to "service_role";

grant truncate on table "public"."usage_logs" to "service_role";

grant update on table "public"."usage_logs" to "service_role";

grant delete on table "public"."user_plans" to "anon";

grant insert on table "public"."user_plans" to "anon";

grant references on table "public"."user_plans" to "anon";

grant select on table "public"."user_plans" to "anon";

grant trigger on table "public"."user_plans" to "anon";

grant truncate on table "public"."user_plans" to "anon";

grant update on table "public"."user_plans" to "anon";

grant delete on table "public"."user_plans" to "authenticated";

grant insert on table "public"."user_plans" to "authenticated";

grant references on table "public"."user_plans" to "authenticated";

grant select on table "public"."user_plans" to "authenticated";

grant trigger on table "public"."user_plans" to "authenticated";

grant truncate on table "public"."user_plans" to "authenticated";

grant update on table "public"."user_plans" to "authenticated";

grant delete on table "public"."user_plans" to "service_role";

grant insert on table "public"."user_plans" to "service_role";

grant references on table "public"."user_plans" to "service_role";

grant select on table "public"."user_plans" to "service_role";

grant trigger on table "public"."user_plans" to "service_role";

grant truncate on table "public"."user_plans" to "service_role";

grant update on table "public"."user_plans" to "service_role";


