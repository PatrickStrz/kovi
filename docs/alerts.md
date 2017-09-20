# Alerts

-  1 `<Alert/>` component is present
in `<Site/>`. In order to set a message need to
dispatch an action from  `actions/alert-actions`.

- For displaying errors user `showErrorAlert` action creator in
`alert-actions.js` ( just need to set the message and call the action in
the catch statement of a request, `<Alert/>` component hides itself)
