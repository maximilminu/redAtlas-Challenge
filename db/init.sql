-- CREATE DATABASE IF NOT EXISTS real_estate_db
SELECT 'CREATE DATABASE real_estate_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'real_estate_db')\gexec