-- Plansテーブルにデータを挿入
INSERT INTO public.plans (name, description, total_request_limit, price) VALUES
('Basic', '基本プラン - 月間1000リクエスト', 1000, 1000.00),
('Pro', 'プロプラン - 月間10000リクエスト', 10000, 5000.00);

-- Auth.usersテーブルにサンプルユーザーを挿入（実際の環境では認証システムを通じて作成されるべきです）
INSERT INTO auth.users (id, email) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'user1@example.com'),
('223e4567-e89b-12d3-a456-426614174001', 'user2@example.com');

-- API Keysテーブルにデータを挿入
INSERT INTO public.api_keys (user_id, name, description, api_key, is_active, created_at, last_used, expires_at) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Production Key', 'プロダクション環境用API Key', 'prod_key_123456', true, NOW(), NOW(), NOW() + INTERVAL '1 year'),
('223e4567-e89b-12d3-a456-426614174001', 'Development Key', '開発環境用API Key', 'dev_key_789012', true, NOW(), NOW(), NOW() + INTERVAL '6 months');

-- User Plansテーブルにデータを挿入
INSERT INTO public.user_plans (user_id, plan_id, start_date, end_date, total_requests_used) VALUES
('123e4567-e89b-12d3-a456-426614174000', (SELECT id FROM public.plans WHERE name = 'Pro'), CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year', 500),
('223e4567-e89b-12d3-a456-426614174001', (SELECT id FROM public.plans WHERE name = 'Basic'), CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year', 100);

-- Usage Logsテーブルにデータを挿入
INSERT INTO public.usage_logs (api_key_id, endpoint, request_count, date) VALUES
((SELECT id FROM public.api_keys WHERE api_key = 'prod_key_123456'), '/api/v1/users', 50, CURRENT_DATE),
((SELECT id FROM public.api_keys WHERE api_key = 'prod_key_123456'), '/api/v1/products', 30, CURRENT_DATE),
((SELECT id FROM public.api_keys WHERE api_key = 'dev_key_789012'), '/api/v1/orders', 20, CURRENT_DATE);