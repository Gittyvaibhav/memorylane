import * as mod from 'meilisearch'
console.log('exports:', Object.keys(mod))
console.log('default:', !!mod.default)
console.log('has MeiliSearch named:', 'MeiliSearch' in mod)
for (const k of Object.keys(mod)) console.log(k)
