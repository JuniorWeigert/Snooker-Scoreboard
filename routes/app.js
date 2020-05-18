const express = require('express');
const Router = express.Router();
const TableController = require('../controller/table_controller');
const TeamController = require('../controller/team_controller');


const tableController = new TableController();
const teamController = new TeamController();




Router.get('/', (req, res)=>{});
/**
 * Team
*/
Router.get('/teams', (req, res)=>{teamController.listTeams(req,res)});
Router.get('/teams/:id', (req, res)=>{teamController.listSpecificTeam(req,res)});
Router.post('/teams', (req, res)=>{teamController.createTeam(req,res)});
Router.delete('/teams/:id', (req, res)=>{teamController.deleteTeam(req,res)});

/**
 * Table
*/
Router.get('/table', (req, res)=>{tableController.listTables(req,res)});
Router.get('/table/:id', (req, res)=>{tableController.listSpecificTable(req,res)});
Router.post('/table', (req, res)=>{tableController.createTable(req,res)});
Router.post('/table/insert-team/:id', (req, res)=>{tableController.insertTeamOnTable(req,res)});
Router.delete('/table/:id', (req, res)=>{tableController.deleteTable(req,res)});

Router.post('/memama', (req, res)=>{tableController.insertTeam(req,res)});

module.exports = Router;


