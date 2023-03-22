module.exports = {
  log: {
    level: "silly",
    disabled: true,
  },
  cors: {
    origins: ["http://localhost:3000"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    host: "127.0.0.1",
    port: 3306,
    name: "fluvius_test",
  },
  pagination: {
    limit: 100,
    offset: 0,
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      secret:
        "D9vRu2E6eFJxASKFCTLTEDFMpg9Z3VYwF5YZVeVMKg9VYvdcePVJhs7hkSTcDHj9q8KVdxyzqy7dDagHPN4HRLB2umPHEXuTH4sxbPGrXDftDnZhLECtg45AZJUgjdLR",
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: "http://localhost:3000",
      audience: "http://localhost:3000",
    },
  },
};
