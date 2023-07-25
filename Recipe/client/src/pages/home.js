import {useEffect, useState} from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"
import { useCookies } from "react-cookie"

export const Home = ()=>{
    const [recipes,setRecipes] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([])

    const [cookies,_] = useCookies(["access_token"])

    const userID = useGetUserID()
    useEffect(()=>{
        const fetchRecipe = async()=>{
            try {
                const response = await axios.get("http://localhost:3001/recipes")
                setRecipes(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
                setSavedRecipes(response.data.savedRecipes)
            } catch (err) {
                console.error(err)
            }
        }
        fetchRecipe()
        if(cookies.access_token)fetchSavedRecipe()
    },[])

    const saveRecipe= async (recipeID) =>{
        try {
            const response = await axios.put("http://localhost:3001/recipes", {recipeID,userID},{headers:{authorization: cookies.access_token}})
            setSavedRecipes(response.data.savedRecipes)
        } catch (err) {
            console.error(err)
        }
    }
    const isRecipeSaved = (id)=> savedRecipes.includes(id)
    return (
    <div><h1>Recipe</h1>
        <ul>
            {recipes.map((recipe)=>(
                <li key = {recipe._id}>
                    <div>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button disabled={isRecipeSaved(recipe._id)} onClick={() => saveRecipe(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
                        </div>
                        <div className="instructions">
                            <p>{recipe.instructions}</p>
                        </div>
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name} />
                  
                </li>
    ))}
        </ul>
    </div>
    ) 
}