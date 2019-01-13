module.exports = src => ({
  original: src,
  types: ['image/jpeg', 'image/webp'],
  'image/jpeg': `${src}.jpg`,
  'image/webp': `${src}.webp`
});
