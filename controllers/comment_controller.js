var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};


// POST /quizes:quizId/comments
exports.create = function(req, res) {
	var comment = models.comment.build(
		{ texto: req.body.comments.texto,
		  QuizId: req.params.quizId
		});
		
		comment.validate().then(
			function(err) {
				if (err) {
					res.render('comments/new.ejs', {comment: comment,  quizid: req.params.quizId, errors: err.errors});
				} else { //save: guarda en BD campo de texto comment
					comment.save().then( function(error){ res.redirect('/quizes/'+req.params.quizId);});
				}
			}
		).catch(function(error){next(error);});
};
 