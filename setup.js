#!/usr/bin/env node

/**
 * Devo Store Setup Script
 * This script helps you set up the backend environment quickly
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Devo Store Setup Script');
console.log('==========================\n');

// Check if we're in the backend directory
const backendPath = path.join(__dirname, 'backend');
if (!fs.existsSync(backendPath)) {
    console.error('❌ Error: Backend directory not found!');
    console.log('Please run this script from the project root directory.');
    process.exit(1);
}

// Check Node.js version
try {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 18) {
        console.error('❌ Error: Node.js 18 or higher is required!');
        console.log(`Current version: ${nodeVersion}`);
        console.log('Please update Node.js and try again.');
        process.exit(1);
    }
    
    console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
    console.error('❌ Error checking Node.js version:', error.message);
    process.exit(1);
}

// Check if package.json exists
const packageJsonPath = path.join(backendPath, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ Error: package.json not found in backend directory!');
    process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
    execSync('npm install', { 
        cwd: backendPath, 
        stdio: 'inherit' 
    });
    console.log('✅ Dependencies installed successfully!');
} catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
    process.exit(1);
}

// Check if .env exists
const envPath = path.join(backendPath, '.env');
const envExamplePath = path.join(backendPath, '.env.example');

if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
        console.log('\n📝 Creating .env file from template...');
        try {
            fs.copyFileSync(envExamplePath, envPath);
            console.log('✅ .env file created!');
            console.log('⚠️  Please edit .env file with your configuration before starting the server.');
        } catch (error) {
            console.error('❌ Error creating .env file:', error.message);
        }
    } else {
        console.log('\n⚠️  .env.example not found. Please create .env file manually.');
    }
} else {
    console.log('✅ .env file already exists');
}

// Create uploads directory
const uploadsPath = path.join(backendPath, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    console.log('\n📁 Creating uploads directory...');
    try {
        fs.mkdirSync(uploadsPath, { recursive: true });
        console.log('✅ Uploads directory created!');
    } catch (error) {
        console.error('❌ Error creating uploads directory:', error.message);
    }
} else {
    console.log('✅ Uploads directory already exists');
}

// Create logs directory
const logsPath = path.join(backendPath, 'logs');
if (!fs.existsSync(logsPath)) {
    console.log('\n📁 Creating logs directory...');
    try {
        fs.mkdirSync(logsPath, { recursive: true });
        console.log('✅ Logs directory created!');
    } catch (error) {
        console.error('❌ Error creating logs directory:', error.message);
    }
} else {
    console.log('✅ Logs directory already exists');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Edit backend/.env file with your configuration');
console.log('2. Set up Google OAuth credentials');
console.log('3. Configure MongoDB database');
console.log('4. Start the server with: cd backend && npm start');
console.log('\n📚 For detailed instructions, see README.md');

// Check for common issues
console.log('\n🔍 Checking for common issues...');

// Check if MongoDB is running (optional)
try {
    execSync('mongod --version', { stdio: 'ignore' });
    console.log('✅ MongoDB is available');
} catch (error) {
    console.log('⚠️  MongoDB not found. Make sure MongoDB is installed and running.');
}

// Check if ports are available
const net = require('net');
const testPort = (port) => {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(port, () => {
            server.close();
            resolve(true);
        });
        server.on('error', () => {
            resolve(false);
        });
    });
};

testPort(3000).then(available => {
    if (available) {
        console.log('✅ Port 3000 is available');
    } else {
        console.log('⚠️  Port 3000 is in use. You may need to change the port in .env');
    }
});

console.log('\n✨ Setup script finished!');
