export default {
  serverHost: process.env.MOCK_URL || 'http://localhost:8000',
  serverPort: 8000,
  xApiKey: process.env.X_API_KEY,
  logLevel: process.env.LOGS_LEVEL || 'debug',
  mongodbConfig: {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    clusterPort: process.env.MONGODB_CLUSTER_PORT || 27017,
    clusterUrl: process.env.MONGODB_CLUSTER_URL || 'mongodb+srv://hasansiddique:Hasan@123456@promage.oy7f8wk.mongodb.net/?retryWrites=true&w=majority&appName=promage',
    database: process.env.MONGODB_DATABASE || 'promage',
  },
  secret: {
    admin1: 'superAdminWarLord1',
    admin2: 'AdminWarLord2',
  },
};

