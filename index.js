
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

// configure middleware to update an entry

function upgradeTodo ( req , res , next ) {

	let todoItem = {

		id : req .body .id ,

		name : req .body .name ,

		about : req .body .about

	} ;

	let specificTodo = todoItem.id ;

	let specificTodoId = 0 ;

	todos .forEach (

			( todo ) => {

				if ( todo .id == todoItem.id ) {

					specificTodoId = todos .indexOf ( todo ) ;

				}

			}

	) ;

	todos .splice (specificTodoId, 1, todoItem ) ;

	next () ;

}

// configure edit post route

app .post (

	"/edit/save" ,

	upgradeTodo ,

	( req , res ) => {

		res .redirect ( "/" ) ;

	}

)

// configure the edit route

app .get (

	"/edit/:id" ,

	( req , res ) => {

		let editTodo = req .params .id ;

		let getEditTodo = {} ;

		todos .forEach (

			( todo ) => {

				if ( todo .id == editTodo ) {

					getEditTodo = todo ;

				}

			}

		) ;

		res .render (

			"editTodo" ,

			{ getEditTodo }

		) ;

	}

)

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