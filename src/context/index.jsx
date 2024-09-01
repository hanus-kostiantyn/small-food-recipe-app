import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState("");
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(
                `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
            );
            const data = await res.json();
            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes);
            }
            console.log(data);
            navigate("/");
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
            setSearchParam("");
        }
    }

    function handleAddToFavorite(getCurrentItem) {
        console.log(getCurrentItem);
        let cpyFavoritesList = [...favoritesList];
        const index = cpyFavoritesList.findIndex(
            (item) => item.id === getCurrentItem.id
        );

        if (index === -1) {
            cpyFavoritesList.push(getCurrentItem);
        } else {
            cpyFavoritesList.splice(index);
        }

        setFavoritesList(cpyFavoritesList);
    }

    console.log(favoritesList, "favoritesList");

    return (
        <GlobalContext.Provider
            value={{
                searchParam,
                setSearchParam,
                loading,
                recipeList,
                handleSubmit,
                recipeDetailsData,
                setRecipeDetailsData,
                handleAddToFavorite,
                favoritesList,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
