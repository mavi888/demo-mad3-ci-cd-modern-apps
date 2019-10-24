'use strict';

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

exports.hello = async (event, context)  => {

	switch (event.httpMethod) {
		case 'DELETE':
			console.log('chau');
			return deleteItem(event, context);
		case 'GET':
			return getItem(event, context);
		case 'POST':
			return saveItem(event, context);
		case 'PUT':
			return updateItem(event, context);
		default:
			return sendResponse(404, `Unsupported method "${event.httpMethod}"`, context);
	}
};

function saveItem(event, context) {
	const item = JSON.parse(event.body);
	item.itemId = uuidv1();

	console.log(item);
	return databaseManager.saveItem(item).then(response => {
		console.log(response);
		return sendResponse(200, item.itemId, context);
	});
}

function getItem(event, context) {
	const itemId = event.pathParameters.itemId;

	return databaseManager.getItem(itemId).then(response => {
		console.log(response);
		return sendResponse(200, JSON.stringify(response), context);
	});
}

function deleteItem(event, context) {
	const itemId = event.pathParameters.itemId;

	return databaseManager.deleteItem(itemId).then(() => {
		return sendResponse(200, 'DELETE ITEM', context);
	});
}

function updateItem(event, context) {
	const itemId = event.pathParameters.itemId;

	const body = JSON.parse(event.body);
	const paramName = body.paramName;
	const paramValue = body.paramValue;

	return databaseManager.updateItem(itemId, paramName, paramValue).then(response => {
		console.log(response);
		return sendResponse(200, JSON.stringify(response), context);
	});
}

function sendResponse(statusCode, message, context) {
	const message1 = JSON.stringify(message) 
	const response = {
		statusCode: statusCode,
		body: `The version of your function is: ${context.functionVersion}. \n ${message1}`
	};
	return response
}
