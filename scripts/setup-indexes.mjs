// scripts/setup-indexes.mjs
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("Error: MONGODB_URI is not defined in your .env.local file.");
    process.exit(1);
}

async function run() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        // db() will use the database specified in your connection string
        const db = client.db();

        console.log("Creating unique indexes...");

        // 1. Create unique index for email
        await db.collection('users').createIndex(
            { email: 1 },
            { unique: true }
        );
        console.log("✅ Unique index created for 'email'");

        // 2. Create unique index for username
        await db.collection('users').createIndex(
            { username: 1 },
            { unique: true }
        );
        console.log("✅ Unique index created for 'username'");

        console.log("\nSuccess! Your database is now protected against duplicate emails and usernames.");
    } catch (error) {
        console.error("Error creating indexes:", error);
    } finally {
        await client.close();
    }
}

run();