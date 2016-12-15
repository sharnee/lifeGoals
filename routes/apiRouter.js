let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Goal = require('../db/schema.js').Goal
let Milestone = require('../db/schema.js').Milestone

  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    // Routes for a Model(resource) should have this structure
apiRouter
//when goal saves it knows to save under the goal schema 
 .post('/goal', function(req, res){
        var recordObj = new Goal(req.body)
        // this Goal is a model (like on the backbone model) of the goal schema
        recordObj.save(function(err) {
          if (err) {
            res.status(400).send(err)
          }
          else {
            res.json(recordObj)
          }
        })
      }) // read many
      .get('/goal', function(req, res){
        Goal.find(req.query, function(err, records) {
          if (err) {
            res.status(400).send(err)
          }
          else {
            res.json(records)
          }
        })
      })
      // UPDATE ONE
      .put('/goal/:_id', function(req, res){
        Goal.findByIdAndUpdate(req.params._id, req.body, function(err, record) {
            if (err) {
              res.status(500).send(err)
            }
            else if (!record) {
              res.status(400).send('no record found at that id')
            }
            else {
              res.json(req.body)
            }
        })
      })
          // Delete one
    .delete('/goal/:_id', function(req,res) {
      Goal.remove({_id: req.params._id}, function(err) {
        if (err) {
          res.status(500).json(err)
        }
        else {
          res.json({
            status: 'record with id' + req.params._id + 'successfully deleted!'
          })
        }
      })
    })

apiRouter
// when goal saves it knows to save under the goal schema 
 .post('/milestones', function(req, res){
    var recordObj = new Goal(req.body)
    // this Goal is a model (like on the backbone model) of the goal schema
    recordObj.save(function(err) {
      if (err) {
        res.status(400).send(err)
      }
      else {
        res.json(recordObj)
      }
    })
  }) // read many
  .get('/milestones', function(req, res){
    Milestone.find(req.query, function(err, records) {
      if (err) {
        res.status(400).send(err)
      }
      else {
        res.json(records)
      }
    })
  })
  .get('/milestones/:_id', function(req, res){
   Milestone.findById(request.params._id, function(error, records){
    if(error){
      response.send(error)
    }
    else {
      response.json(records)
    }
   })
  })
  // UPDATE ONE
  .put('/milestones/:_id', function(req, res){
    Milestone.findByIdAndUpdate(req.params._id, req.body, function(err, record) {
        if (err) {
          res.status(500).send(err)
        }
        else if (!record) {
          res.status(400).send('no record found at that id')
        }
        else {
          res.json(req.body)
        }
    })
  })
  // Delete one
  .delete('/milestones/:_id', function(req,res) {
    Milestone.remove({_id: req.params._id}, function(err) {
      if (err) {
        res.status(500).json(err)
      }
      else {
        res.json({
          status: 'record with id' + req.params._id + 'successfully deleted!'
        })
      }
  })
})
module.exports = apiRouter