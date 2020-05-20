const express = require('express');
const Router = express.Router();
const TableController = require('../controller/table_controller');
const TeamController = require('../controller/team_controller');

const tableController = new TableController();
const teamController = new TeamController();

/**
 * Renders
 */
Router.get('/', (req, res)=>{res.render('index')});
Router.get('/link-team/:id', (req, res)=>{res.render('link-team-table')});
Router.get('/tables', (req, res)=>{res.render('table')});
Router.get('/table/:id', (req, res)=>{res.render('specific-table')});
Router.get('/teams', (req, res)=>{res.render('team')});
Router.get('/team/:id', (req, res)=>{res.render('specific-team')});
Router.get('/add-points/:teamId', (req,res)=>{res.render('add-points')});

/**
 * Team
*/
Router.get('/get-teams', (req, res)=>{teamController.listTeams(req,res)});
Router.get('/get-team/:id', (req, res)=>{teamController.listSpecificTeam(req,res)});
Router.post('/teams', (req, res)=>{teamController.createTeam(req,res)});
/**
 * Table
 */
Router.get('/get-tables', (req, res)=>{tableController.listTables(req,res)});
Router.get('/get-table/:id', (req, res)=>{tableController.listSpecificTable(req,res)});
Router.post('/add-points', (req,res)=>{tableController.addPointsToTable(req,res)})
Router.post('/table?', (req, res)=>{tableController.createTable(req,res)});
Router.post('/link-team', (req, res)=>{tableController.insertTeam(req,res)});

module.exports = Router;


