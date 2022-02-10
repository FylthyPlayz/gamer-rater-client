import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGames, getCategories } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        year_release: 0,
        num_of_players: 0,
        estimated_time: 0,
        age_recommendation: 0,
        category: 0
    })

    useEffect(() => {
        getCategories().then(categories => setCategories(categories))
    }, [])

    const changeGameState = (domEvent) => {
        domEvent.preventDefault()
        const copy = { ...currentGame }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_release">Year Released: </label>
                    <input type="text" name="year_release" required autoFocus className="form-control"
                        value={currentGame.year_release}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Number of Players: </label>
                    <input type="text" name="num_of_players" required autoFocus className="form-control"
                        value={currentGame.num_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estimated_time">Estimated Time to Play: </label>
                    <input type="text" name="estimated_time" required autoFocus className="form-control"
                        value={currentGame.estimated_time}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categories">Category: </label>
                    <select name="category" required autoFocus className="form-control"
                        value={currentGame.category}
                        onChange={changeGameState}>
                        <option value="0"> Select a Category type</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        description: currentGame.description,
                        title: currentGame.title,
                        designer: currentGame.designer,
                        year_release: parseInt(currentGame.year_release),
                        num_of_players: parseInt(currentGame.num_of_players),
                        estimated_time: parseInt(currentGame.estimated_time),
                        age_recommendation: parseInt(currentGame.age_recommendation),
                        category: parseInt(currentGame.category)
                    }

                    // Send POST request to your API
                   createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}