import { body } from "express-validator";
import path from "path"

const loginValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("User Name Must Be Reqired.")
    .matches(/^\S+$/)
    .withMessage("User Not Contain Spaces.")
    .isLength({ min: 5, max: 10 })
    .withMessage("Username Must Be 5 to 10 characters."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password Must Be Reqired.")
    .isLength({ min: 5, max: 12 })
    .withMessage("Password Must Be 5 to 12 characters."),
];

const userValidation = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("User Name Must Be Reqired.")
    .isLength({ min: 5, max: 15 })
    .withMessage("Username Must Be 5 to 15 characters."),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("User Name Must Be Reqired.")
    .matches(/^\S+$/)
    .withMessage("User Not Contain Spaces.")
    .isLength({ min: 5, max: 10 })
    .withMessage("Username Must Be 5 to 10 characters."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password Must Be Reqired.")
    .isLength({ min: 5, max: 12 })
    .withMessage("Password Must Be 5 to 12 characters."),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role Must Be Reqired.")
    .isIn(['author', 'admin'])
    .withMessage("Password Must Be Author or Admin."),
]

const userUpdateValidation = [
  body("fullname")
    .optional({ checkFalsy: true })
    .isLength({ min: 5, max: 15 })
    .withMessage("Username Must Be 5 to 15 characters."),

  body("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 5, max: 12 })
    .withMessage("Password Must Be 5 to 12 characters."),

  body("role")
    .optional({ checkFalsy: true })
    .isIn(['author', 'admin'])
    .withMessage("Password Must Be Author or Admin."),
]

const categoryValidation = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage("Category Must Be 5 to 15 characters."),

  body("description")
    .isLength({ max: 100 })
    .withMessage("description Must Be 100 characters long."),
]

const articleValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title Must Be Reqired.")
    .isLength({ min: 7, max: 50 })
    .withMessage("Title Must Be 10 to 50 characters."),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content Must Be Reqired.")
    .isLength({ min: 50, max: 500 })
    .withMessage("Content Must Be 50 to 500 characters."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Title Must Be Reqired."),

  body("image")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Image Is Reqired')
      }

      const allowedExtension = ['.jpg', '.jpeg', '.png']
      const fileExtension = path.extname(req.file.originalname).toLowerCase()

      if (!allowedExtension.includes(fileExtension)) {
        throw new Error('Invalid image format. Only jpg, jpeg and png are allowed.')
      }
      return true
    })
]

export default  { loginValidation, userUpdateValidation, userValidation, categoryValidation, articleValidation }