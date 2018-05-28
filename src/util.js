const pkg = require("../package.json")
export const schema = "https://api.github.com"
export const issueUri = "https://api.github.com/repos/reminia/reminia.github.io/issues/"
const perPage = pkg.config.perPage
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

export function issuesUri(pageNo) {
    return "https://api.github.com/repos/reminia/reminia.github.io/issues?page=" + pageNo + "&per_page=" + perPage
}

export function parseDate(aDate) {
    let date = new Date(aDate).toLocaleString("zh-CN", {
        hour12: false,
        timeZone: "Asia/Shanghai"
    })
    return date.split(',').join("")
}

// parse title to label and pure title
// word starts with # is label
export function parseTitle(desc) {
    const arr = desc.trim().split(/\s+/)
    const labels = arr.filter(a => a.startsWith("#"))
    const title = arr.filter(a => !a.startsWith("#"))

    return {
        labels: labels.length > 0 ? labels : [],
        title: title.join(" ")
    }
}
