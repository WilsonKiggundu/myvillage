export const checkBrowser = () => {
    const agent = navigator.userAgent.toLowerCase()
    if (agent.indexOf('safari') !== -1) {
        if (agent.indexOf('chrome') > -1) {
            return 'chrome'
        } else {
            return 'safari'
        }
    }
}