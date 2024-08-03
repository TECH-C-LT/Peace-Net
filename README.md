# 平和ネット

## Setting up

### Clone the repository

[How to install the GitHub CLI](https://cli.github.com/)

```bash
gh repo clone TECH-C-LT/Peace-Net
```

### Environment variables

**/apps/api/.dev.vars**

[OpenAI API Key Dashboard](https://platform.openai.com/api-keys)

```env
OPENAI_API_KEY = "sk-proj-xxx"
```

## Getting Started

### Install dependencies

[How to install pnpm](https://qiita.com/oekazuma/items/1e2ee304877efa48c122#pnpm%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E6%8C%87%E5%AE%9A)

```bash
corepack enable pnpm

pnpm i
```

### Development

**Start the all apps**

```bash
pnpm dev
```

**Add ui components**

This works just like the add command in the [shadcn/ui CLI.](https://ui.shadcn.com/docs/cli)

```bash
pnpm ui:add <component-name>
```