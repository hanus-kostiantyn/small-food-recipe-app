import RecipeItem from "../../components/recipe-item";
import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function Favorites() {
    const { favoritesList } = useContext(GlobalContext);

    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
            {favoritesList && favoritesList.length > 0 ? (
                favoritesList.map((item) => <RecipeItem item={item} />)
            ) : (
                <div>
                    <p className="lg:text-4x1 text-x1 text-center text-black font-extrabold">
                        Nothing is added in favorites.
                    </p>
                </div>
            )}
        </div>
    );
}
