const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helper/jwt');

const crearUsuario = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail)
            return res.status(400).json({ ok: false, msg: 'Ya existe el email' });
        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        const token = await generarToken(usuario.id);
        res.json({ ok: true, usuario, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'FFF' });
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB)
            return res.status(404).json({ ok: false, msg: 'Email no encontrado' });

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword)
            return res.status(400).json({ ok: false, msg: 'Contraseña invalida' });
        const token = await generarToken(usuarioDB.id);
        res.json({ ok: true, token, usuarioDB });
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'FFF' });
    }

}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generarToken(uid);
    const usuario = await Usuario.findById(uid);
    res.json({ ok: true, usuario, token });
}

module.exports = { crearUsuario, renewToken, login }