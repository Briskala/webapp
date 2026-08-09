# Briskala Accounting Architecture

## License stance on reference projects

| Project | License | Used in Briskala |
|---|---|---|
| BigCapital | AGPL-3.0 | Concepts only (double-entry modules, SMB accounting IA) |
| ERPNext | GPL-3.0 | Concepts only (GL, company scoping, reports) |
| Akaunting | BUSL-1.1 | Concepts only (company-scoped single-DB multi-tenancy UX) |

No source code, UI kits, or database schemas were copied from these repositories.
Briskala’s accounting module is a clean-room Payload/Next.js implementation.

## Runtime topology

```
briskala.com
    │
    ├─ Next.js frontend (existing Briskala marketing + account UI)
    ├─ Firebase Auth (customer identity)
    ├─ Payload CMS / API (same process, SQLite/libSQL)
    └─ /accounting/*  (native company-scoped accounting UI + APIs)
```

Optional future split: extract accounting API to an internal service behind the same Briskala reverse proxy. Externally, users always see Briskala URLs.

## Isolation model

- `accounting-companies.publicHash` + `slug` identify an environment in the URL
- `accounting-memberships` bind Briskala users to companies with RBAC roles
- Every financial document carries a required `company` relationship
- Server routes call `resolveCompanyAccess()` before any read/write
