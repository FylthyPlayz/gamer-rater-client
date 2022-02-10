import React, { useEffect, useState } from "react"
import { getGameById } from "./GameManager.js"
import { useHistory } from 'react-router-dom'

export const GameDetails = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGameById().then(data => setGames(data))
    }, [])

    return (
        <>
            
        </>
    )

}