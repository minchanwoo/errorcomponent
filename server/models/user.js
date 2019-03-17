module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		nick: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		provider: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: 'local'
		}
	}, {
		timestamps: true,
		paranoid: true,
	});
}