const pkg = require("../package.json")
export const schema = "https://api.github.com"
export const issueUri = "https://api.github.com/repos/reminia/reminia.github.io/issues/"
export const issuesUri = "https://api.github.com/repos/reminia/reminia.github.io/issues"
const GA_TRACKING_ID = pkg.config.ga
export function gaRecord(title) { // update GA for post view
    window.gtag(
        'config',
        GA_TRACKING_ID,
        {
            'page_path': window.location.pathname,
            'page_title': title
        }
    )
}