const {body} = require("express-validator");

const photoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .isString()
            .withMessage("Title is required.")
            .isLength({min: 3})
            .withMessage("The title requires at least 3 characters."),

        body("image")
            .custom((value, {req}) => {
                if(!req.file){
                    throw new Error("Image is required.")
                }
                return true;
            })
    ]
}

const photoUpdateValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("Title is required.")
            .isLength({min: 3})
            .withMessage("The title requires at least 3 characters.")
    ]
}

const photoCommentValidation = () => {
    return [
        body("comment")
            .isString()
            .withMessage("Comment is required.")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    photoCommentValidation
}