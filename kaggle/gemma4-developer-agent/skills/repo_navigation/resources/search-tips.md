# Search tips

- `search_similar_code` matches indexed graph node ids, not an English bug report. Start from a symbol found by `rg` or `locate.py`.
- Graph JSON may be empty or missing async symbols. Treat graph tools as hints.
- FastAPI issues often live in routing, dependencies, and OpenAPI generation.
- Rich issues often live in renderables, pretty-printing, and console markup.
- Requests/HTTPX issues often live in adapters, auth, redirects, and timeout plumbing.
- Prefer the helper that several callers share over the first matching route handler.
