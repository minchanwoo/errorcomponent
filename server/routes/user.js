const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/info', (req, res) => {
	res.send({ user: req.session.user })
});

router.post('/join', async(req, res) => {
  const { name, nick, email, password, password_confirm } = req.body;

	try {
		if(!/^([a-zA-Z0-9]+)@(naver|gmail)\.com$/.test(email)) {
					throw new Error('이메일은 네이버나 구글로만 가입가능합니다.');
			} else if(!/^[a-zA-Z0-9]{8,16}$/.test(password)) {
					throw new Error('비밀번호는 8자이상 16자이하로만 가능합니다.');
			} else if(!/[a-z]+/.test(password) || !/[A-Z]+/.test(password) || !/[0-9]+/.test(password)) {
					throw new Error('비밀번호는 영어대문자, 소문자, 숫자로 구성되어있어야 합니다.')
			} else if (password !== password_confirm) {
					throw new Error('비밀번호와 비밀번호확인값이 다릅니다.');
			}
		
			const exUserByEmail = await User.findOne({where: {email: email}});
				if(exUserByEmail) {
					throw new Error('이미 가입된 이메일주소입니다.');
				}
			const exUserByNick = await User.findOne({where: {nick: nick}});
				if(exUserByNick) {
					throw new Error('이미 가입된 닉네임입니다.');
				}
			const hash = await bcrypt.hash(password, 12);
			const result = await User.create({
				name,
				nick,
				email,
				password: hash,
			});
			res.status(200).send({result: result});
	}catch(error) {
		res.status(500).send({errorMessage: error.message});	
	}
});

router.post('/login', async(req, res) => {
	const { email, password } = req.body;

	try {
			const userByEmail = await User.findOne({where: {email: email}});
				if(!userByEmail) {
					throw new Error('가입되지 않은 이메일입니다.');
				}
				const compare = bcrypt.compareSync(password, userByEmail.password);
				if(!compare) {
					throw new Error('비밀번호가 틀립니다.');
				}
				res.status(200).send('ok');
				req.session.user = {
					name: userByEmail.name,
					nick: userByEmail.nick,
					email: userByEmail.email,
				}
				req.session.save();
	} catch(error) {
			res.status(500).send({errorMessage: error.message});
	}
});

module.exports = router;