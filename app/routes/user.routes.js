const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/serviceapp/api/all", controller.allAccess);
 
  
  
  app.get(
    "/serviceapp/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  app.get(
    "/serviceapp/api/categories",
    [authJwt.verifyToken],
    controller.userCategories
  );
  app.get(
    "/serviceapp/api/models",
    [authJwt.verifyToken],
    controller.userModels
  );
  app.get(
    "/serviceapp/api/subcategories",
    [authJwt.verifyToken],
    controller.userSubcategories
  );



  app.get(
    "/serviceapp/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/serviceapp/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

app.get(
  "/serviceapp/api/modelwithcatnsubcat",
  [authJwt.verifyToken ],
  controller.modelwithcatandsubcat
);
app.post(
  "/serviceapp/api/customer",
  [authJwt.verifyToken ],
  controller.newcustomer
);
app.get(
  "/serviceapp/api/customer/:id",
  [authJwt.verifyToken ],
  controller.customerbyid
);
  app.delete(
    "/serviceapp/api/customer/:id",
    [authJwt.verifyToken ],
    controller.customerdelete
  );
  app.put(
    "/serviceapp/api/customer/:id",
    [authJwt.verifyToken ],
    controller.updatecustomer
  );
  
};
