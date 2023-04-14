# react-directus-template

## Getting Started

**Prerequisites**

- `Yarnpkg` v3.1.1 or higher
- `Node.js` v18.13.0 or higher
- `MySQL Server` v8.0.26 or higher
- `Docker` 20.10.23 or higher

### Installing

1. Clone the repository

```bash
git clone git@github.com:celestialstag/react-directus-template.git
```

2. Install dependencies

```bash
yarn install
```

3.  Create dotenv files

**Create dotenv at the root of the project**

```bash
cp .env.example .env
```

**Create client side dotenv**

```bash
cp packages/web/.env.example packages/web/.env
```

### Building

1. Bundle libraries

```bash
yarn rollup
```
