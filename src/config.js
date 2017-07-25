import Raven from 'raven-js'

//manual error logging with Sentry
export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window.console && console.error && console.error(ex);
}

export function logExceptionWithReport(ex, context) {
  Raven.captureException(ex, {
    extra: context
  })
  Raven.showReportDialog()
  /*eslint no-console:0*/
  window.console && console.error && console.error(ex);
  debugger
}
