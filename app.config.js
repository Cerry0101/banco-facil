module.exports = ({ config }) => ({
  ...config,
  web: { ...config.web, output: 'single' },
  experiments: { ...config.experiments, ...(process.env.GITHUB_PAGES === '1' ? { baseUrl: '/banco-facil' } : {}) },
});
