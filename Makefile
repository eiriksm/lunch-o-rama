test:
	@NODE_ENV=test node ./node_modules/mocha/bin/_mocha --reporter list

test-cov:
	@NODE_ENV=test node ./node_modules/istanbul/lib/cli.js \
		cover ./node_modules/mocha/bin/_mocha -- -d --recursive -R spec
		node ./node_modules/istanbul/lib/cli.js check-coverage --statements 100 --functions 100 --branches 100 --lines 100

.PHONY: test test-cov
