
// import relevant modules 

import express from "express" ;

import bodyParser from "body-parser" ;

import { v4 as todoID } from 'uuid' ;

// initialize application using express

const app = express () ;

// set up the default template engine

app .set ( "view engine" , "ejs" ) ;

// set the port

const port = 3000 ;

// setup the list to act as a database and enter some default contents

let todos = [

	{
		id : todoID () , 

		name : "Go to the gym" ,

		about : "Start with a warm-up, followed by stretching exercises and then move on to strength training, mobility work and cardio."

	} ,

] ;

console .log ( todos ) ;

// configure the todos page/homepage

app .get (

	"/" ,

	( req , res ) => {

		res .render (

			"todos"

		) ;

	}

) ;

// configure application server 

app .listen (

	port ,

	() => {

		console .log ( `Server is running on http://localhost:${port}` ) ;

	}

) ;