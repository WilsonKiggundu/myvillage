import { useHistory } from "react-router-dom"

export const RedirectToUrl = (url: string) => {
    const history = useHistory()
    history.push(url)
}