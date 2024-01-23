
// import relevant modules 

import express from "express" ;

import bodyParser from "body-parser" ;

import { v4 as todoID } from 'uuid' ;

// initialize application using express

const app = express () ;

// set up the default template engine

app .set ( "view engine" , "ejs" ) ;

// setup the body-parser middleware for use in forms

app .use ( bodyParser .urlencoded ( { extended : false } ) ) ;

// create custom middleware for updating todos

function updateTodos ( req , res , next ) {

	// 

}

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

// configure the link to addTodo page

app .get (

	"/addTodo" ,

	( req , res ) => {

		res .render (

			"addTodo"

		) ;

	}

) ;

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