'use strict';

var _ = require('underscore');

var userAgents = [
	'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
	'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:67.0) Gecko/20100101 Firefox/67.0',
	'Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0'
];

module.exports = {
	homeUrl: 'https://www.blackhatworld.com',
	abstract: 'list-crawler',
	defaultOptions: {},
	config: {
		startUrls: [
			'https://www.blackhatworld.com/seo/100-scrapebox-proxies.297574/',
			'https://www.blackhatworld.com/seo/gscraper-proxies.703493/',
			'https://www.blackhatworld.com/seo/port-scanned-proxies.988868/',
			'https://www.blackhatworld.com/seo/gsa-proxies-proxygo.830325/',
			'https://www.blackhatworld.com/seo/socks-proxies-occasional-update.803039/',
			'https://www.blackhatworld.com/seo/ssl-proxies-occasional-update.927669/',
			'https://www.blackhatworld.com/seo/anonymous-proxies.806981/',
			'https://www.blackhatworld.com/seo/tunnel-connect-proxies.951125/',
		],
		listLinks: [
			'.PageNav nav .PageNavNext + a',
		],
		list: {
			selector: [
				'li.message:last-child > div.messageInfo.primaryContent pre',
				'li.message:nth-last-child(2) > div.messageInfo.primaryContent pre',
				'li.message:nth-last-child(3) > div.messageInfo.primaryContent pre',
				'li.message:nth-last-child(4) > div.messageInfo.primaryContent pre',
				'li.message:nth-last-child(5) > div.messageInfo.primaryContent pre',
			].join(','),
			parse: function(text) {
				return text.trim().split('\n').map(function(item) {
					var match = item.trim().match(/^([0-9.]+):([0-9]+)/);
					if (!match || !match[1] || !match[2]) return null;
					var ipAddress = match[1];
					var port = parseInt(match[2]);
					if (_.isNaN(port)) return null;
					return {
						ipAddress: ipAddress,
						port: port,
					};
				}).filter(Boolean);
			},
		},
	},
};
