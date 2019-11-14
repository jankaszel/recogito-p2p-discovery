document.addEventListener('DOMContentLoaded', () => {
  const discovery = RecogitoDiscovery.createDiscovery(
    document.getElementById('discovery'),
    'http://example.com/foo',
    {
      allowOutsideClick: false,
      useP2P: true,
    }
  )
  discovery.open()
  discovery.on('cancel', () => console.log('Oh my! You must provide an ID!'))
  discovery.on('save', (id, docUrl) =>
    console.log(
      `Thanks, \`${id}\`! Your annotations will be stored at ${docUrl}.`
    )
  )

  discovery.setDocuments(['hypermerge:/foo_bar_1337'])

  window.setTimeout(
    () =>
      discovery.setDocuments([
        'hypermerge:/foo_bar_1337',
        {
          title: "Jan's Notes",
          url: 'hypermerge:/foo_bar_7331jkl12j3____1773_abc__foobar__abc_blah',
        },
        'hypermerge:/foo_bar_1337___1',
        'hypermerge:/foo_bar_1337asd',
        'hypermerge:/foo_bar_1337asdasdasda',
      ]),
    2500
  )
})
