/*
File: src/commons/ValidationSchema.js
Title: react-shop-admin
author: marigabirodcue
date: 02/08/2022
*/

import * as Yup from 'yup'; //import para el paquete instalado

const ValidationSchema = Yup.object().shape({
    title: Yup.string() //Valida Title
     .min(2, 'Title too Short!') //Mínimo 2 caráteres
     .max(25, 'Title too Long!') //Máximo 25 carácteres
     .required('Title Required'), //Obligatorio llenar
    price: Yup.number() //Valide el Precio
     .min(1, 'Number too Short!') //1 es el precio mínimo
     .max(100000, 'Number is up to 100000!') //Hats 100000 el precio máximo
     .required('Price Required'), //Requerido
    description: Yup.string() //Valida la descripción
     .min(6, 'Description too Short!') //Mínimo 6 carácteres
     .max(100, 'Description too Long!') //Máximo 100 carácteres
     .required('Description Required'), //Requerido
    categoryId: Yup.string() //Id de categoría
     .min(1, 'Category Id too Short!')
     .max(1, 'Category Id too Long!')
     .required('Category Id Required'),
    images: Yup.array() //Es array según la API
    .of(Yup.string() //Dentro del array permite el string
      //  .required('Image Required'),
    ),
});

export  {ValidationSchema};