const fs = require('fs')
const path = require('path')
const express = require('express')
// Sequelize model- the uuid package allows me to generate unique identifiers for each note
const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json')