import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

declare global {
    interface Window {
        gtag?: (
            key: string,
            trackingId: string,
            config: { page_path: string }
        ) => void
    }
}

export const useTracking = (trackingId: string) => {
    const {listen} = useHistory()

    useEffect(() => {
        return listen((location:any) => {
            if (!window.gtag) return
            if (!trackingId) {
                console.log(
                    'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.'
                )
                return
            }

            window.gtag('config', trackingId, { page_path: location.pathname })
        })

    }, [trackingId, listen])
}