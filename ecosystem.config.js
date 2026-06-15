module.exports = {
  apps: [{
    name: 'biyesheji-backend',
    script: 'dist/index.js',
    cwd: '/opt/biyesheji-backend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: 3001,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
    max_memory_restart: '300M',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
  }]
}
