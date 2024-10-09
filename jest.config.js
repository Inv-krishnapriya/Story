module.exports = {
  collectCoverage: true,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `identity-obj-proxy`,

    // Handle module aliases
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/stores/(.*)$": "<rootDir>/src/stores/$1",
    "^@/stores$": "<rootDir>/src/stores",
    "^@/theme/(.*)$": "<rootDir>/src/theme/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/utils": "<rootDir>/src/utils",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/api$": "<rootDir>/src/api",
    "^@/i18n$": "<rootDir>/src/i18n",
    "^@/api/(.*)$": "<rootDir>/src/api/$1",
    "^@/common$": "<rootDir>/src/common",
    "^@/common/(.*)$": "<rootDir>/src/common/$1",
    "^@/app$": "<rootDir>/src/app",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/design-system$": "<rootDir>/src/design-system",
    ".+\\.(css|styl|less|sass|scss|png|gif|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleResolution: "node",
  moduleDirectories: ["node_modules", "src"],
  coveragePathIgnorePatterns: [
    ".*[\\/]reportWebVitals\\.ts",
    ".*[\\/]Interceptors\\.ts",
    ".*[\\/]index\\.tsx",
    "/api/",
    ".*[\\/]saga\\.ts",
    "/store/",
    ".*[\\/]CampaignPageRoutes\\.tsx",
    ".*[\\/]reducer\\.ts",
    ".*[\\/]middleware\\.ts",
    ".*[\\/]layout\\.tsx",
    ".*[\\/]loading\\.tsx",
    ".*[\\/]not-found\\.tsx",
    ".*[\\/]interface\\.ts",
    ".*[\\/]Schema\\.ts",
    ".*[\\/]global.type\\.ts",
    ".*[\\/].eslintrc\\.js",
    "/design-system/",
    "/stores/",
    "/public/",
    "/ticket/",
    ".*[\\/]types\\.tsx",
    ".*[\\/]common.type\\.ts",
    ".*[\\/]global.interface\\.ts",
    ".*[\\/]swEnvBuild\\.js",
    ".*[\\/]apiUrls\\.tsx",
  ],
};
