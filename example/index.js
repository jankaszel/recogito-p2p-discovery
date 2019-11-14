document.addEventListener('DOMContentLoaded', () => {
  const discovery = RecogitoDiscovery.createDiscovery(
    document.getElementById('discovery'),
    'http://example.com/foo'
  )
  discovery.open()
  discovery.on('cancel', () => console.log('Oh my! You must provide an ID!'))
  discovery.on('save', id => console.log(`Thanks, \`${id}\`!`))
})
