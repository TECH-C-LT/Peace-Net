revoke delete on table "public"."api_keys" from "anon";

revoke insert on table "public"."api_keys" from "anon";

revoke references on table "public"."api_keys" from "anon";

revoke select on table "public"."api_keys" from "anon";

revoke trigger on table "public"."api_keys" from "anon";

revoke truncate on table "public"."api_keys" from "anon";

revoke update on table "public"."api_keys" from "anon";

revoke delete on table "public"."api_keys" from "authenticated";

revoke insert on table "public"."api_keys" from "authenticated";

revoke references on table "public"."api_keys" from "authenticated";

revoke select on table "public"."api_keys" from "authenticated";

revoke trigger on table "public"."api_keys" from "authenticated";

revoke truncate on table "public"."api_keys" from "authenticated";

revoke update on table "public"."api_keys" from "authenticated";

revoke delete on table "public"."api_keys" from "service_role";

revoke insert on table "public"."api_keys" from "service_role";

revoke references on table "public"."api_keys" from "service_role";

revoke select on table "public"."api_keys" from "service_role";

revoke trigger on table "public"."api_keys" from "service_role";

revoke truncate on table "public"."api_keys" from "service_role";

revoke update on table "public"."api_keys" from "service_role";

revoke delete on table "public"."plans" from "anon";

revoke insert on table "public"."plans" from "anon";

revoke references on table "public"."plans" from "anon";

revoke select on table "public"."plans" from "anon";

revoke trigger on table "public"."plans" from "anon";

revoke truncate on table "public"."plans" from "anon";

revoke update on table "public"."plans" from "anon";

revoke delete on table "public"."plans" from "authenticated";

revoke insert on table "public"."plans" from "authenticated";

revoke references on table "public"."plans" from "authenticated";

revoke select on table "public"."plans" from "authenticated";

revoke trigger on table "public"."plans" from "authenticated";

revoke truncate on table "public"."plans" from "authenticated";

revoke update on table "public"."plans" from "authenticated";

revoke delete on table "public"."plans" from "service_role";

revoke insert on table "public"."plans" from "service_role";

revoke references on table "public"."plans" from "service_role";

revoke select on table "public"."plans" from "service_role";

revoke trigger on table "public"."plans" from "service_role";

revoke truncate on table "public"."plans" from "service_role";

revoke update on table "public"."plans" from "service_role";

revoke delete on table "public"."usage_logs" from "anon";

revoke insert on table "public"."usage_logs" from "anon";

revoke references on table "public"."usage_logs" from "anon";

revoke select on table "public"."usage_logs" from "anon";

revoke trigger on table "public"."usage_logs" from "anon";

revoke truncate on table "public"."usage_logs" from "anon";

revoke update on table "public"."usage_logs" from "anon";

revoke delete on table "public"."usage_logs" from "authenticated";

revoke insert on table "public"."usage_logs" from "authenticated";

revoke references on table "public"."usage_logs" from "authenticated";

revoke select on table "public"."usage_logs" from "authenticated";

revoke trigger on table "public"."usage_logs" from "authenticated";

revoke truncate on table "public"."usage_logs" from "authenticated";

revoke update on table "public"."usage_logs" from "authenticated";

revoke delete on table "public"."usage_logs" from "service_role";

revoke insert on table "public"."usage_logs" from "service_role";

revoke references on table "public"."usage_logs" from "service_role";

revoke select on table "public"."usage_logs" from "service_role";

revoke trigger on table "public"."usage_logs" from "service_role";

revoke truncate on table "public"."usage_logs" from "service_role";

revoke update on table "public"."usage_logs" from "service_role";

revoke delete on table "public"."user_plans" from "anon";

revoke insert on table "public"."user_plans" from "anon";

revoke references on table "public"."user_plans" from "anon";

revoke select on table "public"."user_plans" from "anon";

revoke trigger on table "public"."user_plans" from "anon";

revoke truncate on table "public"."user_plans" from "anon";

revoke update on table "public"."user_plans" from "anon";

revoke delete on table "public"."user_plans" from "authenticated";

revoke insert on table "public"."user_plans" from "authenticated";

revoke references on table "public"."user_plans" from "authenticated";

revoke select on table "public"."user_plans" from "authenticated";

revoke trigger on table "public"."user_plans" from "authenticated";

revoke truncate on table "public"."user_plans" from "authenticated";

revoke update on table "public"."user_plans" from "authenticated";

revoke delete on table "public"."user_plans" from "service_role";

revoke insert on table "public"."user_plans" from "service_role";

revoke references on table "public"."user_plans" from "service_role";

revoke select on table "public"."user_plans" from "service_role";

revoke trigger on table "public"."user_plans" from "service_role";

revoke truncate on table "public"."user_plans" from "service_role";

revoke update on table "public"."user_plans" from "service_role";

alter table "public"."api_keys" drop constraint "api_keys_api_key_key";

alter table "public"."api_keys" drop constraint "api_keys_user_id_fkey";

alter table "public"."usage_logs" drop constraint "usage_logs_api_key_id_fkey";

alter table "public"."user_plans" drop constraint "user_plans_plan_id_fkey";

alter table "public"."user_plans" drop constraint "user_plans_user_id_fkey";

alter table "public"."api_keys" drop constraint "api_keys_pkey";

alter table "public"."plans" drop constraint "plans_pkey";

alter table "public"."usage_logs" drop constraint "usage_logs_pkey";

alter table "public"."user_plans" drop constraint "user_plans_pkey";

drop index if exists "public"."api_keys_api_key_key";

drop index if exists "public"."api_keys_pkey";

drop index if exists "public"."idx_api_keys_user_id";

drop index if exists "public"."idx_usage_logs_api_key_id";

drop index if exists "public"."idx_user_plans_user_id";

drop index if exists "public"."plans_pkey";

drop index if exists "public"."usage_logs_pkey";

drop index if exists "public"."user_plans_pkey";

drop table "public"."api_keys";

drop table "public"."plans";

drop table "public"."usage_logs";

drop table "public"."user_plans";


