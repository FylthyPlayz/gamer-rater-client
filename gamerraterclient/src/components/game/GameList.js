import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "./GameManager.js"
import { useHistory, Link } from 'react-router-dom'

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (

        <article className="games">
            {
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/games/new" })
                    }}
                >Register New Game</button>}
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title"><Link to={`/games/${game.id}`}>{game.title}</Link> by {game.designer}</div>
                        <div className="game__description">{game.description}</div>
                        <div className="game__players">{game.num_of_players} players needed</div>
                        <div className="game__year_released">It was released in {game.year_release}</div>
                        <div className="game__estimated_time"> It is estimated to take {game.estimated_time} minutes to play. </div>
                        {/* <div className="game__category"> It is a {game.category} </div> */}
                        <button onClick={() => {
                            history.push({ pathname: `/games/${game.id}/update`})
                        }}>
                            Edit Game
                        </button>
                        <button onClick={() => {
                            deleteGame(game, game.id)
                            .then(response => setGames(response))
                        }}>
                            Delete Game
                        </button>
                    </section>
                })
            }
        </article>
    )
}