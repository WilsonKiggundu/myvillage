import React, {Component} from "react";
import packageJson from '../package.json'
global.appVersion = packageJson.version

const semverGreaterThan = (latestVersion, currentVersion) => {

    if (currentVersion === null) return true

    const versionsA = latestVersion.split(/\./g)
    const versionsB = currentVersion.split(/\./g)

    while (versionsA.length || versionsB.length) {
        const a = Number(versionsA.shift())
        const b = Number(versionsB.shift())

        if (a === b) continue;
        return a > b || isNaN(b)
    }

    return false
}

const forceReload = () => {
    localStorage.setItem('appVersion', packageJson.version)
    window.location.reload()
    // const form = document.createElement('form');
    // form.method = "POST";
    // form.action = window.location.href;
    // document.body.appendChild(form);
    // form.submit();
}

class CacheBuster extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLatestVersion: false,
            refreshCacheAndReload: () => {
                // console.log('Clearing cache and hard reloading...')
                if (caches) {
                    // Service worker cache should be cleared with caches.delete()
                    caches.keys().then(async names => {
                        for (let name of names) await caches.delete(name);
                    });
                }

                // delete browser cache and hard reload
                forceReload()
            }
        }
    }

    componentDidMount() {

        const currentVersion = localStorage.getItem('appVersion')

        fetch('/meta.json')
            .then((response) => response.json())
            .then((meta) => {
                const latestVersion = meta.version

                const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion)
                if (shouldForceRefresh) {
                    // console.log(`We have a new version - ${latestVersion}. Should force refresh`)
                    this.setState({ loading: false, isLatestVersion: false })
                } else {
                    // console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`)
                    this.setState({ loading: false, isLatestVersion: true })
                }
            })
    }

    render() {
        const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
        return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
    }
}

export default CacheBuster