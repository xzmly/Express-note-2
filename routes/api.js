var express = require('express');
var router = express.Router();
var Note = require('../model/index').Note

/* GET users listing. */
router.get('/notes', function(req, res, next) {
	var query = {raw:true}
	if (req.session.user) {
		query.where = {
			uid: req.session.user.id
		}
	}
	Note.findAll(query).then(function(notes){
		res.send({status: 0, data: notes})
	})
});

router.post('/notes/add',function(req,res,next){
	if (! req.session.user) {
		return res.send({status:1,errorMsg:'请先登陆'})
	}
	var uid = req.session.user.id
	var note = req.body.note

	Note.create({text: note,uid: uid}).then(function(){
		res.send({status:0})
	}).catch(function(){
		res.send({status:1,errorMsg:'获取失败'})
	})
	console.log('add.....',note)
})

router.post('/notes/edit',function(req,res,next){
	if (! req.session.user) {
		return res.send({status:1,errorMsg:'请先登陆'})
	}
	var uid = req.session.user.id

	Note.update( {text:req.body.note},{where:{id:req.body.id, uid:uid}} ).then(function(){
		console.log(arguments)
		res.send({status: 0})
	}).catch(function(){
		res.send({status:1,errorMsg:'修改失败'})
	})
})

router.post('/notes/delete',function(req,res,next){
	if (! req.session.user) {
		return res.send({status:1,errorMsg:'请先登陆'})
	}
	var uid = req.session.user.id

	Note.destroy({where:{id: req.body.id, uid:uid}}).then(function(){
		res.send({status: 0})
	}).catch(function(){
		res.send({status:1,errorMsg:'删除失败'})
	})
})

module.exports = router;



// 所有ajax请求都已 /api/ 开头
// 所有页面请求都已 /user/ 开头

// 1.获取所有的note
// GET
// /api/notes
// req:{}
// res:{status:0,data:[]}
// {status:1,errorMsg:'失败原因'}

// 2.创建一个额note
// Post
// /api/notes/add
// req:{note:'hello'}
// res:{status:0}
// {status:1,erroMsg:'失败原因'}

// 3.修改一个note
// Post
// /api/notes/edit
// req:{note:'new note',id:100}
// res:{status:0}
// {status:1,erroMsg:'失败原因'}

// 4.删除一个note
// Post
// /api/notes/delete
// req:{id:100}
// res:{status:0}
// {status:1,erroMsg:'失败原因'}



