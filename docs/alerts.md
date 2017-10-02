# Alerts
- Alerts are just extended `Snackbar` components from the `material-ui` library
that can be used to show important information to a user at the bottom of
the screen. (Errors, score updates, notifications ..)
- `<Alert/>` component is present
in `<Site/>`.
- Can display an alert from any component by
dispatching an action from  `actions/alert-actions`.
`<Alert />` hides itself, so dispatching `hide` actions is not necessary.
