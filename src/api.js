const pkg = require("../package.json")
export const schema = "https://api.github.com"
export const userGists = schema + "/users/" + pkg.config.user + "/gists"
export const gistUri = "https://api.github.com/gists/"
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