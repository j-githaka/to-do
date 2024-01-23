
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


// configure middleware to create an entry

function updateTodo ( req , res , next ) {

	let todoItem = {

		id : todoID () ,

		name : req .body .name ,

		about : req .body .about

	} ;

	todos .push ( todoItem ) ;

	next () ;

}

// configure the route to delete a specific todo

app .get (

	"/delete/:id" ,

	( req , res ) => {

		let targetTodo = req .params .id ;

		let targetId = 0 ;

		todos .forEach (

			( todo ) => {

				if ( todo .id == targetTodo ) {

					targetId = todos .indexOf ( todo ) ;

				} 

			}

		) ;

		todos .splice ( targetId , 1 ) ;

		res .redirect ( "/" ) ;

	}

) ;

// configure route to call a specific todo

app .get (

	"/todo/:id" ,

	( req , res ) => {

		let openTodo = req .params .id ;

		let getTodo = {} ;

		todos .forEach (

			( todo ) => {

				if ( todo .id == openTodo ) {

					getTodo = todo ;

				}

			}

		) ;

		res .render (

			"todo" ,

			{ getTodo }

		) ;

	}

) ;

// configure the route for posting todos 

app .post (

	"/createTodo" ,

	updateTodo ,

	( req , res ) => {

		res .redirect (

			"/"

		) ;

	}

) ;


// configure the route to addTodo page

app .get (

	"/addTodo" ,

	( req , res ) => {

		res .render (

			"addTodo" ,

		) ;

	}

) ;

// configure the todos page/homepage

app .get (

	"/" ,

	( req , res ) => {

		res .render (

			"todos" ,

			{ todos : todos }

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