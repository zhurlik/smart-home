A web application that uses **RabbitMQ web STOMP** and **React**
# Install webpack
`smart-home$ ./gradlew web:app:npm <<<'install webpack webpack-cli --save-dev'`
# Run Webpack via npx
`smart-home$ ./gradlew web:app:npx <<<'webpack --config webpack.config.js --colors'`
# Run webpack-dev-server
`smart-home$ ./gradlew web:app:npx <<<'webpack-dev-server --colors'`
# Run jest
`smart-home$ ./gradlew web:app:npx <<<jest`
