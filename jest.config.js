export default {
    preset: 'ts-jest',              // Use ts-jest preset
    testEnvironment: 'node',        // Node.js test environment
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript and TSX files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Allow .ts, .tsx, .js, and .jsx files
  };