const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/Category");
const verifyToken = require("../middleware/auth");
router.post(
  "/addcategory",
  verifyToken.verifyToken,
  CategoryController.AddCategory
);
router.put(
  "/updatecategory/:categoryID",
  verifyToken.verifyToken,
  CategoryController.UpdateCategory
);
router.delete(
  "/deletecategory/:categoryID",
  verifyToken.verifyToken,
  CategoryController.DeleteCategory
);
router.get(
  "/findcategorybyname",
  verifyToken.verifyToken,
  CategoryController.FindCategoryByName
);
router.get(
  "/findcategorybyid",
  verifyToken.verifyToken,
  CategoryController.FindCategoryByID
);
router.get(
  "/getallcategory",
  verifyToken.verifyToken,
  CategoryController.GetAllCategory
);
module.exports = router;
