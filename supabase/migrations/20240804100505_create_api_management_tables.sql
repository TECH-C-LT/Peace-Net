-- Create api_keys table
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  api_key TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable row level security for api_keys
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Create usage_logs table
CREATE TABLE public.usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  api_key_id UUID REFERENCES public.api_keys(id),
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  date DATE DEFAULT CURRENT_DATE
);

-- Enable row level security for usage_logs
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- Create plans table
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  total_request_limit INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

-- Create user_plans table
CREATE TABLE public.user_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  plan_id UUID REFERENCES public.plans(id),
  start_date DATE NOT NULL,
  end_date DATE,
  total_requests_used INTEGER DEFAULT 0
);

-- Enable row level security for user_plans
ALTER TABLE public.user_plans ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX idx_usage_logs_api_key_id ON public.usage_logs(api_key_id);
CREATE INDEX idx_user_plans_user_id ON public.user_plans(user_id);