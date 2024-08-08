# 平和ネット

## Setting up

### Clone the repository

[How to install the GitHub CLI](https://cli.github.com/)

```bash
gh repo clone TECH-C-LT/Peace-Net
```

### Environment variables

**/.env.local**

[How to get GitHub OAuth credentials](https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=environment&environment=client#register-a-new-oauth-application-on-github:~:text=Register%20a%20new%20OAuth,your%20Client%20secret.)

```env
SUPABASE_AUTH_GITHUB_CLIENT_ID=xxx
SUPABASE_AUTH_GITHUB_SECRET=xxx
```

**/apps/api/.dev.vars**

[OpenAI API Key Dashboard](https://platform.openai.com/api-keys)

```env
# OpenAI
OPENAI_API_KEY = ""

# Local Supabase URL and Anon Key
SUPABASE_URL= "http://127.0.0.1:54321"
SUPABASE_SERVICE_ROLE_KEY= "eyJh..."

# Encryption key
ENCRYPTION_KEY = ""
```

**/apps/web/.env.local**

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Local Supabase URL and Anon Key
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...

# Encryption key
ENCRYPTION_KEY=
```

## Getting Started

### Install dependencies

[How to install pnpm](https://qiita.com/oekazuma/items/1e2ee304877efa48c122#pnpm%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E6%8C%87%E5%AE%9A)

```bash
corepack enable pnpm

pnpm i
```

### Development

**Supabase**

[How to Supabase Local Development Setup](https://supabase.com/docs/guides/cli/local-development?queryGroups=access-method&access-method=postgres)

```bash
# Start the Supabase database
pnpm db:start

# Stop the Supabase database
pnpm db:stop
```

**Start the all apps**

```bash
pnpm dev
```

**Add ui components**

This works just like the add command in the [shadcn/ui CLI.](https://ui.shadcn.com/docs/cli)

```bash
pnpm ui:add <component-name>
```
