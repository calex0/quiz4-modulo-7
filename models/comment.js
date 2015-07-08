// Defibición del modelo de Comment con validación

module.exports = function(sequelize, DataTypes){
	return sequelize.define(
		'Comment',
		{ texto: {
				type: DataTypes.STRING,
				validate: { noEmpty: {msg: "-> Falta Comentario"}}
		}
	}
);

} 
