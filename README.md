# Lingva GitHub integration test repository

Public, synthetic translation fixtures for testing Lingva's GitHub App integration. No platform source, customer data, tokens, or environment secrets belong here.

## Test configuration

- Repository: `usausoft/lingva-gh-integration`
- Base branch: `main`
- Translation root: `translations`
- Locales: `en`, `ru`
- CI workflow: `.github/workflows/translations.yml`

Run `node scripts/validate-translations.mjs` locally. No installation or credentials are required.

## Live test checklist

The repository is prepared; live platform integration proof remains pending.

1. Install the test GitHub App on this repository only. Connect it to a dedicated test Lingva project.
2. Match project locales and select `translations` as the translation root.
3. Approve an edit to `home.title` or `cart.empty`. Sync it and verify that one translation-only PR opens against `main`.
4. Confirm the PR's Translation validation check passes. Both `preserve.sentinel` values must remain unchanged.
5. Repeat the same sync request and verify that it returns the same operation and PR. Sync an unchanged edit and verify no new PR opens.
6. Exercise retry after an uncertain response, closed PR reconciliation, permission revocation, and disconnect using the private test procedure.
7. Review and merge only deliberate test changes. Public test artifacts may be removed after the proof.

Normal PR events run validation. Explicit dispatch uses `translations.yml` on `main` with the required `lingva_request_id`, `lingva_project_id`, and `lingva_environment_id` string inputs. Use only synthetic project/environment identifiers: inputs and logs are public. The operation ID correlates Lingva's receipt with the GitHub run. Inputs pass through environment variables into a validator; they never become shell code. Sync itself does not dispatch this workflow.

Manual dispatch runs have separate concurrency groups, so one test run cannot cancel another. PR updates still cancel superseded validation runs. Dispatch validates the configured base branch, not an unmerged translation PR. No secrets, dependencies, uploads, or repository writes are required.

The validator requires matching EN/RU key sets. Add a new key in both locales in the same sync operation.

## License

Lingva license terms in [LICENSE.md](LICENSE.md) apply.
