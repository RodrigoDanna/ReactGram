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

module.exports = {
    photoInsertValidation
}