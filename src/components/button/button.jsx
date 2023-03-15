

const BUTTON_Style_CLASSES = {
    base: 'btn',
    white: 'btn--white',
    black: 'btn--black',
    blue: 'btn--blue',
    darkBlue: 'btn--darkBlue',
    blueGray: 'btn--blueGray',
    green: 'btn--green',
    red: 'btn--red',
    resetPW: 'btn--resetPW',
    addIngredient: 'btn--addIngredient',
    createUpdate: 'btn--createUpdate',
    deleteRecipe: 'btn--deleteRecipe',
    cancelRecipe: 'btn--cancelRecipe',
    editRecipe: 'btn--editRecipe',
    viewRecipe: 'btn--viewRecipe',
}

const BUTTON_Animation_CLASSES = {
    fromBottom: 'btn--animated',
    fromLeft: 'btn--animated-2'
}

/**
 * @param {whatever is inside of the button component} Children 
 * @param {string value to the key} btnType
 * @param {string value to the key} btnAnimation
 * @param {to pass ALL the other types - as example type=sumit etc} otherProps
 * @returns the button component with all what's inside includeing the otherprops
 */
const Button = ({children, btnType, btnAnimation, ...otherProps})=>{

    return (

        <button 
            className={`
            btn 
            ${BUTTON_Style_CLASSES[btnType]} 
            ${BUTTON_Animation_CLASSES[btnAnimation]} `}
            {...otherProps}>
            {children}
        </button>
   
    );
};

export default Button;