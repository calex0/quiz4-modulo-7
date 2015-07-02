var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){

	models.Quiz.find({where:{id:Number(quizId)},}).then(

		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else { next (new Error('No existe quizId=' + quizId))}
			}
			).catch(function(error){next(error)});
};

// GET /quizes/:id

exports.show = function(req, res) {
	res.render('quizes/show', { quiz: req.quiz, errors: []});
};



//GET / quizes
exports.index = function(req,res){
	 
	var filtro = req.query.search;
	var condicion = ('%' + filtro + '%').replace(/ /g,'%');
		if (req.query.search) {
		  models.Quiz.findAll({
			where: ["pregunta like ?", condicion],
			order: [['pregunta', 'ASC']]}
			).then(function(quizes) {	
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error) {next(error);});
		  }else{
			models.Quiz.findAll().then(function(quizes) {
				res.render('quizes/index', {quizes: quizes, errors: []});
			}).catch(function(error) {next(error);});
		  }
};


//GET /quizes/answer

exports.answer = function(req,res){
  var resultado = 'Incorrecto';
	  if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
    }
    res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
    };

//GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta:"" , respuesta: ""}
	);
	res.render('quizes/new' , {quiz: quiz, errors: [] });
};
/*
// POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build ( req.body.quiz);
	quiz
	.validate()
	.then(
		function(err){
			if (err){
				res.render('quizes/new', { quiz: quiz, errors: []});
			} else{
//guarda en BD lpos campos pregunta y respuesta de quiz
					quiz
					.save({fields: ["pregunta","respuesta"]})
					.then(function(){ res.redirect('/quizes');
					});
//res.redirect: Redirección HTTP a lista de preguntas
			}
}).catch(function(error) { next(error); });
};
*/



// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build (req.body.quiz);
	
	// guarda en DB los campos pregunta y respuesta de quiz
	
	quiz.validate().then( function(err) {
		if (err) {
       		res.render('quizes/new', {quiz: quiz, errors: err.errors});
      	} else {
        	quiz.save({fields: ["pregunta", "respuesta"]})
			.then( function() { res.redirect('/quizes');
			})
      	}      // res.redirect: Redirección HTTP a lista de preguntas
     }
	);
};

// GET quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz; //autoload de onstancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:quizId
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  //req.quiz.tema = req.body.quiz.tema;

  req.quiz
  .validate()
  .then(
    function(err) {
      if (err) {
        res.render('quizes/edit', { quiz: req.quiz, errors: err.errors });
      } else {
        // save: guarda en DB campos pregunta y respuesta de quiz
        req.quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then(function() {
            //res.redirect: Redirección HTTP a lista de preguntas
            res.redirect('/quizes');
          })
      }
    }
  ).catch(function(error) { next(error); });
};

