var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
//esto funciona
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res){
  res.render('author', {title: 'Créditos' });
});


//Autoload de comandos con :quizId
router.param('quizId', quizController.load);


router.get('/quizes',										quizController.index);
router.get('/quizes/:quizId(\\d+)', 				quizController.show);
<<<<<<< HEAD
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
=======
router.get('/quizes/:quizId(\\d+)/answer', 		quizController.answer);
>>>>>>> origin/master


module.exports = router;
