# RTC - PROYECTO 07

## _API REST AUTH_

El proyecto levanta un servidor usando la libreria Express. Me conecto a la base de datos de Mongo Atlas mediante mongoose.

Creo dos colecciones:

- category: el campo "funkos" está relacionado con la coleccion funko
- funko
- user: el campo "favouritefunkos" está relacionado con la coleccion funko
  en el campo "role" tenemos 2 tipos de user: "user" y "admin". Daremos diferentes permisos dependiendo de que user es.

### Endpoints para la colección funko:

| PETICIÓN | NOMBRE       | DESCRIPCIÓN                                                                                                                   |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| GET      | getFunkos    | devuelve todos los funkos de mi coleccion. no hace falta estar logueados                                                      |
| GET      | getByIdFunko | devuelve un funko, pasandole el id de dicho funko                                                                             |
| POST     | postFunko    | para subir un nuevo funko. Solo pueden tener acceso los ADMINS                                                                |
| PUT      | updateFunko  | actualiza los datos de un funko. Le paso el id para saber que funko tengo que actualizar. Solo pueden tener acceso los ADMINS |
| DELETE   | deleteFunko  | elimina un funko de mi colección. Le paso el id para saber que funko tengo que eliminar. Solo pueden tener acceso los ADMINS  |

### Endpoints para la colección category:

| PETICIÓN | NOMBRE          | DESCRIPCIÓN                                                                                                                                                                                                       |
| -------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET      | getCategories   | devuelve todas las categorias de mi coleccion. El parametro "funkos" está populado con los datos de la colección funkos. Le paso los id de los funkos que corresponden a dicha categoria para rellenar este campo |
| GET      | getByIdCategory | devuelve una categoria, pasandole el id de dicha categoria                                                                                                                                                        |
| POST     | postCategory    | para subir una nueva categoria. Solo pueden tener acceso los ADMINS                                                                                                                                               |
| PUT      | updateCategory  | para actualizar los datos de una categoria. Le paso el id para saber que categoria tengo que actualizar. Solo pueden tener acceso los ADMINS                                                                      |
| DELETE   | deleteCategory  | para eliminar una categoria de mi colección. Le paso el id para saber que categoria tengo que eliminar. Solo pueden tener acceso los ADMINS                                                                       |

### Endpoints para la colección user:

| PETICIÓN | NOMBRE                | DESCRIPCIÓN                                                                                                                                                                                                                                                           |
| -------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST     | register              | para registrar un user. requiere username, email y password                                                                                                                                                                                                           |
| POST     | login                 | para loguear un user que ya está registrado. Si username y password son correctas se genera un token.                                                                                                                                                                 |
| GET      | getUsers              | devuelve todos los users de mi coleccion. El parametro "favouriteFunkos" está populado con los datos de la colección funkos. Le paso los id de los funkos que corresponden a dicha categoria para rellenar este campo. Solo los ADMINS pueden acceder a esta petición |
| DELETE   | deleteUser            | permite eliminar un usuario. Solo los ADMINS pueden acceder a esta petición                                                                                                                                                                                           |
| DELETE   | deleteMyUser          | permite eliminar solo mi propio usuario. Funciona entonces solo si el user ya está logueado                                                                                                                                                                           |
| PUT      | updateFavouriteFunkos | actualiza el campo favouriteFunkos añadiendo los funkos favoritos del user. Este campo está populado con los datos de la colección funko. Pueden acceder a esta peticion los users logueados, pero podrán añadir favoritos solo a su propio user.                     |
| PUT      | updateUser            | actualiza el user. Solo los ADMINS pueden acceder a esta petición. Usada por ejemplo para cambiar el role del user a "admin".                                                                                                                                         |

El servidor está levandado en el puerto 3000.
Las rutas para las colecciones son:

- /api/v1/funkos
- /api/v1/categories
- /api/v1/users

### MIDDLEWARES

Creados 2 tipos de middlewares:

- isAuth: permite el acceso a los users logueados
- isAdmin: permite el acceso solo a los users que tienen el role "admin"

### SEED

Creada una semilla para la colección funkos.
Subida a GitHub para corrección del proyecto.

**Mireia**
