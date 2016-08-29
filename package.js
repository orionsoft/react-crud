Package.describe({
  name: 'orionsoft:react-crud',
  version: '0.0.1',
  summary: 'CRUD components that for Meteor, React and Material UI',
  git: 'https://github.com/orionsoft/collection-list',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.4.1.1')
  api.use('ecmascript')
  api.mainModule('client.js', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('orionsoft:collection-list')
})
