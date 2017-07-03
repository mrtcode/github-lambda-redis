/*
 ***** BEGIN LICENSE BLOCK *****
 
 Copyright © 2017 Zotero
 https://www.zotero.org
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
 ***** END LICENSE BLOCK *****
 */

let redis = require('redis');
let config = require('./config');

let redisClient = redis.createClient(config.redis);

exports.handler = function (event, context) {
	let messageAttributes = event.Records[0].Sns.MessageAttributes;
	if (messageAttributes['X-Github-Event'] &&
		messageAttributes['X-Github-Event'].Value === 'push') {
		
		let message = event.Records[0].Sns.Message;
		
		try {
			message = JSON.parse(message);
		} catch (err) {
			return context.fail(err);
		}
		
		if (message.ref === 'refs/heads/master') {
			let topic;
			
			if (message.repository.name === 'bundled-styles') {
				topic = 'styles';
			}
			else if (message.repository.name === 'translators') {
				topic = 'translators';
			} else {
				return context.fail('Invalid repository: ' + message.repository.name);
			}
			
			let redisMessage = {event: 'topicUpdated', topic: topic};
			redisMessage = JSON.stringify(redisMessage);
			return redisClient.publish(topic, redisMessage, function (err, result) {
				if (err) {
					return context.fail(err);
				}
				context.succeed();
			});
		}
	}
	context.succeed();
};
